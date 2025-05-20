import React, { useEffect, useRef } from 'react';
import Cross from '../../public/icons/Cross';

const DeleteModal = ({ isOpen, onClose }) => {
  const modalContentRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (
      isOpen &&
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <section>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } z-40`}
      />

      {/* Modal Container */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-transform duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div
          ref={modalContentRef}
          className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md relative flex flex-col items-center text-center space-y-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <Cross />
          </button>

          {/* Content */}
          <h1 className="text-xl md:text-2xl font-semibold mt-5">
            Are you sure you want to log out?
          </h1>
          <button
            className="bg-green-500 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-green-300 cursor-pointer transition-colors"
          >
            Sure, Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
