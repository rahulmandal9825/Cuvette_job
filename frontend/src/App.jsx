import { useState } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Signup from './page/Signup';
import HomePage from './page/Home';
import JobPost from './page/JobPost';
import Verification from './page/Verification';
import RefrshHandler from './Refrshhandler';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PrivateRoute function to handle authentication-based route protection
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className='App'>

     
      {/* RefreshHandler to check token and set authentication status */}
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      
      {/* Define all routes */}
      <Routes>
        {/* Private route for homepage and job posts */}
        <Route path="/" element={<PrivateRoute element={<HomePage />} />} >
         <Route path="/jobpost" element={<PrivateRoute element={<JobPost />} />} />
        </Route>
       
        
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </div>
  );
}

export default App;
