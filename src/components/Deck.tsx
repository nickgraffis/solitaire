import React from "react"
import { useGlobalState } from "../App";
import { Card } from "./Card";

const SuitMap = [
  "hearts",
  "diamonds",
  "clubs",
  "spades"
]

export const Deck = (): JSX.Element => {
  const [deck, setDeck] = useGlobalState('deck');
  const restartDeck = () => {
    console.log('restarting deck')
    setDeck(prev => prev.map(card => {
      console.log(prev, card)
      return {
        ...card,
        flipped: false
      }
    }))
    console.log(deck)
  }
  return (<>
  <div className="flex space-x-4">
    {
      deck.filter(card => card.flipped).map((card, i: number) => {
        return i === deck.filter(card => card.flipped).length - 1 && <Card 
          key={i}
          cardObj={{...card}}
          isInDeck={true}
        />
      })
    }
    {
      deck.filter(card => !card.flipped).length ? 
        deck.filter(card => !card.flipped).map((card, i: number) => {
          return i === 0 && <Card 
            key={i}
            cardObj={{...card}}
            isInDeck={true}
          />
        }) :
        <div onClick={() => restartDeck()} className="h-[200px] w-[150px] shadow-inner"></div>
    }
  </div>
  </>)
}