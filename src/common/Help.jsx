import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Help = () => {
  const [text, setText] = useState("")

  useEffect(() => {
    fetch("/help.txt").then(res => res.text()).then(text => setText(text))
  }, [])
  return (
    <>
      <div className='w-1/2 bg-gray-400 rounded-md h-full p-4 overflow-y-scroll'>
        {text}
      </div>
      <Link to = "/home" className = "w-[128px] h-[34px] self-center"><button className='w-full h-full text-white'>OK</button></Link>
    </>
  )
}
