![Logo](https://pic.tom24h.com/ors/jiumen-logo.svg)

<div align="center">

[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fz_ourspace)](https://twitter.com/z_ourspace)
[![Medium](https://img.shields.io/badge/Medium-gray?logo=medium)](https://zerodao.medium.com/)

</div>

<h5 align="center">
  <a href="./README.md">EN</a>
  <span> / </span>
  <a >中文</a>
</h5>

用于 DAO 和 Web3 项目的战略画布，目标是让成员在一分钟之内了解一个复杂的 DAO 。

Vue3 + vite + windi + X6 + Ceramic + IPFS.

## 开发

### 安装

```bash
yarn
```

### Schemas

#### `yarn create-model`

这将运行 create-model.mjs , 创建 `scripts/models/` 文件夹下的所有模型。需要在环境文件中修改 SEED 变量为 32 字节的十六进制编码，以便创建密钥 DID。

#### `yarn publish-model`

这将运行 publish-model.mjs 以将模型发布到 Ceramic。

### 启动

```bash
yarn dev
```

### 编译

```bash
yarn build
```
