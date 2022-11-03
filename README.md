# evangerypt

application deployed to https://evangerypt.vercel.app/

# technical stacks

* [Vite](https://ja.vitejs.dev/)
* [React](https://ja.reactjs.org/)
* [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja)
* [Hardhat](https://hardhat.org/)

# contract

deployed at polygon mumbai testnet.

[explorer](https://mumbai.polygonscan.com/address/0x3f578Ed2AA8825fA3A73DF82AF55F19014534550)

# what is evangerypt

```
I created a service called Evangerypt.
A coined word combining Evangelist and Crypt.
This service focuses on the mechanism of X to Earn, where you can actually earn crypt currency.
Evangerypt allows you to create ad tokens that record URLs for news, services, tweets, etc.that you want someone to know about.
We will provide X to Earn in the form of rewarding those who access the ad token.
Ad token rewards are paid by the person who created the ad, not the person who sees the ad.
This is the point that is decisively different from the existing X to Earn.
People who view ads only pay for gas.
People who sympathize with the advertisement will donate to the token.
The amount you donate will be added to your token reward amount.
The ad tokens are sorted in descending order of reward amount, and the ads that garner empathy are displayed at the top.
Information that everyone thinks is worth knowing is displayed, and you can earn virtual currency just by looking at new information.
Evangerypt is a new form of advertising distribution site that can be called such a direct reward type.
```

## 1. mint

![](./docs/mint.png)

Set the URL of something what you want to tell.

Configure the amount of pay and distribute num.



## 2. click advertisement

Clicking an ad link will trigger a reward transaction.

MetaMask makes notification to execute transaction.



## 3. donate

![](./docs/donate.png)

If you agree with the content of the ad, donate MATIC.

The donation amount will be added to the token reward amount.

# develop

```bash
cd frontend
npm install
npm run dev
```

access  [localhost:3000](http://localhost:3000/)
