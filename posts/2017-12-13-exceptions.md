---
title: 读snoyberg的异常处理(笔记)
---
从pure的观点触发，exceptions必须是type safe的，如Either,Maybe 等形式。异步exceptions本身就是个麻烦。

但ghc并不认为异步异常是个麻烦，且在ＩＯ中可以有基于Exception类的异常。



这是个编译器预设的理念：在IO中允许运行时异常，且任意thread会被一个异步异常在任意时刻结束。

由此，异步处理复杂起来了。

比如在IO中使用ExceptT

eg:

```haskell
myFunction :: String -> ExceptT MyException IO Int
```

1. 无法compose,MyException被限定了
2. 它的隐藏含义是错的--myFunction只能抛出MyException这一个异常。只要在ＩＯ中就可以抛出任意同步异常和异步异常
3. 用throwE或liftIO . throwIO 就可以表达这个ExceptT

用Text取代MyException可以解决compose的问题，但Text相比MyException失去了结构意义。

另一个常见错误：讲所有可能产生异步异常的地方都mask起来了。这会导致CPU沉余。

## MonadThrow

```haskell
foo <- lookup "foo" m
bar <- lookup "bar" m
baz <- lookup "baz" m
f foo bar baz
```

当f返回Nothing的时候，我们并不知道错误出在哪。但有时候我们可能想知道错误出在哪，lookup会在遇到错误时给我们传达信息，可能的方法有Either，这样就会产生面条式的代码。

```haskell
case lookup "foo" m of
	Left a -> dosomething
	Right b -> b
```

用MonadThrow类来应对多个不同的处理错误的场景。

```haskell
lookup :: (MonadThrow m, Eq k) => k -> [(k, v)] -> m v
f :: MonadThrow m => SomeVal -> SomeVal -> SomeVal -> m result
```

Either, Maybe, IO都是MonadThrow的实例，这样在不同的场景下就有不同的处理错误方式。

## Transformers

```haskell
foo :: Int -> IO String
```

foo很容易通过liftIO来提升到MonadIO

```haskell
bar :: FilePath -> (Handle -> IO a) -> IO a
```

bar的第二个参数就没法提升为MonadIO，这使得bar整体的提升也成问题。

用transformer使涉及要异常处理的函数更有通用性。（多线程中使用）

```haskell
bar :: (MonadIO m , MonadMask m ) => FilePath -> (Handle -> m a) -> m a
```

## 直接使用error函数生成的错误是在一个很高的call stack上

避免直接使用error。用自定义的Exception。

```haskell
data SomethingBad = SomethingBad deriving Typeable
instance Show SomethingBad 
	show SomethingBad = "some bad happend"
instance Exception SomethingBad
```

然后用throwM来抛出这个异常。这个异常就处在一个相对低的call stack上，可以被上层捕获。

