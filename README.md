<div align="center">
  
![Logo](https://pic.tom24h.com/ors/jiumen-logo.svg)

[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fzerodaonet)](https://twitter.com/z_ourspace)
[![Discord](https://img.shields.io/badge/Discord-gray?logo=discord)](https://discord.gg/K56C6jtr)
[![Medium](https://img.shields.io/badge/Medium-gray?logo=medium)](https://zerodao.medium.com/)

</div>

<h5 align="center">
  <a >EN</a>
  <span> / </span>
  <a href="./README_ZH.md">中文</a>
</h5>

Certainty of information is one of the most important foundations in communication, and is especially important in large-scale collaboration. It seems to go back to the parable of the Tower of Heaven, where God trapped people in different dialects in order to prevent the Tower from being built. For thousands of years, we have been improving the certainty of information in collaboration. One sees hope in programming languages that have almost perfect determinism, where you give them the same input and they always produce the same output (technically this is not rigorous, but you get the idea). The only question is who will do the input? Allende said I'll do it myself, and we all know what happened after that. The advent of the blockchain once again brought an unprecedented ray of hope that all people control the ultimate uniqueness and no dictatorship is possible, and people have built many successful DAOs (in the broad sense) on top of that. Yet hidden dangers have long been buried like landmines in all the flowers along the road from the beginning to the present.

The efficiency of communication does not only depend on the language we use, people are extremely complex and their thoughts cannot be calculated. A long time ago, Kafka explored this issue in the novel "When the Great Wall was Built" in a very delicate way, in which an ordinary soldier who built the Wall, who had been away from home for decades, began to think about his own meaning and the meaning of the Wall. He was very frustrated that the best years of his life were wasted on seemingly meaningless things. Of course, in Don Juan's narrative, the Great Wall played a historic role in the military and economic blockade. However, this did not matter to the average local soldier of the time.

This is not unlike our current situation, where we are trying to build great communities in a Web3 world, with a democratic DAO in control. Ask how people should make decisions. How do they get the information they need to make decisions? We have a very "developed" social media, and because of Shannon's Law, adding and expanding channels only makes information dissemination less efficient, so we have to increase the power of the senders of information, the big Twitterers, the crypto elites you know so well. At this point, we have once again fallen into a Machiavellian utopia. We have ushered in an even more frightening dictatorship, which is not alarmist, but is literally and momentarily happening all around us. Only it is no longer the whip that the slave masters wield, but words, and when faced with it, people no longer fear it, but accept it gladly, because they believe that it is their choice.

Those with insightful views are most likely to drown in elitist arrogance.

However, people are complex. So am I. We're going to change all that, even if we still end up in some kind of rational wheelhouse. That's what JIUMEN does, it reduces the channels of information dissemination as much as possible and increases the efficiency of information dissemination. Many DAOs are very informative, with forums, tweets, telegrams, Discord, etc. They even record every single meeting. It is easy to fall into the vortex of the information deluge and naturally become convinced of the logic of self-justification. jIUMEN is a strategic canvas whose goal is to allow people to understand the full picture of a complex DAO in less than a minute and to quickly find areas of interest to dive into.

Why do you need a completely new product to do all this? Many Web3 projects use notion to manage workflows and are perfectly satisfied with openness and collaboration. But JIUMEN does something completely different. Traditional companies and organizations don't have the need to disclose a complete strategy, even trade secrets. At the same time they have onboarding, culture walls, and endless meetings to keep employees informed about the company they work for. So JIUMEN was going where no one had ever gone before and we had to embark on an adventure.

JIUMEN is still a conceptual experiment, and I'm glad you're here to build it together. The name comes from one of my favorite historical figures -- Yu Qian. He was able to stop the retreating army after it was wiped out, organize the old and sick of the capital to fight to the death, and when the troops were at the city's edge, he was determined to line up the army outside the nine gates, and he eventually won. I hope that when you open JIUMEN, you will not only be faced with a blank canvas, but also the courage to line up the three armies outside the nine gates, and together with the community, use your wisdom to create a strategic layout as elegant and detailed as a work of art.

Demo: [ZeroDAO Strategy](https://www.zerodao.net/)

A strategic canvas for DAO and Web3 projects, with the goal of getting members to understand a complex DAO in less than a minute.

**It is currently in MVP phase and lacks some core features. It is untested because the contract needs to be refactored.**

Vue3 + vite + windi + X6 + SmartWeave , 请确保 Node.js 16.5+ .

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

### 启动

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
