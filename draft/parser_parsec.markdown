# 学习下Parsec

            <div class="info">
    发表于: August 25, 2016

</div>
<div class="info">

      Tags: [haskell](../tags/haskell.html), [parser](../tags/parser.html), [parsec](../tags/parsec.html)

</div>

## 什么是Parser

简单来说parser就是接收数据,然后生成含有结构的数据.而数据在这里可以是普通的文本字符串,也可以是程序中的数据结构.例如编译器,它读取文件,由文件内容生成语法树,然后执行语法树.例如常用的正则表达式就是接收字符串返回字符串.它们都是parser.parser就是在input上运用规则,生成output,这样一想就觉得很多东西都属于parser,我们常用的读取json,提取html中的数据都是parser.所以这是计算机编程中很大的一个类目.

在haskell中鼓励用parser代替正则表达式,首先正则表达式本身就是parser,只是它有一套自己的语法和函数,但它的语法并不好读.下面我们会看到parser的表达方式是很语义化的,很好理解.当我们将一中数据转换为另一种数据的时候都可以考虑下parser,例如[Either ErrorInfo String],想压缩这个结构为Maybe String就可以通过parser将Either ErrorInfo String看做最小单位(token)来运用parser.

## Parsec与其他parser的区别

Parsec是haskell-platform默认会安装的包(虽然现在安装haskell-platform已经不是首选方案).它是入门后的最佳进阶学习材料,首先它的内容涵盖了Applicative,Monad,Monad Transformer,这些在练习中时刻运用到;其次除了算法的实现之外,其他代码都通俗易懂.

在了解了parser后你会发现有非常多的parser包,包括Parsec,Megaparsec, Attoparsec,Earley等等.他们或者是用的算法不一样,或者是在一些技术细节比如backtrace,context-free上有差异.这写差异在你掌握了Parsec的内容之后都能很好的推广.而且也有一些包帮你做了一些适配的工作,让你能用相同的语法作用与不同的parser包.

## 主要内容

现在haskell社区的一个问题就是,不喜欢写文档.所以很多包文档很少,甚至没有文档.但不得不说,在大部分情况下,一个函数的类型都能告诉你它的大概作用,然后通过函数名来做一些用法的推断.当然,这绝对不能成为不写文档的理由.

包安装完成后它的文档(handock)就生成了(注意cabal config中的document为True),我从使用者的角度说下如何阅读包的文档.

首先看的是根文档Text.Parsec,第一行就告诉我们了它有使用这个包的一切.很多包都会将内容re-export到根目录中方便使用.首先看到了ParsecT,它的定义稍显复杂,这是与它的实现算法有关,我们只使用它,不必深究.看它instance了哪些typeclass,每个typeclass为它提供了一些功能.我们看到了Functor, Applicative, Monad, MonadTrans等等,我们一般称这样的data是monadic的.然后我们看到了Stream,这是个typeclass.Stream是个经常出现的概念,我们遇到的更多的是Fusion Stream,它是种处理数据流的方式,conduit,text都用到了Fusion Stream.这里的Stream更直白,它表示由最小单位(token)t组成的data s,然后上下文环境(monad)m.由定义函数uncons可知,只要s能在monad m下表示为一个token和剩余部分(类型还是s),那么s m t就满足Stream的条件.

<div class="sourceCode">

    <span class="kw">class</span> <span class="dt">Monad</span> m <span class="ot">=&gt;</span> <span class="dt">Stream</span> s m t <span class="fu">|</span> s <span class="ot">-&gt;</span> t <span class="kw">where</span>
    <span class="ot">  uncons ::</span> s <span class="ot">-&gt;</span> m (<span class="dt">Maybe</span>(t, s))`</pre></div>

    从ParsecT是MonadTrans我们就能推断出会存在run函数来得到结果,在这里是runParsecT, runParser, parse.

    除开一些与ParsecT的数据结构有关的功能之外,ParsecT的功能主要体现在两方面,一个是ParsecT的组合,一个是生成ParsecT.

    #### 组合(Combinators)

    组合能让我们将多个小的parser组成一个大的parser.在使用parser的时候设计到一个消耗(consumed)的概念,如何parser在开头处匹配成功,然后继续匹配时失败了,它的结果是失败的,但它消耗了input.如果parser一开始就失败了,那它就没有消耗input.这里try就是提供假装不消耗input的能力,与&lt;|&gt;的配合使用会经常出现.&lt;|&gt;是出自Alternative,表示抉择,左边如果成功了就返回左边的结果,如果失败了执行右边.但它要求左边是不消耗input的.choice是由&lt;|&gt;构建的.

    many系列表示对一个parser执行多次,它是基于manyAccum的.manyAccum是基于定义构建的原子性操作.option系列也是基于&lt;|&gt;的.sepBy p q系列的q是个分隔符,就是运行p,然后运行q,但只返回p,如此执行多次直到遇到匹配失败,返回[p].例如anyChar `seqBy` char ‘,’,在匹配“a,b,c,d”时得到[‘a’,‘b’,‘c’,‘d’](=“abcd”).然后是endBy系列与sepEndBy系列也好理解了,end表示以什么结尾.chain系列里值为函数的ParsecT,在使用的时候是fold的意思.

    最后注意下lookAhead和anyToken,他们都是由ParsecT的定义来实现的.

    #### 生成ParsecT

    组合生成的就是ParsecT,但我们这是看看由定义生成的,不使用其他parser生成的ParsecT.

    上面已经讲看到了几个.如anyToken,lookAhead.最基本的是

    <div class="sourceCode"><pre class="sourceCode haskell">`<span class="ot">tokenPrim ::</span> (<span class="dt">Stream</span> s m t)
              <span class="ot">=&gt;</span> (t <span class="ot">-&gt;</span> <span class="dt">String</span>)                      <span class="co">-- ^ Token pretty-printing function.</span>
              <span class="ot">-&gt;</span> (<span class="dt">SourcePos</span> <span class="ot">-&gt;</span> t <span class="ot">-&gt;</span> s <span class="ot">-&gt;</span> <span class="dt">SourcePos</span>) <span class="co">-- ^ Next position calculating function.</span>
              <span class="ot">-&gt;</span> (t <span class="ot">-&gt;</span> <span class="dt">Maybe</span> a)                     <span class="co">-- ^ Matching function for the token to parse.</span>
              <span class="ot">-&gt;</span> <span class="dt">ParsecT</span> s u m a
</div>

这里可以看到ParsecT并不是针对的以Char为基础的各种字符串类型,只要满足是Stream的instance都可以生成parser.

当然我们用的最多的还是parser以Char为基础的各种String.看下Text.Parsec.Char中的函数.satisfy是基础,它由tokenPrim构建,以Char为单位,做判断,满足条件则消耗掉这个Char并作为返回值,如果不满足则失败.oneOf, noneOf, space, upper, lower, alphaNum, digit, hexDight, octDight, char, anyChar等都是构建于它.

核心就是以token为单位,做一些判断,成功则消耗掉它.多个ParsecT组合在一起就是按顺序做判断,直到有判断失败则停止.结果值由monad的方式生成.

## 后记

因为我以后会用到parser来解析obj文件,生成顶点及材质等各种数据运用于webgl,所以和大家一起学习下Parsec.
