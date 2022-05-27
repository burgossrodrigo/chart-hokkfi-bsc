import { ChainId } from 'quickswap-sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MATIC]: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507', // TODO
  [ChainId.MUMBAI]: '',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
