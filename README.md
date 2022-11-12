# monorepo

该项目主要放一些 demo 项目做快速的上手

> 指定源安装，.yarnrc 没有生效。yarn --registry="https://registry.npm.taobao.org"

仅对某个项目安装依赖
yarn workspace [packageName] command

```shell
yarn workspace node-ts-utils add -D typescript
```

### 发布 @ansiked/node-static-server

```shell
# 登陆
npm login --registry=http://registry.npmjs.org/
# 编译
npm build
# 发布到公共仓库
npm publish --access public
```