import { useEffect } from "react";
import {Outlet ,Link,useNavigate} from "react-router-dom"
function App() {
  const navigate=useNavigate();
  useEffect(()=>{
    navigate("/signup");
  },[])
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default App
