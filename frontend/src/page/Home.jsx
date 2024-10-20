
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const HomePage = () => {

  const navigate = useNavigate()

  const onsubmit =()=>{
    navigate("/jobpost")
  }
  return (
    <div className='h-screen w-screen'>
 <Navbar />
     <Sidebar/>
     <Outlet/>
     <button onClick={onsubmit} className="m-[100px] p-2 rounded-md text-lg font-semibold text-white bg-blue-500">
      Create a interview
     </button>




    
    </div>
  )
}

export default HomePage
