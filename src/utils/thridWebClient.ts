import {
  createThirdwebClient,
  getContract,
} from "thirdweb";
import { defineChain } from "thirdweb/chains";

import { inAppWallet, createWallet } from "thirdweb/wallets";
export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

//Base sepolia 
//Smart contract of market
export const NotYourTypeContract = getContract({
  client,
  chain: defineChain(84532),
  address: "0x75A2D95e300A4fD89c9c7999629455c841607BC5",
});

//ERC20
export const BaseBettingTokenContract = getContract({
  client,
  chain: defineChain(84532),
  address: "0x5Bf9865C929e9541C3237667f529cC36FABe0ceE",
});


export const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "email"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];
