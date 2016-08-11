---
title: ghcjs webgl 初探(三)
---

着色器程序是在GPU中运行的,那CPU如何将数据发送给GPU来运行了?

## WebGL

用着色器中的attribute 或 uniform变量.

*graph.vert*

~~~{.glsl}
attribute vec4 a_Position;
uniform float u_PointSize;
void main() {
  gl_Position = a_Position;
  gl_PointSize = u_PointSize;
}
~~~

attribute变量传输的是与顶点相关的数据.uniform变量传输的是与所有顶点都相同的数据.

## ghcjs

在上文中我们创建了program(createProgram),并用它加载了着色器并使用,现在我们就向program
绑定的顶点着色器中的attribute变量a_Position,和uniform变量u_PointSize传输数据.

~~~{.haskell}
aPosition <- getAttribLocation gl prog "a_Position"
vertexAttrib3f gl (fromIntegral aPosition) 0.5 0.0 0.0

uPointSize <- getUniformLocation gl prog "u_PointSize"
uniform1f gl uPointSize 10.0
~~~

首先我们用getAttribLocation来通过名字获得a_Position的地址,这个地址是GLint类型,也就是Int32(都是
通过文档查到的).我们通过vertexAttrib3f来给这个地址发送3个GLfloat值,GLfloat就是Double,所以用小数点
表示的数字就可以了.而vertexAttrib3f需要的地址值为GLuint,也就是Word32,而aPosition是Int32类型,
这在强类型的语言里是不能自动转换的,需要手动转换.因为Int32和Word32都是Integral和Num的实例,所以可以很方便的用
fromIntegral在他们之间转换.这样就给着色器中attribute变量a_Position传输了三个Double值0.5, 0.0, 0.0.

像GLint,GLuint这种GL开头的类型是opengl为了兼容性自己定义的基本数据类型,方便在不同的操作系统上移植.
他们会实际对应一个"本地"的类型.

同attribute类似,我们用getUniformLocation通过变量名来得到u_PointSize的地址,不同于attribute变量的地址
是个Int32数字,uniform变量的地址是个WebGLUniformLocation类型,而uniform1f需要的也是这个类型,免去了转换.

## 后记

我们的程序非常简单,给a_Position就传输了一个顶点(0.5, 0.0, 0.0),给uniform1f传输了一个浮点数10.0.这在
webgl的世界里面就是print hello world级别.我想再写完一篇webgl的绘制原理之后再深入webgl.下篇我还是把重心放在
ghcjs上,演示下ghcjs-dom下如何绑定事件.
