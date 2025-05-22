import React, { useEffect, useState } from 'react'
import { BranchService } from '../api/api';

const BranchFormModal = ({ show, handleClose, editBranch }) => {
   const [formData, setFormData] = useState({
      name: '',
      address: '',
      contact: '',
      manager: '',
      hours: '',
   });
   const [selectedImage, setSelectedImage] = useState(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState('');

   useEffect(() => {
      if (editBranch) {
         setFormData({
            name: editBranch.name || '',
            address: editBranch.address || '',
            contact: editBranch.contact || '',
            manager: editBranch.manager || '',
            hours: editBranch.hours || '',
         });
      } else {
         // Reset form for new branch
         setFormData({
            name: '',
            address: '',
            contact: '',
            manager: '',
            hours: '',
         });
         setSelectedImage(null);
      }
   }, [editBranch]);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
         setSelectedImage(e.target.files[0]);
      }
   };

   console.log(editBranch);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setIsSubmitting(true);

      try {
         const formDataToSend = new FormData();
         formDataToSend.append('name', formData.name);
         formDataToSend.append('address', formData.address);
         formDataToSend.append('contact', formData.contact);
         formDataToSend.append('manager', formData.manager);
         formDataToSend.append('hours', formData.hours);

         if (selectedImage) {
            formDataToSend.append('image', selectedImage);
         }

         let response;
         if (editBranch) {
            // Assuming updateBranch API exists
            formDataToSend.append('id', editBranch.id);
            response = await BranchService.editBranch(formDataToSend);
         } else {
            response = await BranchService.addBranch(formDataToSend);
         }

         if (response.success) {
            handleClose(true);
         } else {
            setError(response.error || 'Something went wrong.');
         }
      } catch (err) {
         console.error(err);
         setError('Failed to submit form.');
      } finally {
         setIsSubmitting(false);
      }
   };


   if (!show) return null;

   return (
      <div className="fixed inset-0 z-[1000] bg-black bg-black/50 flex justify-center items-center">
         <div className="bg-white p-6 rounded-lg w-[500px] max-w-[90%]">
            <div className="flex justify-between items-center mb-5">
               <h3 className="text-lg font-semibold">{editBranch ? 'Edit Branch' : 'Add Branch'}</h3>
               <button
                  onClick={() => handleClose()}
                  className="text-gray-600 text-xl focus:outline-none"
               >
                  &times;
               </button>
            </div>

            {error && (
               <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                  {error}
               </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="block text-sm font-medium mb-1">Branch Image:</label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4">
                     {editBranch?.image && !selectedImage ? (
                        <div className="mb-2 relative">
                           <img
                              src={`${editBranch.image.startsWith('http') ? '' : 'http://localhost/nyehehe/'}${editBranch.image}`}
                              alt="Current branch"
                              className="h-32 w-full object-cover mb-2"
                           />
                           <span className="text-sm text-gray-500">Current image</span>
                        </div>
                     ) : selectedImage ? (
                        <div className="mb-2">
                           <div className="h-32 bg-gray-100 flex items-center justify-center">
                              <span className="text-sm text-gray-500">New image selected</span>
                           </div>
                        </div>
                     ) : null}

                     <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                     />
                     <label
                        htmlFor="image"
                        className="cursor-pointer block text-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm"
                     >
                        Choose File
                     </label>
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium mb-1">Branch Name:</label>
                  <input
                     type="text"
                     name="name"
                     placeholder="Enter branch name"
                     value={formData.name}
                     onChange={handleInputChange}
                     required
                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium mb-1">Address:</label>
                  <input
                     type="text"
                     name="address"
                     placeholder="Enter full address"
                     value={formData.address}
                     onChange={handleInputChange}
                     required
                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium mb-1">Contact Number:</label>
                  <input
                     type="text"
                     name="contact"
                     placeholder="Enter phone number"
                     value={formData.contact}
                     onChange={handleInputChange}
                     required
                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium mb-1">Manager Name:</label>
                  <input
                     type="text"
                     name="manager"
                     placeholder="Enter manager name"
                     value={formData.manager}
                     onChange={handleInputChange}
                     required
                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium mb-1">Operating Hours:</label>
                  <input
                     type="text"
                     name="hours"
                     placeholder="e.g. 7:00 AM - 8:00 PM"
                     value={formData.hours}
                     onChange={handleInputChange}
                     required
                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
               </div>

               <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-6 w-full ${isSubmitting ? 'bg-gray-500' : 'bg-green-700 hover:bg-green-800'} text-white py-2 rounded transition`}
               >
                  {isSubmitting ? 'Saving...' : editBranch ? 'Update Branch' : 'Save Branch'}
               </button>
            </form>
         </div>
      </div>
   );
}

export default BranchFormModal
