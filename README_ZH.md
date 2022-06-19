![Logo](https://pic.tom24h.com/ors/jiumen-logo.svg)

<div align="center">

[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fzerodaonet)](https://twitter.com/zerodaonet)
[![Discord](https://img.shields.io/badge/Discord-gray?logo=discord)](https://discord.gg/K56C6jtr)
[![Medium](https://img.shields.io/badge/Medium-gray?logo=medium)](https://zerodao.medium.com/)

</div>

<h5 align="center">
  <a href="./README.md">EN</a>
  <span> / </span>
  <a >中文</a>
</h5>

用于 DAO 和 Web3 项目的战略画布，目标是让成员在一分钟之内了解一个复杂的 DAO 。背后更多的动机可以阅读。

**目前处于 MVP 阶段，尚缺乏一些核心功能。因为合约需要重构，未经测试。**

Vue3 + vite + windi + X6 + SmartWeave , 请确保 Node.js 16.5+ .

## 开发

### 安装

```bash
yarn
```

### 导入 `jwk`

建立目录 `./.secrets` ，并添加 `jwk.json` 文件，如果你没有账号，可以到 [Arweave](https://arweave.app/wallet/) 生成。

### 本地部署合约

这将在本地启动 `arlocal` , 并部署 JIUMEN 合约。

```bash
yarn deploy:al
```

### 启动

打开新窗口。

```bash
yarn al
```

### 部署合约

```bash
// 部署合约到测试网
yarn deploy:dev

// 部署合约到主网，确保余额充足
yarn deploy:main
```

### 编译

```bash
yarn build
```
