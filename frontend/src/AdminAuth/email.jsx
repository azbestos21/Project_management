import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyadmin } from './Services/Api'; // Corrected import path

const VerifyAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      console.log(token);

      try {
        console.log("inside try");
        const data = await verifyadmin(token); // Call the verifyadmin function with token parameter
        alert(data.message);
        console.log(data);
        console.log(data.message);
        navigate('/Alogin'); // Redirect to login page after successful verification
      } catch (error) {
        console.error('Error during verification:', error);
      }
    };

    verifyAdmin();
  }, [location, navigate]);

  return <div>Verified</div>;
};

export default VerifyAdmin;
