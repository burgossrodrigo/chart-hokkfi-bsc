import { ChainId, JSBI, Percent, Token, WETH } from 'quickswap-sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { bsc, injected, portis, walletconnect, walletlink } from '../connectors'

export const ROUTER_ADDRESS = '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff'
export const FACTORY_ADDRESS = '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32'
export const ZERO_ADDRESS = '0x000000000000000000000000000000000000dead'

export { PRELOADED_PROPOSALS } from './proposals'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}


export const HOKK = new Token(ChainId.MATIC, '0xf28164A485B0B2C90639E47b0f377b4a438a16B1', 18, 'dQUICK', 'Dragon QUICK')

//export const BUSD = new Token(ChainId.MATIC, '0xe9e7cea3dedca5984780bafc599bd69add087d56', 18, 'BUSD', 'Binance USD')
export const ETH = new Token(ChainId.MATIC, '0x2170ed0880ac9a755fd29b2688956bd959f933f8', 18, 'ETH', 'Ethereum Token')
export const USDC = new Token(
  ChainId.MATIC,
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  18,
  'USDC',
  'Binance-Peg USD Coin'
)
export const DAI = new Token(ChainId.MATIC, '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', 18, 'DAI', 'DAI USD')
export const USDT = new Token(ChainId.MATIC, '0x55d398326f99059ff775485246999027b3197955', 18, 'USDT', 'Wrapped USDT')
export const WBTC = new Token(ChainId.MATIC, '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c', 18, 'WBTC', 'Wrapped Bitcoin')

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 13
export const PROPOSAL_LENGTH_IN_BLOCKS = 40_320
export const PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS

export const GOVERNANCE_ADDRESS = ZERO_ADDRESS

export const TIMELOCK_ADDRESS: any = ZERO_ADDRESS

const UNI_ADDRESS = '0xf28164A485B0B2C90639E47b0f377b4a438a16B1'
//const UNI_ADDRESS = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
export const UNI = {
  [ChainId.MATIC]: new Token(ChainId.MATIC, UNI_ADDRESS, 18, 'CAKE', 'PancakeSwap Token'),
  [ChainId.MUMBAI]: new Token(
    ChainId.MUMBAI,
    '0xf73d010412fb5835c310728f0ba1b7dfde88379a',
    18,
    'CAKE',
    'PancakeSwap Token Test'
  ),
}

export const MASTER_BREEDER: { [chainId in ChainId]: string } = {
  [ChainId.MATIC]: ZERO_ADDRESS,
  [ChainId.MUMBAI]: ZERO_ADDRESS,
}

export const PIT_BREEDER: { [chainId in ChainId]: string } = {
  [ChainId.MATIC]: ZERO_ADDRESS,
  [ChainId.MUMBAI]: ZERO_ADDRESS,
}

/*
export const PIT: { [chainId in ChainId]: Token } = {
  [ChainId.MATIC]: ZERO_ADDRESS,
  [ChainId.MUMBAI]: ZERO_ADDRESS

}
*/

/*
export const PIT_SETTINGS: { [chainId in ChainId]: Record<string, string> } = {
  [ChainId.MATIC]: { name: '', path: '/' },
  [ChainId.MUMBAI]: { name: '', path: '' },

}
*/
export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [UNI_ADDRESS]: 'UNI',
  [GOVERNANCE_ADDRESS]: 'Governance',
  [TIMELOCK_ADDRESS]: 'Timelock',
}

// TODO: specify merkle distributor for MATIC
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC]: ZERO_ADDRESS,
}
const WETH_ONLY: ChainTokenList = {
  [ChainId.MATIC]: [WETH[ChainId.MATIC]],
  [ChainId.MUMBAI]: [WETH[ChainId.MUMBAI]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MATIC]: [...WETH_ONLY[ChainId.MATIC], USDC],
}


export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MATIC]: {
    '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c': [new Token(ChainId.MATIC, UNI_ADDRESS, 18, 'WBNB', 'Wrapped BNB')],
    /*
    [HOKK.address]: [BUSD],
    [BUSD.address]: [HOKK],
    */
  },
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MATIC]: {},
}

// used for display in the default list when adding liquidity

export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  //[ChainId.MATIC]: [...WETH_ONLY[ChainId.MATIC], UNI],
}

// used to construct the list of all pairs we consider by default in the frontend

export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MATIC]: [...WETH_ONLY[ChainId.MATIC]],
}
export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MATIC]: [[WETH[ChainId.MATIC], HOKK]],
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5',
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true,
  },
  BSC_WALLET: {
    connector: bsc,
    name: 'BSC Wallet',
    iconName: 'binancelogo.png',
    description: 'Login using BSC hosted wallet',
    href: null,
    color: '#FFFF00',
    mobile: true,
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true,
  },
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 400
// 20 minutes, denominated in seconds
export const DEFAULT_ttl_FROM_NOW = 60 * 20

// used for rewards ttls
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// SDN OFAC addresses

export const BLOCKED_ADDRESSES: string[] = []
