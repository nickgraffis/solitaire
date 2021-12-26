import React from "react"
import { useGlobalState } from "../App";
import { Card } from "./Card";

const SuitMap = [
  "hearts",
  "diamonds",
  "clubs",
  "spades"
]

export const UnFinishedStack = (): JSX.Element => {
  const [unfinishedDeck, setUnfinishedDeck] = useGlobalState('unfinished');
  return (<div className="flex space-x-4 py-12">
    {
      Array(7).fill(0).map((_, i: number) => 
        <div 
        key={i} 
        >
          {
            unfinishedDeck[i].map((card, j: number) => 
            <div key={i + j + 'cards'} className={`${j !== 0 && '-mt-24'} h-[125px]`}>
              <Card 
                cardObj={card}
              />
            </div>)
          }
        </div>
      )
    }
  </div>)
}