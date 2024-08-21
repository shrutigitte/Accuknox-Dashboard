import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50">
      <div className="bg-white h-screen w-1/3 p-4 shadow-lg">
        <div className="bg-blue-500 text-white p-2 mb-4">
          <h3 className="text-lg font-semibold">Enter Widget Data</h3>
        <button onClick={onClose} className="absolute top-4 text-3xl right-5 text-red-500">
          ✕
        </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;