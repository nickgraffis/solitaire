import React, { FC, useRef } from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'
import { Cards, Suits, Card as CardType, SuitMap } from '../dealer'
import { knightImage } from './knightImage'
import useDoubleClick from '../useDoubleClick'
import { useFindOptions } from '../usDeck'
import { useGlobalState } from '../App'
import { useOpenCards, useValidMoves } from '../logics/cardLogics'
type Props = {
  cardObj: CardType,
  isInDeck: boolean,
}

export const Card = ({ cardObj, isInDeck }: Props): JSX.Element => {
  const [unfinishedDeck, setUnfinishedDeck] = useGlobalState('unfinished')
  const [finishedDeck, setFinishedDeck] = useGlobalState('finished')
  const [deck, setDeck] = useGlobalState('deck')
  const cardRef = useRef<HTMLDivElement>(null)
  const openCards = useOpenCards()
  const validMoves = useValidMoves(cardObj)
  if (!cardObj) return <div>No card</div>
  // const [{ isDragging }, drag, preview] = useDrag(
  //   () => ({
  //     type: cardObj.cardId,
  //     collect: (monitor) => ({
  //       isDragging: !!monitor.isDragging(),
  //     }),
  //   }),
  //   [],
  // )

  const CardSuitMap = [
    'hearts',
    'diamonds',
    'clubs',
    'spades'
  ]

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
    const validOptions = validMoves
    if (validOptions.length) {
      // is it in unfinished or finished?
    if(validOptions[0].position < 4) {
      console.log(finishedDeck)
      console.log(validOptions)
      setFinishedDeck(prev => prev.map((deck, i) => { 
        if (CardSuitMap[i] === validOptions[0].suit) {
          prev[i].push(cardObj)
          if (isInDeck) {
            setDeck(prev => prev.filter(card => card.cardId !== cardObj.cardId))
          } else {
            setUnfinishedDeck(prev => prev.map((col, i) => {
              if (i === cardObj.position) {
                prev[i] = prev[i].slice(0, prev[i].length - 1)
                if (prev[i].length) prev[i][prev[i].length - 1].flipped = true
              }
    
              return prev[i]
            }))
          }
        } 
        console.log(prev[i])
        return prev[i]
      }))
    } else if (validOptions[0].position > 3) {
        // Get the card from the unfinished deck
        let targetCards
        const cardsToMove = []
        if (!isInDeck) {
          targetCards = [...unfinishedDeck[cardObj.position]]
          cardsToMove.push(...targetCards.splice(targetCards.indexOf(targetCards.find(card => card.cardId === cardObj.cardId))))
          console.log(cardsToMove)
        }
        setUnfinishedDeck(prev => prev.map((col, i) => {
          // Add the card to the column
          if (i === validOptions[0].position - 4 && !isInDeck) {
            prev[i] = [...prev[i], ...cardsToMove]
          }

          if (i === validOptions[0].position - 4 && isInDeck) {
            prev[i] = [...prev[i], cardObj]
          }
          // Remove the old card
          if (i === cardObj.position && !isInDeck) {
            prev[i] = prev[i].slice(0, prev[i].length - cardsToMove.length)
            if (prev[i].length) prev[i][prev[i].length - 1].flipped = true
          }

          return prev[i]
        }))

        if (isInDeck) {
          setDeck(prev => prev.filter(card => card.cardId !== cardObj.cardId))
        }
      }
    }
  }

  const flipCard = () => {
    setDeck(prev => prev.map((col, i) => {
      if (cardObj.cardId === col.cardId) {
        prev[i].flipped = !prev[i].flipped
      }
      return prev[i]
    }))

    console.log(deck)
  }
  useDoubleClick({
    onDoubleClick: () => (isInDeck && !cardObj.flipped) ? flipCard(): findOptions(),
    onSingleClick: () => console.log('single click'),
    ref: cardRef,
    latency: 250
  })

  return (
    <>
      {/* <DragPreviewImage connect={preview} src={knightImage} /> */}
      <div
        // ref={drag}
        // style={{
        //   opacity: isDragging ? 0.5 : 1,
        // }}
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