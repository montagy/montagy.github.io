# 关于forall

            <div class="info">
    发表于: October 20, 2016

</div>
<div class="info">

      Tags: [haskell](../tags/haskell.html)

</div>

forall是一个关键字,在所有使用类型参数的地方都暗含了forall

<div class="sourceCode">

    map<span class="ot"> ::</span> (a<span class="ot">-&gt;</span>b) <span class="ot">-&gt;</span> [a] <span class="ot">-&gt;</span> [b]
    map<span class="ot"> ::</span> forall a b<span class="fu">.</span> (a<span class="ot">-&gt;</span>b) <span class="ot">-&gt;</span> [a] <span class="ot">-&gt;</span> [b]`</pre></div>

    上面两者是等价的,它在语义上对应于数学中的对∀(于一切),意思是a,b可以为任意的类型.而有时候会明确的写明forall,这又是为什么了?

    主要原因是编译器在做类型推到的时候遇到了问题,不能正确推理出类型参数,这时候用forall来给类型参数做一些约束.具体分为两大类:

    一种是forall做为∀的情况,这种情况下又分为两类

    ### ScopedTypeVariables

    <div class="sourceCode"><pre class="sourceCode haskell">`<span class="ot">foob ::</span> (b <span class="ot">-&gt;</span> b) <span class="ot">-&gt;</span> b <span class="ot">-&gt;</span> (a <span class="ot">-&gt;</span> b) <span class="ot">-&gt;</span> <span class="dt">Maybe</span> a <span class="ot">-&gt;</span> b
    foob f onNothing onJust mval <span class="fu">=</span> f val
        <span class="kw">where</span>
    <span class="ot">        val ::</span> b
            val <span class="fu">=</span> maybe onNothin onJust mval`</pre></div>

    这段代码不能通过编译,因为编译器不能正确的推理出val::b的b与foob定义中的类型参数b相同.在一个函数的内部制定类型时用到了类型参数,这是合理的,且应用面很广,ghc暂时没有原生支持,通过扩展ScopedTypeVariables来支持,看修改后的代码:

    <div class="sourceCode"><pre class="sourceCode haskell">`<span class="ot">{-# LANGUAGE ScopedTypeVariables #-}</span>
    <span class="ot">foob ::</span> forall a b<span class="fu">.</span> (b <span class="ot">-&gt;</span> b) <span class="ot">-&gt;</span> b <span class="ot">-&gt;</span> (a <span class="ot">-&gt;</span> b) <span class="ot">-&gt;</span> <span class="dt">Maybe</span> a <span class="ot">-&gt;</span> b
    foob f onNothing onJust mval <span class="fu">=</span> f val
        <span class="kw">where</span>
    <span class="ot">        val ::</span> b
            val <span class="fu">=</span> maybe onNothin onJust mval`</pre></div>

    使用扩展ScopedTypeVariables后,val::b的b就与类型参数b相同了,理解为这两个b在同一个作用域内.而forall在这里的用法是ScopedTypeVariables要求的,其实就是明示a,b可以为任意类型.

    ### RankNTypes

    rank-n-types涉及的面很广,要正确理解它需要对System F有所了解,我们通过一个例子来简单了解下这种情况下forall的用法.

    <div class="sourceCode"><pre class="sourceCode haskell">`<span class="ot">liftTup ::</span> (x <span class="ot">-&gt;</span> f x) <span class="ot">-&gt;</span> (a, b) <span class="ot">-&gt;</span> (f a, f b)
    liftTup liftFunc (t, v) <span class="fu">=</span> (liftFunc t, liftFunc v)`</pre></div>

    这段代码不能通过编译,错误为x不匹配b.而在我们的逻辑中x是类型参数,它可以会任意类型,b同理.但在编译器看来,x,b必须是不同的,因为是两个不同的参数.ghc通过扩展RankNTypes来使x可以为任意的类型,甚至与a,b相同.

    <div class="sourceCode"><pre class="sourceCode haskell">`<span class="ot">{-# LANGUAGE RankNTypes #-}</span>
    <span class="ot">liftTup ::</span> (forall x<span class="fu">.</span> x <span class="ot">-&gt;</span> f x) <span class="ot">-&gt;</span> (a, b) <span class="ot">-&gt;</span> (f a, f b)
    liftTup liftFunc (t, v) <span class="fu">=</span> (liftFunc t, liftFunc v)`</pre></div>

    注意这里的forall是只作用于liftFunc的x的.

    ### Existential Quantification

    另一种forall是作为∃(存在于)来使用的,通过扩展ExistentialQuantification来对类型参数进行存在行约束.

    <div class="sourceCode"><pre class="sourceCode haskell">`<span class="ot">{-# LANGUAGE ExistentialQuantification #-}</span>
    <span class="kw">data</span> <span class="dt">EQList</span> <span class="fu">=</span> forall a<span class="fu">.</span> <span class="dt">EQList</span> [a]
    <span class="ot">eqListLen ::</span> <span class="dt">EQList</span> <span class="ot">-&gt;</span> <span class="dt">Int</span>
    eqListLen (<span class="dt">EQList</span> x) <span class="fu">=</span> length x
</div>

要理解ExistentialQuantification牵涉到更多的东西,但它的用法是简单的,就是在定义data时使用forall修饰类型参数用于表示,存在类型a使EQList [a]构成类型EQList.

### 后记

对于数学上的对于一切a与存在a这两个概念有何异同,我也是一知半解,所以无法表达出来. 了解forall的用法是为了阅读别人的代码,在lens中就有大量RankNTypes的用法,而ScopedTypeVariables的用法更是随处可见.能阅读了才能用,对什么时候用ScopedTypeVariables是很直观的,至于RankNTypes和ExistentialQuantification,我大部分时候是在编译器的提示下写的.
