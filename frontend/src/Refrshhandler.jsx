import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from './store/authstore';

function RefrshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyjwt } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the verifyjwt function to check the authentication status
        const response = await verifyjwt();
        console.log(response.success);

        // If verification is successful, update authentication status
        if (response.success) {
          setIsAuthenticated(true);
          
          // Redirect if the user is trying to access verification, login, or signup pages
          if (
            location.pathname === '/verification' ||
            location.pathname === '/login' ||
            location.pathname === '/signup'
          ) {
            navigate('/', { replace: true });
          }
        }
      } catch (error) {
        // Optional: Handle any errors that may occur during verification
        console.error("Error during JWT verification:", error);
      }
    };

    // Call the fetchData function
    fetchData();
    
  }, [location.pathname, setIsAuthenticated, verifyjwt]); // Include verifyjwt in the dependencies array

  return null; // Return null as this component does not render anything
}

export default RefrshHandler;
