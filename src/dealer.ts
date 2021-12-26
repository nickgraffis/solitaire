export enum Suits {
  hearts = 'hearts',
  diamonds = 'diamonds',
  spades = 'spades',
  clubs = 'clubs'
}

export const SuitMap = [
  "hearts",
  "diamonds",
  "clubs",
  "spades"
]

export enum Cards {
  ace = 'ace',
  two = 'two',
  three = 'three',
  four = 'four',
  five = 'five',
  six = 'six',
  seven = 'seven',
  eight = 'eight',
  nine = 'nine',
  ten = 'ten',
  jack = 'jack',
  queen = 'queen',
  king = 'king'
}

export type Card = {
  suit: Suits
  value: Cards
  flipped: boolean
  image: string,
  cardId: string
}

const _getSuit = (suitId: number): Suits  => {
  switch (suitId) {
    case 0:
      return Suits.spades;
    case 1:
      return Suits.hearts;
    case 2:
      return Suits.diamonds;
    case 3:
      return Suits.clubs;
    default:
      return Suits.spades;
  }
} 

const _getValue = (valueId: number): Cards => {
  switch (valueId) {
    case 0:
      return Cards.ace;
    case 1:
      return Cards.two;
    case 2:
      return Cards.three;
    case 3:
      return Cards.four;
    case 4:
      return Cards.five;
    case 5:
      return Cards.six;
    case 6:
      return Cards.seven;
    case 7:
      return Cards.eight;
    case 8:
      return Cards.nine;
    case 9:
      return Cards.ten;
    case 10:
      return Cards.jack;
    case 11:
      return Cards.queen;
    case 12:
      return Cards.king;
    default:
      return Cards.ace;
  }
}

const deck = Array(4).fill(0).map((_, suit) => Array(13).fill(0).map((_, number) => ({
  suit: _getSuit(suit),
  value: _getValue(number),
  image: `./${_getValue(number)}_${_getSuit(suit)}.svg`,
  flipped: false,
  cardId: `${_getValue(number)}_${_getSuit(suit)}`
}))).flat()

// Shuffle the deck of cards
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array
}

const shuffledDeck = shuffleArray(deck)

const row = (cards: number, flipped: number) => {
  const row = []
  let cardsFlipped = 0
  for (let i = 0; i < cards; i++) {
    row.push({
      ...shuffledDeck.pop(),
      flipped: cardsFlipped < flipped
    })
    cardsFlipped++
  }
  return row.reverse()
}

export const initialState = {
  gameId: '',
  deck: shuffledDeck,
  finished: [
    [],
    [],
    [],
    []
  ],
  unfinished: [
    row(1, 1),
    row(2, 1),
    row(3, 1),
    row(4, 1),
    row(5, 1),
    row(6, 1),
    row(7, 1),
  ]
}

