import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../state'
import useCurrentBlockTimestamp from './useCurrentBlockTimestamp'

// combines the block timestamp with the user setting to give the ttl that should be used for any submitted transaction
export default function useTransactionttl(): BigNumber | undefined {
  //@ts-ignore
  const ttl = useSelector<AppState, number>(state => state.user.ttl)
  const blockTimestamp = useCurrentBlockTimestamp()
  return useMemo(() => {
    if (blockTimestamp && ttl) return blockTimestamp.add(ttl)
    return undefined
  }, [blockTimestamp, ttl])
}
