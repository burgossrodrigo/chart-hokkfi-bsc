import { ChainId, Token } from '@hokk/bsc-sdk'
import getPairTokensWithDefaults from '../utils/getPairTokensWithDefaults'

export const PIT_POOLS: {
  [chainId in ChainId]?: {
    pid: number
    tokens: [Token, Token]
  }[]
} = {
  [ChainId.MAINNET]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.MAINNET, 'HOKK/WETH'),
    },
  ],
}
