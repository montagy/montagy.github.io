# ghcjs-base相关

            <div class="info">
    发表于: August 19, 2016

</div>
<div class="info">

      Tags: [ghcjs](../tags/ghcjs.html), [haskell](../tags/haskell.html)

</div>

ghcjs为我们提供了强大的ffi,可以非常方便的调用现有的js库.但我会用一些地道的haskell解决方案来解决一些问题.例如图形做变换时需要的矩阵运算,比写事件回调更简洁强大的FRP等.

先来解决上例中的一个问题.

<div class="sourceCode">

    foreign <span class="kw">import </span>javascript unsafe "new <span class="dt">Float32Array</span>([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])" threePoints :: <span class="dt">JSVal</span>`</pre></div>

    这个ffi的使用只是图个简单,不可能每次都硬编码顶点坐标.我们需要的是类似于[Double] -&gt; Float32Array这样的函数.在查看ghcjs-dom的文档时,我们只知道Float32Array是封装的JSVal,这其实没给我们提供任何信息, 如何生成它,如何操作它,都没讲到.由此引出来的一个问题就是,编译器到底是如何编译代码的,如果我有一个[Double],它能正确的转化为js中的Float32Array吗,或者退一步,转为Array呢?

    这个问题很大,我们先不管编译器是如何工作的,我们从应用层来考虑.GHC.Prim中定义了haskell的原始类型与操作符,他们与机器沟通从而生成二进制执行文件,而ghcjs作为一个编译器也应该是同样的原理. 将haskell代码转换为js代码的原始类型和操作定义在GHCJS.Prim中.我们看到了JSVal基于ByteArray#的定义,还看到了一些转换函数,他们都是基于ffi定义的.用ffi定义原始操作可以看出ffi是最底层且无所不能的. 但我们需要的是高阶的函数,整理好的直接拿来用的类型.ghcjs-base就是做的这些脏活,我们用ghcjs-base来写我们需要的函数.

    <div class="sourceCode"><pre class="sourceCode haskell">`<span class="kw">import qualified</span> <span class="dt">JavaScript.TypedArray.Internal</span> <span class="kw">as</span> <span class="dt">J</span>
    <span class="kw">import qualified</span> <span class="dt">JavaScript.TypedArray</span> <span class="kw">as</span> <span class="dt">J</span>
    <span class="kw">import qualified</span> <span class="dt">JavaScript.Array</span> <span class="kw">as</span> <span class="dt">J</span>
    <span class="kw">import qualified</span> <span class="dt">GHCJS.Marshal</span> <span class="kw">as</span> <span class="dt">J</span>
    <span class="kw">import qualified</span> <span class="dt">GHCJS.Types</span> <span class="kw">as</span> <span class="dt">J</span>

    <span class="ot">doubles2Float32Array ::</span> [<span class="dt">Double</span>] <span class="ot">-&gt;</span> <span class="dt">IO</span> <span class="dt">J.Float32Array</span>
    doubles2Float32Array <span class="fu">=</span> J.float32ArrayFrom <span class="fu">.</span> J.fromList <span class="fu">&lt;=&lt;</span> mapM J.toJSVal`</pre></div>

    ghcjs-base的内容并不多,从文档中和源代码中我们了解到,Double是ToJSVal的实例,而[Double]也是,我用的mapM toJSVal,这样我得到的是[JSVal],如果直接用toJSVal [Double],那么会得到JSVal,它表示的是js中的数组. 得到[JSVal]后再传给float32ArrayFrom . fromList,fromList得到JSArray,它也是js中的数组,但编译器保证了它不能被修改.float32ArrayFrom从JSArray得到IO (SomeFloat32Array m1),因为这个m1的存在我们的结果可以 是Float32Array这个不可修改的,也可以是IOFloat32Array这个可修改的.但ghcjs-base并不是很完善,它没有导出IOFloat32Array,恰巧IOFloat32Array是TypedArray的实例,而Float32Array不是.所以我们这个函数其实通用性很差, 我们这里必须指定一个返回值,我选的Float32Array,有待商榷,但现在够用.还有Double,其实Float也一样,这两者在js中大部分时候一样.我选了Double.

    这个转换函数的理想型应该是

    <div class="sourceCode"><pre class="sourceCode haskell">`<span class="ot">numbers2TypedArray ::</span> (<span class="dt">IsJSNumber</span> a, <span class="dt">TypedArray</span> b) <span class="ot">=&gt;</span> [a] <span class="ot">-&gt;</span> <span class="dt">IO</span> b`</pre></div>

    根据a的重载来返回合适的b.但现在还没实现.

    还有一种方式,更js一点,例子修改为

    <div class="sourceCode"><pre class="sourceCode haskell">`<span class="ot">doubles2Float32ArrayJSVal ::</span> [<span class="dt">Double</span>] <span class="ot">-&gt;</span> <span class="dt">IO</span> <span class="dt">Float32Array</span>
    doubles2Float32ArrayJSVal xs <span class="fu">=</span> js_float32ArrayFromJSVal <span class="fu">&lt;$&gt;</span> toJSVal xs
</div>

js_float32ArrayFromJSVal就是个ffi,比上例去掉了转Array的过程,前者是用的类方法Float32Array.from,后者是用的构造器生成,孰优孰劣现在不纠结.

在GHCJS.Types中可以看到ToJSVal的实例是可以用coerce的,还提供了一个别名jsval.ghcjs-base中还提供了很多ffi,可以直接使用的canvas绘图和storage.整理的比较完善的JSString,还有GHCJS.Marshal中的 FromJSVal和ToJSVal实例,以后会派上用场.

## 后记

少写多篇,增强积极性.
