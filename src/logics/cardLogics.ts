import { useGlobalState } from '../App'
import { SuitMap } from '../dealer'

export const useOpenCards = () => {
  const [finishedDeck] = useGlobalState('finished')
  const [unfinishedDeck] = useGlobalState('unfinished')
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

export const CardValueMap = [
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

export const useValidMoves = (cardObj) => {
  const red = ['hearts', 'diamonds']
  const color = red.includes(cardObj.suit) ? 'red' : 'black'
  const options = useOpenCards()
  const validOptions = []
  options.forEach((card, i ) => {
    const optionColor = red.includes(card.suit) ? 'red' : 'black'
    if (i < 4 && cardObj.suit === card.suit && CardValueMap.indexOf(cardObj.value) === CardValueMap.indexOf(card.value) + 1) {
      validOptions.push({
        ...card,
        position: i
      })
    } 
    
    if (i > 3 && color !== optionColor &&  CardValueMap.indexOf(cardObj.value) + 1 === CardValueMap.indexOf(card.value)) {
      validOptions.push({
        ...card,
        position: i
      })
    }

    if (i > 3 && cardObj.value === 'king' && card.value === 'zero') {
      validOptions.push({
        ...card,
        position: i
      })
    }
  })

  return validOptions
}