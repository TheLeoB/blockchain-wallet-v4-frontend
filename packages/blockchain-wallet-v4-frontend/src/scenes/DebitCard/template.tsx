import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Icon } from 'blockchain-info-components'
import {
  HeaderTextWrapper,
  IconBackground,
  SceneHeader,
  SceneHeaderText,
  SceneSubHeaderText
} from 'components/Layout'
import { ModalName } from 'data/modals/types'

import { Props } from '.'
import CardDashboard from './CardDashboard'
import CardOrder from './CardOrder'
import { Wrapper } from './model'

const DebitCard = ({ cards, modalActions }: Props) => {
  const handleOpenOrderMyCard = () =>
    modalActions.showModal(ModalName.ORDER_MY_CARD, { origin: 'DebitCardPage' })

  return (
    <Wrapper>
      <SceneHeader>
        <HeaderTextWrapper>
          <IconBackground>
            <Icon name='credit-card-sb' color='blue600' size='26px' />
          </IconBackground>
          <SceneHeaderText>
            <FormattedMessage id='copy.debit_card' defaultMessage='Debit Card' />
          </SceneHeaderText>
        </HeaderTextWrapper>
      </SceneHeader>
      <SceneSubHeaderText>
        <FormattedMessage
          id='scenes.debit_card.intro.subheader'
          defaultMessage='Taking crypto into the physical world.'
        />
      </SceneSubHeaderText>
      {cards.length === 0 ? (
        <CardOrder handleOpenOrderMyCard={handleOpenOrderMyCard} />
      ) : (
        <CardDashboard />
      )}
    </Wrapper>
  )
}

export default DebitCard