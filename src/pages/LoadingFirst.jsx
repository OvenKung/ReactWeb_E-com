import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingFirst = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
    } else {
      navigate('/home');
    }
  }, [count, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div style={{ position: 'relative' }} className="rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500">
        <div className="animate-spin rounded-full h-full w-full border-t-2 border-b-2 border-purple-500"></div>
        <h2 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} className="text-2xl font-bold">WELCOME</h2>
      </div>
      <div className="w-64 h-4 bg-gray-300 mt-4">
        <div className="h-full text-center text-xs text-white bg-purple-500" style={{ width: `${(6 - count) * 20}%`, transition: 'width 1s ease-in-out' }}>
        </div>
      </div>
    </div>
  );
};

export default LoadingFirst;