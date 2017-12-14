---
title: boxed与unboxed浅谈
---



# boxed

boxed 是最小封装系统或语言所有的原始类型上的数据结构。可理解为简单数据类型的组合，一般做为指针存储在heap中。

访问一个boxed数据份两步：

1. 获取指针
2. 获取指针所指向的原始类型

# primitive value(原始类型)

是任意可存在call stack中的值，而非一个指向heap的指针

# unboxed

是编译器直接操作底层的数据，而非heap