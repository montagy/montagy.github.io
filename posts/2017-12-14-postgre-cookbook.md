---
title: postgreSQL 9 administration cookbook 第一章笔记
---



### postgre特性

1. 良好支持SQL2011及以下版本的标准。
2. C/S架构
3. 高并发设计，读与写互不祖塞
4. 可配置性，可扩展性
5. 支持大量类型的数据模型：关系型、文档型（JSON和XML) 以及key/value类型

读写不阻塞：多版本并发控制

### 链接
postgre的访问接口都使用libpq库，所以链接方式基本相同。
五个参数及其对应的环境变量
- 主机名或者主机地址 PGHOST/PGHOSTADDR
- 端口 PGPORT(默认5432)
- 数据库名 PGDATABASE
- 用户 PGUSER
- 密码 PGPASSWORD

从9.2开始，支持URI格式
```shell
psql postgres://myuser:mypassword@myhost:5432/mydb
```
链接成果后查看链接信息
```shell
\conninfo
select current_database();
select current_user;
select inet_server_addr(), inet_server_port();
select version();
```
注意有的是函数，有的是column,有的是psql的快捷指令。

### 启用网络/远程访问
默认禁用远程访问。
#### 配置文件的位置
```shell
show config_file;
```
现实配置文件的位置。
在postgresql.conf中编辑以下行：
```shell
listen_addresses = '*'
```
在pg_hba.conf的第一行添加
```shell
# Type DATABASE USER CIDR-ADDRESS METHOD
  host all      all  0.0.0.0/0    md5
```
这样就打开了远程访问权限，具体的以后再说。

### 使用psql查询和脚本工具
psql同时提供交互式查询和脚本功能
链接：
```shell
psql -h hostname -p 5432 -d dbname -U username
```
会让你输入密码，然后进入交互模式。

非交互模式
```shell
psql -c "select current_time"
psql -f examples.sql
```
-c就是非交互式的执行一条语句，-f是非交互式的执行一个文件中的语句。
不管是在交互还是非交互模式中，运行一条语句得到的结果都是相同的。

psql的交互模式中，除了执行sql语句，还有元命令。元命令以\开头。
psql中的注释：单行用--,多行与C相同
```c
/*
*多行注释
*/
```
常用元命令
- \?:显示元命令列表。
- \h:后接sql 命令，提供sql命令的帮助信息。

### 修改密码
```shell
\password
alter user myuser password 'yourpwd';
```
alter的修改方式是明文密码，不推荐.

### 避免硬编码你的密码
不要在链接时直接写出密码，如：password=xxx
不要使用PGPASSWORD
写在有访问权限控制的文件中，以host:port:dbname:user:password的形式。密码文件用PGPASSFILE来定位，或者是~/.pgpass

### 使用链接服务文件
如果觉得链接时的参数过多，可以将他们写入文件中。
```shell
psql service=dbservice1 user=montagy
```
而这个文件为/etc/pg_service.conf或者~/.pg_service.conf
内容
```shell
[dbservice1]
host=postgres1
port=5432
dbname=postgres
```
也可以用PGSYSCONFDIR来指定配置文件的位置，或PGSERVICE直接指定文件.
配置文件与上面的密码文件可以配合使用。


### 链接故障排查
读懂出错信息。
pg_isready程序帮助排查.
