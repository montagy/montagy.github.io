# webgl的缓冲区和绘制

            <div class="info">
    发表于: August 16, 2016

</div>
<div class="info">

      Tags: [ghcjs](../tags/ghcjs.html), [webgl](../tags/webgl.html)

</div>

## 简单梳理下webgl的运行过程

GPU从CPU获得顶点数据,先填充顶点着色器中的attribute和uniform变量,运行顶点着色器进行图元装配,光栅化,再运行片段着色器进行逐顶点着色,最后将结果输出到显示器上.

1.  GPU中存在着buffer(显存块),webgl在CPU中准备好顶点数据,然后输入到buffer中.
2.  顶点着色器读取buffer中的数据,根据标记来填充attribute和uniform.
3.  webgl只能绘制点,线和三角形,这三种称为图元.将顶点数据按图元装配.
4.  图元装配好后形状就出来了,这时候将他们映射到显示器上的像素,称为光栅化.
5.  光栅化后要绘制哪些点就出来了,将点信息传给片段着色器绘制显色,图形就显示出来了.

在这个过程中我们能控制的是1,2,5,也就是我们的ghcjs程序,顶点着色器和片段着色器.

## ghcjs

来看程序,操作buffer分为创建,绑定,传输数据.

<div class="sourceCode">

    vbo <span class="ot">&lt;-</span> createBuffer gl
    bindBuffer gl <span class="dt">ARRAY_BUFFER</span> vbo
    bufferData gl <span class="dt">ARRAY_BUFFER</span> (<span class="dt">Just</span> <span class="fu">$</span> <span class="dt">ArrayBuffer</span> threePoints) <span class="dt">STATIC_DRAW</span>`</pre></div>

    注意ARRAY_BUFFER,它表示我们绑定(bindBuffer)vbo为一个顶点数组数据,通过其他参数可以绑定其他数据,如顶点索引数据ELEMENT_ARRAY_BUFFER.

    向buffer传输数据(bufferData)时也要指明数据是ARRAY_BUFFER,然后第三个参数是一个Maybe ArrayBuffer. threePoints是个JSVal,是用ffi得到的,这里我们直接用ArrayBuffer构造器得到的ArrayBuffer数据, 没有用coerce强制转换,因为这个数据就用了一次,缺少条件判断它的类型,需要手动指定类型,那样反而麻烦了.第四个参数STATIC_DRAW表示buffer的用途.详情参考文档.

    threePoints是我们在main程序之外用ffi定义的一个JSVal类型数据,它是js中的Float32Array值.

    <div class="sourceCode"><pre class="sourceCode haskell">`foreign <span class="kw">import </span>javascript unsafe "new <span class="dt">Float32Array</span>([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])" threePoints :: <span class="dt">JSVal</span>`</pre></div>

    在ghcjs中引入js代码是非常方便的,前面都一样,引号里是js的代码,代码中可以出现关键字,$1,$2 等表示参数,$r表示返回值,具体可以参考[luite的博客](http://weblog.luite.com/wordpress/?p=14). 这里我们的threePoints是用Float32Array表示的三个点,每个点有x,y坐标两个值,按照顺序排列.

    我们需要绘制的数据已经准备好了,接下来指定顶点着色器中接收数据的attribute(或者uniform,此例中我们只用了attribute).

    <div class="sourceCode"><pre class="sourceCode haskell">`aPosition <span class="ot">&lt;-</span> fromIntegral <span class="fu">&lt;$&gt;</span> getAttribLocation gl program <span class="st">"a_Position"</span>
    vertexAttribPointer gl aPosition <span class="dv">2</span> <span class="dt">FLOAT</span> <span class="dt">False</span> <span class="dv">0</span> <span class="dv">0</span>
    enableVertexAttribArray gl aPosition`</pre></div>

    获取a_Position的位置,同之前一样,但我们这次先用了fromIntegral转换,&lt;$&gt;是functor的用法,可以说是haskell里频率最高的运算符了.vertexAttribPointer就是向attribute传输数据了, aPosition是attribute所在位置,相当于标记,第三个参数2表示值是2个数据表示一个顶点,也就是你接收的时候得2个一组,FLOAT表示数据的单个值是float, False表示是否启用归一运行,这个在webgl里面只能False.最后两个参数表示两个连续顶点之间的偏移值和起始位置,以后会讲到.

    最后我们还要允许这个attribute接收参数(enableVertexAttribArray),这在前面例子中没有,但用buffer时是必须的.

    最后是我们的绘制命令了

    <div class="sourceCode"><pre class="sourceCode haskell">`<span class="kw">let</span> n <span class="fu">=</span> <span class="dv">3</span>
    clearColor gl <span class="fl">0.0</span> <span class="fl">0.0</span> <span class="fl">0.0</span> <span class="fl">1.0</span>
    clear gl <span class="dt">COLOR_BUFFER_BIT</span>
    drawArrays gl <span class="dt">POINTS</span> <span class="dv">0</span> n
</div>

clearColor和clear我们都很熟悉了.第一行我们设置了n=3,在drawArrays里面使用.POINTS表示我们要绘制的图元,这里是点,0表示偏移值,也就是从哪个点开始绘制.n表示绘制n个顶点.

可以尝试将POINTS改为LINES, TRIANGLES等其他图元,看看绘制的是什么.

## 后记

opengl(包括webgl)这种就像是一个点一个点的处理数据,一个点进来到顶点着色器,然后输出一个点gl_Position,然后到片段着色器给它上色.

webgl讲完buffer后就算入门了,更深入的知识和shader语言我就不献丑了.后面主要分享haskell和ghcjs的使用心得.

我写的这些只是参考,不是教材.这些都是我自己的总结,语言组织不好,很多地方感觉配个图更好,但碍于水平有限.希望大家谅解和多提意见,共同学习.
