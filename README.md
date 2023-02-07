<div align="center">

![Logo](https://pic.tom24h.com/ors/jiumen-logo.svg)

</div>

<h5 align="center">
  <a >EN</a>
  <span> / </span>
  <a href="./README_ZH.md">中文</a>
</h5>


Demo: [Tyr it online](https://alpha.jiumen.io/)
Official Website: [JIUMEN](https://www.jiumen.io/)

A strategic canvas for DAO and Web3 projects, with the goal of getting members to understand a complex DAO in less than a minute.

Traditional companies have a clear organizational structure and information is delivered through specific organizational structures very efficiently. information in DAO is disseminated through the community, which resembles a peer-to-peer network topology, so the amount of information received by each user grows super linearly. This increases the information asymmetry between investors, communities, and project parties, creating the problem of difficult collaboration. For example, a Defi project in June 2022 led to a financial risk and governance crisis because there was no risk management. Using a clear strategic canvas, perhaps the community could have identified this apparently fatal problem.

![](https://pic.tom24h.com/jiumen/fjiumen.svg)

Vue3 + vite + windi + X6 + Ceramic + IPFS.

## Development

### Setup

```bash
yarn
```

### Schemas

#### `yarn create-model`

This will run create-model.mjs , creating all models in the `scripts/models/` folder. The SEED variable needs to be modified in the environment file to a 32-byte hexadecimal code in order to create the key DID.

#### `yarn publish-model`

This will run publish-model.mjs to publish the model to Ceramic.

### Quick Start

```bash
yarn dev
```

### 编译

```bash
yarn build
```

## Features

- Visualization strategy
- Additional documents can be added to each `Shape` and `Group`
- Complete internationalization solution including graphics and documentation
- Decentralized permanent storage

## TODO-List

- Replace Vue3 with react
- Engine replacement
- Using IPFS to store thumbnails and media files
- Support CRDT
- Authentication with NFT support
- An application to showcase great canvases
