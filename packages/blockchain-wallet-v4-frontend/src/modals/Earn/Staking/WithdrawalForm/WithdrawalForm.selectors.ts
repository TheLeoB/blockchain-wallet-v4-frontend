import { lift } from 'ramda'
import { bindActionCreators } from 'redux'

import { ExtractSuccess, FiatType } from '@core/types'
import { actions, selectors } from 'data'
import { RootState } from 'data/rootReducer'

export const getActions = (dispatch) => ({
  analyticsActions: bindActionCreators(actions.analytics, dispatch),
  earnActions: bindActionCreators(actions.components.interest, dispatch),
  formActions: bindActionCreators(actions.form, dispatch)
})

export const getData = (state) => {
  const coin = selectors.components.interest.getCoinType(state)
  const walletCurrency: FiatType = selectors.core.settings.getCurrency(state).getOrElse('USD')

  return { coin, walletCurrency }
}

export const getRemote = (state: RootState) => {
  const coin = selectors.components.interest.getCoinType(state)
  const accountBalancesR = selectors.components.interest.getStakingAccountBalance(state)
  const ratesR = selectors.components.interest.getRates(state)
  const buySellAccountBalancesR = selectors.components.buySell.getBSBalances(state)

  return lift(
    (
      accountBalances: ExtractSuccess<typeof accountBalancesR>,
      buySellAccountBalances: ExtractSuccess<typeof buySellAccountBalancesR>,
      rates: ExtractSuccess<typeof ratesR>
    ) => ({
      accountBalances: accountBalances[coin] || '0',
      buySellBalance: buySellAccountBalances[coin]?.available || '0',
      rates
    })
  )(accountBalancesR, buySellAccountBalancesR, ratesR)
}
