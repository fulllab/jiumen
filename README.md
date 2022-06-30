<div align="center">

![Logo](https://pic.tom24h.com/ors/jiumen-logo.svg)

</div>

<h5 align="center">
  <a >EN</a>
  <span> / </span>
  <a href="./README_ZH.md">中文</a>
</h5>


Demo: [ZeroDAO Strategy](https://www.zerodao.net/)
Official Website: [JIUMEN](https://www.jiumen.io/)

A strategic canvas for DAO and Web3 projects, with the goal of getting members to understand a complex DAO in less than a minute.

**It is currently in MVP phase and lacks some core features. It is untested because the contract needs to be refactored.**

Traditional companies have a clear organizational structure and information is delivered through specific organizational structures very efficiently. information in DAO is disseminated through the community, which resembles a peer-to-peer network topology, so the amount of information received by each user grows super linearly. This increases the information asymmetry between investors, communities, and project parties, creating the problem of difficult collaboration. For example, a Defi project in June 2022 led to a financial risk and governance crisis because there was no risk management. Using a clear strategic canvas, perhaps the community could have identified this apparently fatal problem.

![](https://pic.tom24h.com/jiumen/fjiumen.svg)


Vue3 + vite + windi + X6 + SmartWeave , Ensure Node.js 16.5+ .

## Development

### Install

```bash
yarn
```

### Import `jwk`

Create a directory `./.secrets` ，and add the `jwk.json` file.

### Local Deployment Contracts

```bash
yarn deploy:al
```

### Launch 

Open a new window.

```bash
yarn al
```

### Deploy Contract

```bash
// Deploy contract to the test network
yarn deploy:dev

// Deploy contracts to the main network
// It is still a test network, so there is no need to have a balance
yarn deploy:main
```

### Build

```bash
yarn build
```

## Features

- Visualization strategy
- Additional documents can be added to each `Shape` and `Group`
- Complete internationalization solution including graphics and documentation
- Decentralized permanent storage

## Official Plan

- Refactoring Contracts
- Replace Vue3 with react, because the graphics engine doesn't support Vue well enough
- Multi-user version, where each DAO and web3 project can quickly build its own strategy canvas
- Eth wallet compatible, no need to pay storage fees
- An application to showcase great canvases
