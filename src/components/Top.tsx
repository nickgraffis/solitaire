import React from "react"
import { FinishedStack } from "./FinishedStack"
import { Deck } from "./Deck"
export const Top = (): JSX.Element => {
  return (<div className="flex justify-between w-full">
    <div className="flex space-x-2">
      <FinishedStack />
    </div>
    <div className="flex justify-end">
        <Deck />
    </div>
  </div>)
}