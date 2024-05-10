import React,{useState} from "react";
import Users from "./Users";
const Search = () => {
    
  const [filter,setFilter]=useState();
  const [users,setUsers]=useState();

  const fetchUsers=async()=>{
    const response=await fetch(`http://localhost:3000//api/v1/user/bulk?filter=${filter}`)
    if(response.ok){
        const {user}=await response.json();
        setUsers(user);
    }
}
  return (
    <div className="p-5 space-y-4">
      <div className="flex space-x-5">
      <input
        className="border-black border-2 w-full"
        type="text"
        placeholder="Search user"
        onChange={(e)=>setFilter(e.target.value)}
      />
      <button className="border-2 border-black" onClick={fetchUsers}>Search</button>
      </div>
    {users&&users.map((user)=>{
        <Users username={user}/>
    })}
    </div>
  );
};

export default Search;
