# 🃏 Solitare

* ⚡️💨 Vite - for super fast development
* 💅 TailwindCSS
* 🃏 - Cards by [Rohit Chouhan](https://www.figma.com/@rohitchouhan)

# 👵🏻 Who's it for?
My mom, have fun with it if you like...

# 🤔 Things to consider
1. How should I make this a really useable drag and drop? 🤔...Working on it, for now, it's just moving cards with the double click.
2. What should I do when the user wins? 🤷‍♂️...That is always the coolest part right?

# 🤓 Nerdy stuff
When creating a new game we need to start off with a deck of cards:

```ts
const deck = Array(4).fill(0).map((_, suit) => Array(13).fill(0).map((_, number) => ({
  suit: _getSuit(suit),
  value: _getValue(number),
  image: `./${_getValue(number)}_${_getSuit(suit)}.svg`,
  flipped: false,
  cardId: `${_getValue(number)}_${_getSuit(suit)}`,
  position: -1
}))).flat()
```
We create an array of 4 suits, then inside each array another array of 13 cards.
* `suit: '❤️' | '♠️' | '💎' | '♣️'`
* `value: 'ace' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine' | 'ten' | 'jack' | 'queen' | 'king'`
* `image: string` -- card svgs named by card value and card suit
* `flipped: boolean` -- is the card visible or not, defaults to `false`
* `cardId: string` -- a unique id
* `position: number` -- what position within the game board, defaults to `-1` 

After we have a deck we need to shuffle that deck:
```ts
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
```

Then we need to build up the game _board_
```ts
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
```

Here the deck is all of the shuffled cards that are not used in the `unfinished` array. 

The `finished` array is all empty to start.

The `unfinished` array needs to be filled with cards, and have the last one flipped:

```ts
const row = (cards: number, flipped: number) => {
  const row = []
  let cardsFlipped = 0
  for (let i = 0; i < cards; i++) {
    row.push({
      ...shuffledDeck.pop(),
      flipped: cardsFlipped < flipped,
      position: cards + 3
      //+ 3 because 0, 1, 2, 3 are all for the finished slots
    })
    cardsFlipped++
  }
  return row.reverse()
}
```

Now we have our initial game state and we can add cards to either a position within the `unfinished` array, or to the `finished` array if the card is an ace or if we have found an ace and the card is ready to be placed in the finished pile.

We can display cards from the deck by _flipping_ them.
