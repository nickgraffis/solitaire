import React, { FC, useRef, useState } from 'react'
import logo from './logo.svg'
import { initialState } from './dealer';
import { createGlobalState, createStore } from './state';
import { useDrag, DragSourceMonitor, DndProvider } from "react-dnd";
import { Stage } from './components/Stage';
import { Top } from './components/Top';
import { UnFinishedStack } from './components/UnFinishedStack';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const store = createGlobalState(initialState);
export const { useGlobalState, setGlobalState } = store;

type Props = { }

export const App: FC<Props> = () => {
  const [gameId, setGameId] = useGlobalState('gameId');
  const [deck, setDeck] = useGlobalState('deck');
  const [finishedDeck, setFinishedDeck] = useGlobalState('finished');
  const [unfinishedDeck, setUnfinishedDeck] = useGlobalState('unfinished');


  return (
    <DndProvider backend={HTML5Backend}>
      <Stage>
        <Top />
        <UnFinishedStack />
      </Stage>
    </DndProvider>
  )
}


{/* <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-600">
      <div className="max-w-5xl mx-auto py-12">
        <div className="flex justify-between w-full">
          <div className="flex space-x-2">
            <div ref={refs.hearts} className="h-[125px] w-[92px] flex items-center justify-center rounded-sm bg-[#1A0033] shadow-xl">
              <img src="./hearts.svg" alt="hearts" className="h-[50%] w-[50%]" />
            </div>
            <div ref={refs.diamonds} className="h-[125px] w-[92px] flex items-center justify-center rounded-sm bg-[#1A0033] shadow-xl">
              <img src="./diamonds.svg" alt="hearts" className="h-[50%] w-[50%]" />
            </div>
            <div ref={refs.spades} className="h-[125px] w-[92px] flex items-center justify-center rounded-sm bg-[#1A0033] shadow-xl">
              <img src="./spades.svg" alt="hearts" className="h-[50%] w-[50%]" />
            </div>
            <div ref={refs.clubs} className="h-[125px] w-[92px] flex items-center justify-center rounded-sm bg-[#1A0033] shadow-xl">
              <img src="./clubs.svg" alt="hearts" className="h-[50%] w-[50%]" />
            </div>
          </div>
          <div ref={refs.deck} className="flex justify-end">
            <img src="./back.svg" alt="Card Back" className="h-[125px] shadow-xl" />
          </div>
        </div>
        <div className="flex space-x-4 py-6">
          {
            Array(7).fill(0).map((_, i: number) => 
              <div 
              key={i} 
              ref={refs.unfinished[i]} 
              className=""
              >
                {
                  unfinishedDeck[i].map((card, j: number) => 
                  <div 
                    key={i + j + 'cards'} 
                    className={`${j !== 0 && '-mt-24'} select-none`}
                    >
                      { 
                        !card.flipped ? 
                          <img key={j + i +  'back'} src="./back.svg" alt="Card Back" className="h-[125px] shadow-xl select-none" /> : 
                          <img
                            key={j + + i + 'card'}
                            src={card.image}
                            className="h-[125px] shadow-xl select-none"
                          />
                      }
                    </div>)
                }
              </div>
            )
          }
        </div>
      </div>
    </div> */}