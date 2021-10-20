import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
import warning from 'tiny-warning'
// @ts-ignore
import { SendReturnResult, SendReturn, Send, SendOld } from './types'

function parseSendReturn(sendReturn: SendReturnResult | SendReturn): any {
  // eslint-disable-next-line no-prototype-builtins
  return sendReturn.hasOwnProperty('result') ? sendReturn.result : sendReturn
}

export class NoBscProviderError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'No BSC provider was found on window.BinanceChain.'
  }
}

export class UserRejectedRequestError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'The user rejected the request.'
  }
}

export class BscConnector extends AbstractConnector {
  constructor(kwargs: AbstractConnectorArguments) {
    super(kwargs)

    this.handleNetworkChanged = this.handleNetworkChanged.bind(this)
    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  private handleChainChanged(chainId: string | number): void {
    // @ts-ignore
    this.emitUpdate({ chainId, provider: window.BinanceChain })
  }

  private handleAccountsChanged(accounts: string[]): void {
    if (accounts.length === 0) {
      this.emitDeactivate()
    } else {
      this.emitUpdate({ account: accounts[0] })
    }
  }

  private handleClose(): void {
    this.emitDeactivate()
  }

  private handleNetworkChanged(networkId: string | number): void {
    // @ts-ignore
    this.emitUpdate({ chainId: networkId, provider: window.BinanceChain })
  }

  public async activate(): Promise<ConnectorUpdate> {
    // @ts-ignore
    if (!window.BinanceChain) {
      throw new NoBscProviderError()
    }
    // @ts-ignore
    if (window.BinanceChain.on) {
      // @ts-ignore
      window.BinanceChain.on('chainChanged', this.handleChainChanged)
      // @ts-ignore
      window.BinanceChain.on('accountsChanged', this.handleAccountsChanged)
      // @ts-ignore
      window.BinanceChain.on('close', this.handleClose)
      // @ts-ignore
      window.BinanceChain.on('networkChanged', this.handleNetworkChanged)
    }
    // @ts-ignore
    if ((window.BinanceChain as any).isMetaMask) {
      // @ts-ignore
      ;(window.BinanceChain as any).autoRefreshOnNetworkChange = false
    }

    // try to activate + get account via eth_requestAccounts
    let account

    try {
      // @ts-ignore
      account = await (window.BinanceChain.send as Send)('eth_requestAccounts').then(
        (sendReturn) => parseSendReturn(sendReturn)[0]
      )
    } catch (error) {
      if ((error as any).code === 4001) {
        throw new UserRejectedRequestError()
      }
      warning(false, 'eth_requestAccounts was unsuccessful, falling back to enable')
    }

    // if unsuccessful, try enable
    if (!account) {
      // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
      // @ts-ignore
      account = await window.BinanceChain.enable().then((sendReturn) => sendReturn && parseSendReturn(sendReturn)[0])
    }
    // @ts-ignore
    return { provider: window.BinanceChain, ...(account ? { account } : {}) }
  }

  public async getProvider(): Promise<any> {
    // @ts-ignore
    return window.BinanceChain
  }

  public async getChainId(): Promise<number | string> {
    // @ts-ignore
    if (!window.BinanceChain) {
      throw new NoBscProviderError()
    }

    let chainId
    try {
      // @ts-ignore
      chainId = await (window.BinanceChain.send as Send)('eth_chainId').then(parseSendReturn)
    } catch {
      warning(false, 'eth_chainId was unsuccessful, falling back to net_version')
    }

    if (!chainId) {
      try {
        // @ts-ignore
        chainId = await (window.BinanceChain.send as Send)('net_version').then(parseSendReturn)
      } catch {
        warning(false, 'net_version was unsuccessful, falling back to net version v2')
      }
    }

    if (!chainId) {
      try {
        // @ts-ignore
        chainId = parseSendReturn((window.BinanceChain.send as SendOld)({ method: 'net_version' }))
      } catch {
        warning(false, 'net_version v2 was unsuccessful, falling back to manual matches and static properties')
      }
    }

    if (!chainId) {
      // @ts-ignore
      if ((window.BinanceChain as any).isDapper) {
        // @ts-ignore
        chainId = parseSendReturn((window.BinanceChain as any).cachedResults.net_version)
      } else {
        chainId =
          // @ts-ignore
          (window.BinanceChain as any).chainId ||
          // @ts-ignore
          (window.BinanceChain as any).netVersion ||
          // @ts-ignore
          (window.BinanceChain as any).networkVersion ||
          // @ts-ignore
          (window.BinanceChain as any)._chainId
      }
    }

    return chainId
  }

  public async getAccount(): Promise<null | string> {
    // @ts-ignore
    if (!window.BinanceChain) {
      throw new NoBscProviderError()
    }

    let account
    try {
      // @ts-ignore
      account = await (window.BinanceChain.send as Send)('eth_accounts').then(
        (sendReturn) => parseSendReturn(sendReturn)[0]
      )
    } catch {
      warning(false, 'eth_accounts was unsuccessful, falling back to enable')
    }

    if (!account) {
      try {
        // @ts-ignore
        account = await window.BinanceChain.enable().then((sendReturn) => parseSendReturn(sendReturn)[0])
      } catch {
        warning(false, 'enable was unsuccessful, falling back to eth_accounts v2')
      }
    }

    if (!account) {
      // @ts-ignore
      account = parseSendReturn((window.BinanceChain.send as SendOld)({ method: 'eth_accounts' }))[0]
    }

    return account
  }

  public deactivate() {
    // @ts-ignore
    if (window.BinanceChain && window.BinanceChain.removeListener) {
      // @ts-ignore
      window.BinanceChain.removeListener('chainChanged', this.handleChainChanged)
      // @ts-ignore
      window.BinanceChain.removeListener('accountsChanged', this.handleAccountsChanged)
      // @ts-ignore
      window.BinanceChain.removeListener('close', this.handleClose)
      // @ts-ignore
      window.BinanceChain.removeListener('networkChanged', this.handleNetworkChanged)
    }
  }

  public async isAuthorized(): Promise<boolean> {
    // @ts-ignore
    if (!window.BinanceChain) {
      return false
    }

    try {
      // @ts-ignore
      return await (window.BinanceChain.send as Send)('eth_accounts').then((sendReturn) => {
        if (parseSendReturn(sendReturn).length > 0) {
          return true
        }
        return false
      })
    } catch {
      return false
    }
  }
}
