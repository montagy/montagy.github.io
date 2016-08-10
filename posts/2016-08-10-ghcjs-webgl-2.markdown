---
title: ghcjs webgl 初探(二)
---

## 关于webgl

现阶段的webgl是opengl ES2.0,后者在移动设备上取得了很大的成功,而在web上还在与flash争地盘.
我没用过flash,我用过opengl,感觉太过程式了,像历史遗留产物(据说vulkan很不错,目标也是取代opengl).
但是平常写应用很少直接使用这么底层的Api,都是用的别人写好的框架,像基于webgl的three.js就是很不错的,
几何图形,灯光什么的都封装好了,只需打个响指,pia,阳光就洒落在了一个球体上,有如上帝一般.

但是了解底层一点的东西总是很有必要的,这是突破框架限制和跳出框架思维必须的知识.

上篇文章中我们代码已经写到获取gl::WebGLRenderingContextBase了,而这就是我们webgl世界的起点.
先看代码

~~~{.haskell}
  let vertShaderSource = decodeUtf8 $(embedFile "shader/graph.vert")
      fragShaderSource = decodeUtf8 $(embedFile "shader/graph.frag")
  frg <- createShader gl FRAGMENT_SHADER
  shaderSource gl frg fragShaderSource
  compileShader gl frg

  vert <- createShader gl VERTEX_SHADER
  shaderSource gl vert vertShaderSource
  compileShader gl vert

  prog <- createProgram gl
  attachShader gl prog frg
  attachShader gl prog vert
  linkProgram gl prog
  useProgram gl prog
~~~

所谓的"现代"的opengl程序都是基于着色器的,以前是用的绘制指令来绘制线段和三角形,由此组成图形,
"现代"的opengl把这些指令的脏活累活交给了着色器.

在webgl中我们用的是顶点着色器(vertex shader)和片元着色器(fragment shader).着色器是用着色器语言写成
的,在程序的运行时加载的代码.在我们的程序中,我们把他们写在两个文件下面,shader/graph.vert和
shader/graph.frag.其代码如下

shader/graph.vert

~~~{.c}
void main() {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  gl_PointSize = 10.0;
}
~~~

shader/graph.frag

~~~{.c}
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
~~~

着色器语言是门类C语言,在这里不细说.我们的目标是haskell.

在let语句中我们用embedFile在编译时将文件读取为bytestring,再用decodeUtf8得到Text,这与我们直接
将shader文件里的内容写成string是等价的.如果用js来解释的话,那么

~~~{.javascript}
var vertShaderSource = 
  'void main(){\n' +
  'gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' +
  'gl_PointSize = 10.0;\n' +
  '}\n';
~~~

紧接着我们创建着色器对象(createShader), 将着色器资源载入这个对象(shaderSource),最后编译这个载有着色器的对象(compileShader).
这是一个完全过程式的代码,这就是opengl在运行时所做的事情,一步一步的怎么操作,你都要告诉它.后面我们还会看到
很多类似这样的操作.

我们根据顶点和片段这两个着色器创建了两个编译好的着色器对象,然后我们创建一个program对象来组装这两者,
通过attachShader和linkProgram后,我们就可以使用(useProgram)了.这时我们的着色器工作就做完了.

着色器所做的工作都是程序在运行时GPU所做的工作,现在我们回到CPU里面来,下面我们控制CPU给GPU发送命令,
来完成我们最简单的webgl程序.

~~~{.haskell}
clearColor gl 0.0 0.0 0.0 1.0
clear gl COLOR_BUFFER_BIT
drawArrays gl POINTS 0 1
~~~

clearColor 是设置背景色,后面的四个数字参数是rgba.我们这里设置的是黑色.
clear是清空现在画布上的缓存内容,这是准备绘制的一个过程.参数COLOR_BUFFER_BIT表示我们清空了颜色缓冲区.
最后drawArrays就是我们的绘制程序了,这里是绘制了一个POINTS.

我们这个最简单的ghcjs-webgl程序就这么结束了,当编译完后,启动一个web服务器,根目录指向./dist/build/example/example.jsexe
,然后在浏览器打开,就能看到一个400X400的黑框里有个红色的小方块.

## 后记

因为只是想分享ghcjs和webgl的使用经验,所以很多地方说的很粗,因为涉及的知识确实很多,
推荐两本书,一本haskell基础的 *learn you a haskell for great good*,中文翻译为haskell趣学,
网上有在线版.一本webgl入门的 *webgl programming guide* 中文翻译webgl编程指南.

上面我们的着色器program在CPU中并没有用到,下篇我会讲讲如何与着色器交互.我想写一个系列的文章,在写了一定数量后会在github创个项目分享配套的代码.
