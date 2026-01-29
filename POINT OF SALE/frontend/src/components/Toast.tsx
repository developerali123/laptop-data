import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  show: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info', show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000); // Auto-close after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [show, onClose]);

  if (!show) return null;

  const toastStyle = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md flex items-center space-x-3 ${toastStyle[type]}`}>
      <span>{message}</span>
      <button onClick={onClose} className="text-white">
        <FaTimes />
      </button>
    </div>
  );
};

export default Toast;
