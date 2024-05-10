import React from 'react'
import { useSelector } from 'react-redux'
const Navbar = () => {

    const username=useSelector((state)=>state.token.username)
    
  return (
    <nav className='flex justify-between p-5 bg-black text-white'>
        <h1>Payments App</h1>
        <h1>{username}</h1>
    </nav>
  )
}

export default Navbar
