import { ChainId, Token } from 'quickswap-sdk'
import getPairTokensWithDefaults from '../utils/getPairTokensWithDefaults'

export const PIT_POOLS: {
  [chainId in ChainId]?: {
    pid: number
    tokens: [Token, Token]
  }[]
} = {
  [ChainId.MATIC]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.MATIC, 'HOKK/WETH'),
    },
  ],
}
