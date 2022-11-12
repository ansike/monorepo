# @ansiked/node-static-server

```shell
const http = require('http');
const { default: StaticServer } = require('@ansiked/node-static-server');
# 配置static server
const staticServer = StaticServer("static");

const app = http.createServer((req, res)=>{
  staticServer(req, res);
})

app.listen(90);
```
