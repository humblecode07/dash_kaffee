import React, { useEffect, useState } from 'react';
import ContactModal from '../modals/ContactModal';

const ContactMessages = () => {
   const [contacts, setContacts] = useState([]);
   const [activeSection, setActiveSection] = useState('contact');
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedContact, setSelectedContact] = useState(null);
   const [searchQuery, setSearchQuery] = useState('');
   const [statusFilter, setStatusFilter] = useState('');

   const openModal = (contact) => {
      setSelectedContact(contact);
      setIsModalOpen(true);
   };

   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedContact(null);
   };

   const filteredContacts = contacts.filter(contact => {
      const matchesSearch =
         contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
         contact.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === '' || contact.status === statusFilter;

      return matchesSearch && matchesStatus;
   });

   useEffect(() => {
      fetch('http://localhost/nyehehe/fetch_contacts.php') // Your backend endpoint
         .then(res => res.json())
         .then(data => setContacts(data.contacts))
         .catch(err => console.error('Fetch contacts error:', err));
   }, []);

   const markAsRead = (id) => {
      fetch('http://localhost/nyehehe/edit_contact_status.php', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ id, status: 'Read' }),
      })
         .then(res => res.json())
         .then(data => {
            if (data.success) {
               // Update the status locally in React state
               setContacts(prevContacts =>
                  prevContacts.map(contact =>
                     contact.id === id ? { ...contact, status: 'Read' } : contact
                  )
               );
            } else {
               alert('Failed to update status: ' + (data.error || 'Unknown error'));
            }
         })
         .catch(err => alert('Failed to update status: ' + err.message));
   };

   const deleteContact = (id) => {
      if (!window.confirm('Are you sure you want to delete this message?')) return;

      const formData = new FormData();
      formData.append('id', id);

      fetch(`http://localhost/nyehehe/delete_contact.php`, {
         method: 'POST',
         body: formData,
         credentials: 'include'
      })
         .then(res => {
            if (!res.ok) {
               throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
         })
         .then(data => {
            if (data.success) {
               setContacts(prev => prev.filter(c => c.id !== id)); // Remove deleted contact locally
               alert('Message deleted successfully');
            } else {
               alert('Delete failed: ' + (data.error || 'Unknown error'));
            }
         })
         .catch(err => {
            console.error('Delete error:', err);
            alert('Delete failed: ' + err.message);
         });
   };

   return (
      <main className="flex-1 ml-[250px] p-5 overflow-y-auto">
         <section className={`${activeSection === 'contact' ? 'block' : 'hidden'} bg-white p-5 rounded-lg shadow mb-5`}>
            <div className="flex justify-between items-center mb-5">
               <h2 className="text-xl font-semibold">Messages</h2>
               <div className="flex gap-2">
                  <input
                     type="text"
                     placeholder="Search..."
                     className="px-3 py-2 border border-gray-300 rounded"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <select
                     className="px-3 py-2 border border-gray-300 rounded"
                     value={statusFilter}
                     onChange={(e) => setStatusFilter(e.target.value)}
                  >
                     <option value="">Status</option>
                     <option value="New">New</option>
                     <option value="Read">Read</option>
                  </select>
               </div>
            </div>

            <table className="w-full border-collapse mt-4">
               <thead className="bg-gray-100">
                  <tr>
                     <th className="text-left p-3 border-b font-semibold">Name</th>
                     <th className="text-left p-3 border-b font-semibold">Email</th>
                     <th className="text-left p-3 border-b font-semibold">Message</th>
                     <th className="text-left p-3 border-b font-semibold">Status</th>
                     <th className="text-left p-3 border-b font-semibold">Timestamp</th>
                     <th className="text-left p-3 border-b font-semibold">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredContacts.map((contact) => (
                     <tr key={contact.id}>
                        <td className="p-3 border-b">{contact.name}</td>
                        <td className="p-3 border-b">{contact.email}</td>
                        <td className="p-3 border-b truncate max-w-[200px]">{contact.message}</td>
                        <td className="p-3 border-b">
                           <span className="bg-blue-100 text-blue-700 px-2 py-1 text-sm rounded-full font-medium">{contact.status}</span>
                        </td>
                        <td className="p-3 border-b">{new Date(contact.created_at).toLocaleString()}</td>
                        <td className="p-3 border-b">
                           <div className="flex gap-2 flex-wrap items-center">
                              <button
                                 onClick={() => openModal(contact)}
                                 className="bg-[#4a6b3e] text-white px-3 py-1 text-sm rounded min-w-[60px]"
                              >
                                 View
                              </button>

                              <button
                                 onClick={() => markAsRead(contact.id)}
                                 disabled={contact.status !== 'New'}
                                 className={`px-3 py-1 text-sm rounded min-w-[90px] transition-colors
    ${contact.status === 'New'
                                       ? 'bg-yellow-600 text-white hover:bg-yellow-700 cursor-pointer'
                                       : 'bg-yellow-800 text-yellow-300 cursor-not-allowed'}`}
                              >
                                 Mark as Read
                              </button>

                              <button
                                 onClick={() => deleteContact(contact.id)}
                                 className="bg-red-600 text-white px-3 py-1 text-sm rounded min-w-[60px]"
                              >
                                 Delete
                              </button>
                           </div>
                        </td>

                     </tr>
                  ))}
               </tbody>
            </table>
         </section>

         <ContactModal isOpen={isModalOpen} onClose={closeModal} contact={selectedContact} />
      </main>
   );
};

export default ContactMessages;
