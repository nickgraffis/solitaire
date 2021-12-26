import React from "react"
import { useGlobalState } from "../App";
import { SuitMap } from "../dealer";
import { Card } from "./Card";

export const FinishedStack = (): JSX.Element => {
  const [finishedDeck, setFinishedDeck] = useGlobalState('finished');
  return (<div className="flex space-x-2">
    {
      Array(4).fill(0).map((_, i: number) => <div key={i}>
        {
          !finishedDeck[i].length ? 
            <div className="h-[200px] w-[133px] flex items-center justify-center rounded-sm bg-[#1A0033] shadow-xl">
              <img src={`./${SuitMap[i]}.svg`} alt={`SuitMap[i]`} className="h-[50%] w-[50%]" />
            </div> : 
            <Card 
              cardObj={finishedDeck[i][finishedDeck[i].length - 1]}
            />
        }
      </div>)
    }
  </div>)
}