import React, { FC, useRef } from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'
import { Cards, Suits, Card as CardType, SuitMap } from '../dealer'
import { knightImage } from './knightImage'
import useDoubleClick from '../useDoubleClick'
import { useFindOptions } from '../usDeck'
import { useGlobalState } from '../App'
type Props = {
  cardObj: CardType
}

export const Card = ({ cardObj }: Props): JSX.Element => {
  const [unfinishedDeck, setUnfinishedDeck] = useGlobalState('unfinished')
  const [finishedDeck, setFinishedDeck] = useGlobalState('finished')
  const cardRef = useRef<HTMLDivElement>(null)
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: cardObj.cardId,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  )

  const openCards = () => {
    const finished = finishedDeck.map((deck, i) => {
      if (!deck.length) {
         return {
           suit: SuitMap[i],
           value: 'zero'
         }
      } else {
        return deck[deck.length - 1]
      }
    })
    const unfinished = unfinishedDeck.map((deck, i) => {
      if (!deck.length) {
         return {
           suit: SuitMap[i],
           value: 'zero'
         }
      } else {
        return deck[deck.length - 1]
      }
    })

    return [...finished, ...unfinished]
  }

  const CardValueMap = [
    'ace',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'jack',
    'queen',
    'king'
  ]

  const red = ['hearts', 'diamonds']
  const black = ['clubs', 'spades']

  const findOptions = () => {
    const options = openCards()
    const color = red.includes(cardObj.suit) ? 'red' : 'black'
    const validOptions = []
    options.forEach((card, i ) => {
      const optionColor = red.includes(card.suit) ? 'red' : 'black'
      console.log(i > 3 && color !== optionColor &&  CardValueMap.indexOf(cardObj.value) + 1 === CardValueMap.indexOf(card.value))
      if (i < 4 && cardObj.suit === card.suit && CardValueMap.indexOf(cardObj.value) === CardValueMap.indexOf(card.value) + 1) {
        validOptions.push(card)
      } 
      
      if (i > 3 && color !== optionColor &&  CardValueMap.indexOf(cardObj.value) + 1 === CardValueMap.indexOf(card.value)) {
        validOptions.push(card)
      }
    })

    return validOptions
  }
  useDoubleClick({
    onDoubleClick: () => console.log(findOptions()),
    onSingleClick: () => console.log('single click'),
    ref: cardRef,
    latency: 250
  })

  return (
    <>
      <DragPreviewImage connect={preview} src={knightImage} />
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <div ref={cardRef}>
          {
            !cardObj.flipped ?
              <img src="./back.svg" className="h-[200px]" /> :
              <img src={cardObj.image} alt={cardObj.cardId} className="h-[200px]" />
          }
        </div>
      </div>
    </>
  )
}