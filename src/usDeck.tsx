import { store, useGlobalState } from "./App";
import { Card, Cards, SuitMap, Suits } from "./dealer";

export const useFindOptions = () => {
  return {
    check: (card: Card, finishedDeck, unfinishedDeck) => {
      if (card.value === Cards.ace) {
        const copyOfFinishedDeck = [...finishedDeck]
        finishedDeck.splice(SuitMap.indexOf(card.suit), 1)
        const newFinishedDeck = [
          ...finishedDeck,
          [...copyOfFinishedDeck[SuitMap.indexOf(card.suit)], card]
        ]; 
        console.log(newFinishedDeck)
        return newFinishedDeck
      }
    }
  }
}