import React, { useEffect,useState } from 'react'
import Navbar from './Navbar'
import Search from './Search';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const token=useSelector((state)=>state.token.token);
  const [balance,setBalance]=useState(0);
  useEffect(()=>{
    const fetchBalance=async()=>{
      const response=await fetch("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${token}` 
        }});
      if(response.ok){
        
        const {balance}=await response.json();
        
        setBalance(balance);
      }
    }
    fetchBalance();

    
  },[])

  return (
    <div>
      <Navbar/>
      <div>
      <p>Your account balance - ₹{balance.toFixed(2)}</p>
      <Search/>
      </div>
    </div>
  )
}

export default Dashboard
