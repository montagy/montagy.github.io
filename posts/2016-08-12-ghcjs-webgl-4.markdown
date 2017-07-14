---
title: ghcjs webgl 初探(四)
---

Web上的交互主要在Dom层,我们接着上面的内容来写个触发鼠标点击的小程序.上文中我们通过attribute向着色器传输要绘制的点的坐标,然后用drawArrays来绘制, 如果我想动态的绘制这个点了?比如鼠标点一下就在鼠标点的位置绘制一个点.

先上代码

~~~{.haskell}
uPointSize <- getUniformLocation gl program "u_PointSize"
uniform1f gl uPointSize 10.0
aPosition <- getAttribLocation gl program "a_Position"

points <- newIORef []
_ <- canvas `on` click $</span> <span class="kw">do</span>
  (x, y) <span class="ot">&lt;-</span> mouseOffsetXY
  points $~ ((x,y) :)
  points' <- get points
  clear gl COLOR_BUFFER_BIT
  forM_ points' $ \(x', y') -> do
    vertexAttrib3f gl (fromIntegral aPosition) ((fromIntegral x' - 200.0)/200.0) ((200.0 - fromIntegral y')/200.0) 0.0
    drawArrays gl POINTS 0 1

clearColor gl 0.0 0.0 0.0 1.0
clear gl COLOR_BUFFER_BIT
~~~

前面三行昨天已经见过.points是个IORef值,初始化为[].IORef是一个在IO中可以改变的值,可以简单理解为IO中的变量.所以

~~~{.haskell}
    points <- newIORef []
~~~

就相当于js中的 * var points = [] *.

我们在后面操作IORef值时用了StateVar这个包.StateVar将IO中可变数据的操作抽象为HasGetter,HasSetter,HasUpdate三个typeclass,分别表示可获取 可设置和可更新.对应的类型方法为get, $=(表示set), $~(表示update).IORef已经是他们的实例了,可以直接使用.如果自定义的数据想在IO中通过这三个方法操作 的话,可以用makeStateVar封装一下,非常方便.

初始化points之后就是我们今天的主题,绑定Dom事件.我们知道Dom通过addListener来绑定事件,ghcjs-dom中有同名函数.但我们一般用on.

~~~{.haskell}
  on :: (IsEventTarget t, IsEvent e) => t -> EventName t e -> EventM t e () -> IO (IO ())
~~~

on更强大,它创建listener,绑定事件,返回值为取消事件的函数.canvas是个Element,也是IsEventTarget的实例.click是一个事件名字(EventName),是在Element上能触发的事件. Element上能触发的事件有很多,包括keyDown,mouseDown, select等,这些可以参考[MDN](https://developer.mozilla.org)文档.

EventM t e ()就是我们的回调函数,当事件触发时,它会执行,我们的绘制逻辑都在这里.

EventM t e ()实际是ReaderT e IO (), 它是一个Reader Monad,持有的是当前发生的事件,类比js中回调函数的参数event就可以.如果不明白ReaderT也没关系,在这里我们可以简单的 理解为回调函数有一个额外的不需要我们标明的参数event,它表示当前发生的那个事件,它还是MonadIO的实例,可以执行MonadIO,或者通过liftIO直接运行IO.

目光回到我们的回调函数中,是一个用do展开的表达式,这是每个haskeller每天都要面对的东西(Monad).简单的理解为按顺序执行的语句.我们通过mouseOffsetXY获得了鼠标点击处的坐标, 坐标是相对于canvas的,就是以canvas左上角为起点,向右为x轴正方形,向下为y轴正方向.1px表示1,我们宽高都是400, 所以坐标是一个(0,0)~(400,400)之间的数值对.然后我们更新points的值, 注意$~后面是更新函数,是以从points获取的值为参数,执行这个函数再存入points.第三行再取出points的值,可以用atomicModifyIORef来做这种先更新再取出来的操作, 它能够保证线程安全.我们这个单线程的程序就这么简单的用吧.

下面我们就要绘制了,绘制前我们先清空下颜色缓存.鼠标每点一下canvas,我们就存了一个坐标,然后把所存的坐标全部绘制出来.这个过程是对每一个坐标,我们传输值到attribute,然后drawArrays, 我用的forM_,这里用forM也是一样的,心里想着忽略返回值的时候,用forM_或者mapM_是种习惯.vertexAttrib3f的赋值与之前的一样,这里要注意的是opengl是以canvas的中心为原点的,右为 X轴正方向,上为Y轴正方向,且边界处值为1(中心到右边界为宽的1/2,中心到上边界为高的1/2).而canvas Element的坐标系是和它不一样的,这里需要做一个变换.最后我们drawArrays,就完成绘制了.

回调函数的返回值为取消listener的函数,我们这里没有使用就忽略了,用void忽略掉也是可以的(void $ canvas `on` click $ do ….),但个人喜欢这样写,感觉更美观,或许说不定 哪天这个函数又派上用场了,那需要改写的地方也少.最后两行是绘制的背景色,我们之前见过.因为事件是只有在触发时才会执行,所以不clear的画是看不到背景的.

## 后记

初探就讲完了,很多函数的用法没有细讲,希望有兴趣的朋友多查文档,haddock是很方便的.之后我还会继续分享ghcjs和webgl的应用,ghcjs方面会讲到调用js中的函数(FFI)和一些包(lens,linear)的用法, webgl方面的内容可能会多一点,包括缓冲区,纹理和一些3D知识.
