"use client"
import React, {useState} from 'react'
import CardItem from './CardItem'

export default function FilterSort() {

  const [filter,setFilter] = useState("")


  return (
    <div className='w-full h-full py-5 flex flex-row items-center justify-start'>
      <button onClick={()=>setFilter("pas")} className='btn btn-secondary'>Psi</button>
      <button onClick={()=>setFilter("macka")} className='btn btn-warning ml-5'>Macke</button>
      <button onClick={()=>setFilter("ostalo")} className='btn btn-accent ml-5'>Ostalo</button>

      <CardItem filter={filter}/>

    </div>
  )
}
