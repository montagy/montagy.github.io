---
title: ghcjs webgl 初探
---

当浏览器想取代桌面应用的时候,出现了html5,当haskell想取代javascript的时候,
出现了ghcjs.让我们来看看用haskell在浏览器上调用显卡绘制图形是种什么样的体验.

准备工作
=======

 1. 支持html5的浏览器.如果你还在用IE的话,请用IE12.其他浏览器不是很老的版本都没问题.
 2. ghc-7.10.3和最新的cabal.不推荐用stack.stack是非常好的工具,但存在一个很严重的不是
 问题的问题,如果你没有翻墙代理的话,下载包会很慢..很慢..
 3. 安装ghcjs.从github上clone下来,按说明安装吧,安装过程如果没有代理的话,也要花点时间.

开始干活
=======

主要的依赖包是ghcjs-dom-0.2.4.0,就是js上的Dom.有了dom我们在浏览器上就几乎无所不能了.
如果对Dom不是很了解的话,推荐去[MDN](https://developer.mozilla.org)上看文档
起手import好依赖后,输入如下代码

> main :: IO ()
> main = runWebGUI $ \win -> do
>   enableInspector win
>   Just doc <- webViewGetDomDocument win
>   Just body <- getBody doc
>   Just canvas <- createElement doc (Just "canvas")
>   setAttribute canvas "width" "400"
>   setAttribute canvas "height" "400"
>   _ <- appendChild body (Just canvas)
>   gl :: WebGLRenderingContextBase <- coerce <$> getContext (coerce canvas) "webgl"

runWebGUI和enableInspector是兼容gtk的写法,在浏览器上理解为当html文件加载完毕后开始
执行就行,相当于jquery的document ready系列.
haskell上是没有Nullable(null, undefined)的,但有Maybe,它比Nullable要安全.所以凡是有可能
出现Nullable值的地方就是Maybe值.我们在代码中忽略了Nothing值,直接取了Just,这肯定是在
偷懒,但相对是安全的.在实际项目中可以写个waitJust函数来等待结果,保证程序的正确性

>  waitJust :: IO (Maybe a) -> IO a
>  waitJust f = do
>    ma <- f
>    case ma of
>      Nothing -> threadDelay a_little_sec >> whenJust f
>      Just a -> return a

可能很多人都习惯性的打开OverLoadedStrings,但是在ghcjs-dom下最好别开,因为很多参数的
约束都是ToJSString的实例,而ToJSString的三个实例JSString, Text, String在
OverLoadedStrings打开的情况下反而不好判断了.例如代码中的 

~~~~~{.haskell}
setAttribute canvas "width" "400"
~~~~~

不打开就是String,打开了是String或者Text,在没有更多信息的情况下,编译器无法判断.

实例代码中的最后一行用到了coerce(强制类型转换),简单来说coerce能在具有相同运行时
类型的不同类型间转换.它是在编译时转换的,如果不能转换的话是编译错误,所以它是非常
安全的.
ghcjs中从js导入的函数在haskell中对应的类型是JSVal.js中的Element对象是JSVal,
HTMLCanvasElement也是一个JSVal,而我们知道在js中HTMLCanvasElement也是Element,
所以这两者间是能通过coerce强制转化的.
如果不用coerce的话,我们可以查文档找到各类型间的转换方式,比如代码中的canvas,现在是个
Element,转为HTMLCanvasElement的话可以castToHTMLCanvasElement,
getContext得到的是一个JSVal,我们可以直接用WebGLRenderingContextBase构造器封装它
为WebGLRenderingContextBase类型.
最后我们得到了gl::WebGLRenderingContextBase(注意这种写法是打开了ScopedTypeVariables扩
展的),而所有的webgl操作都是在gl下面进行的,下篇我们再聊webgl.

后记
===

本人水平有限,很多知识点都是浅尝辄止,只说了自己了解的.
欢迎大家修正和讨论.一起学习,共同进步.
