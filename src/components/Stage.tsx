import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const Stage = ({ children }: Props): JSX.Element => {
  return (<div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-600">
    <div className="max-w-5xl mx-auto py-12">
      {children}
    </div>
  </div>)
}