import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        try {
          const response = await axios.get(`http://localhost:3000/auth/verify`, {
            params: { token }
          });
          if (response.status === 200) {
            setVerificationStatus('Email verified successfully. Redirecting to login...');
            setTimeout(() => navigate('/login'), 3000);
          } else {
            setVerificationStatus('Failed to verify email.');
          }
        } catch (error) {
          console.error('Error verifying email:', error);
          setVerificationStatus('Invalid or expired token.');
        }
      } else {
        setVerificationStatus('No verification token provided.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="container">
      <h2>Email Verification</h2>
      <p>{verificationStatus}</p>
    </div>
  );
};

export default EmailVerification;
