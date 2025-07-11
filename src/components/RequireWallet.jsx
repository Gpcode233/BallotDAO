import { useEffect } from 'react';
import { useWallet } from '../web3/hooks';
import { useNavigate } from 'react-router-dom';

export default function RequireWallet({ children }) {
  const { isConnected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  return isConnected ? children : null;
}
