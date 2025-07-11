import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Toast = ({ message, type = 'info', duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose(), 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />;
      case 'error':
        return <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />;
      case 'loading':
        return <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />;
      default:
        return <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500';
      case 'error':
        return 'bg-red-100 border-red-500';
      case 'loading':
        return 'bg-blue-100 border-blue-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'loading':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  if (!visible) return null;

  return (
    <div 
      className={`fixed bottom-4 right-4 p-4 rounded-lg border-l-4 ${getBgColor()} ${getTextColor()} shadow-lg flex items-center z-50 animate-fadeIn`}
      role="alert"
    >
      {getIcon()}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
