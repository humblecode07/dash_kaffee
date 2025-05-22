import React from 'react';

const ContactModal = ({ isOpen, onClose, contact }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Message from {contact.name}</h2>
        <p><strong>Email:</strong> {contact.email}</p>
        <p className="mt-2"><strong>Message:</strong></p>
        <p className="mt-1 text-gray-700">{contact.message}</p>
        <button
          onClick={onClose}
          className="mt-5 bg-[#4a6b3e] hover:bg-[#6a915c] text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ContactModal;
