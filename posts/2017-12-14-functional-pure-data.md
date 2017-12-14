---
title: 2000后的新增函数式纯数据类型
---



# 新的数据结构

|  时间  | 名称                                       |      作者       |
| :--: | :--------------------------------------- | :-----------: |
| 2001 | ideal hash trees                         | Phil bagwell  |
| 2001 | single implementation technique for biority search queues |  Ralf Hinze   |
| 2002 | bootstrapping one-sided flexible arrays  |  Ralf Hinze   |
| 2003 | new catenable and none-catenable deques  |               |
| 2005 | maxiphobic heaps                         | Chris okasaki |
| 2008 | Confluently persistent trees for efficient version control |               |
| 2010 | a new purely functional delete algorithim for red-bloack trees |               |
| 2012 | RRB-trees:efficiant immutable            |               |
|      | biased search trees                      |               |

# 函数式纯数据结构的特点

1. 不能直接破坏性的改变一个值（immutable)
2. 数据结构也要非破坏性可升级，旧的与新的无冲突。（persistent）

# 惰性求值的特点

1. 表达式的计算被推迟，直到需要他的时候
2. 表达式在计算后会被记忆，再次需要的时候不会再次计算，而是查找