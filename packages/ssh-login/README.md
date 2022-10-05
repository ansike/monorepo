# ssh 登录服务器逻辑

该方法为使用 node 和服务器进行 ssh 连接，建连之后通过 node 的 process 和连接的 stream 进行数据通信

# 其他思路

以上的方案有个比较的问题：无法完全模拟 terminal 登录的所有逻辑
可以新开一个进程，启动 terminal，然后自动登录
可以参考该方案：https://ansike.github.io/blog/programming/%E7%BC%96%E7%A8%8B/mac/open/