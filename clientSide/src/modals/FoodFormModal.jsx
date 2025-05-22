// src/components/modals/FoodFormModal.jsx
import React, { useEffect, useState } from 'react';
import { FoodService } from '../api/api';

const FoodFormModal = ({ show, handleClose, editItem = null }) => {
   const isEditing = !!editItem;

   const initialState = {
      name: editItem?.name || '',
      price: editItem?.price || '',
      category: editItem?.category || '',
      description: editItem?.description || '',
      image: null
   };

   const [formData, setFormData] = useState(initialState);
   const [imagePreview, setImagePreview] = useState(editItem?.image || null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState('');

   // Reset form when modal is opened or closed
   useEffect(() => {
      if (show) {
         if (isEditing && editItem) {
            setFormData({
               id: editItem.id,
               name: editItem.name || '',
               price: editItem.price || '',
               category: editItem.category || '',
               description: editItem.description || '',
               image: editItem.image || null
            });
            setImagePreview(editItem.image || null);
         } else {
            setFormData(initialState);
            setImagePreview(null);
         }
         setError('');
      }
   }, [show, editItem, isEditing]);


   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value
      });
   };

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setFormData({
            ...formData,
            image: file
         });

         // Create preview URL
         const reader = new FileReader();
         reader.onloadend = () => {
            setImagePreview(reader.result);
         };
         reader.readAsDataURL(file);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError('');

      try {
         // Create FormData object for file upload
         const submitData = new FormData();

         // Append form fields to FormData
         Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
               submitData.append(key, value);
            }
         });

         // Submit to API based on whether we're editing or adding
         const response = isEditing
            ? await FoodService.editFoodItem(submitData)
            : await FoodService.addFoodItem(submitData);

         if (response.success) {
            handleClose(true); // Close with success flag to trigger refresh
         } else {
            setError(response.error || 'An error occurred while saving the food item.');
         }
      }
      catch (err) {
         setError('Failed to save food item. Please try again.');
         console.error(err);
      }
      finally {
         setIsSubmitting(false);
      }
   };

   console.log(imagePreview)

   if (!show) return null;

   // Helper function to get the correct image source
   const getImageSrc = () => {
      if (typeof imagePreview === 'string' && imagePreview.startsWith('data:')) {
         // This is a newly selected file (base64 data URL)
         return imagePreview;
      } else if (isEditing && editItem && editItem.image) {
         // This is an existing image from the server
         return `http://localhost/nyehehe/${editItem.image}`;
      }
      return null;
   };

   return (
      <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl font-semibold">
                  {isEditing ? 'Edit Food Item' : 'Add New Food Item'}
               </h3>
               <button
                  onClick={() => handleClose(false)}
                  className="text-gray-500 hover:text-gray-700"
               >
                  ×
               </button>
            </div>

            {error && (
               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
               </div>
            )}

            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                     Name
                  </label>
                  <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     required
                  />
               </div>

               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                     Price
                  </label>
                  <input
                     type="text"
                     name="price"
                     value={formData.price}
                     onChange={handleChange}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     required
                  />
               </div>

               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                     Category
                  </label>
                  <select
                     name="category"
                     value={formData.category}
                     onChange={handleChange}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     required
                  >
                     <option value="">Select Category</option>
                     <option value="Beverages">Beverages</option>
                     <option value="Pastries">Pastries</option>
                  </select>
               </div>

               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                     Description
                  </label>
                  <textarea
                     name="description"
                     value={formData.description}
                     onChange={handleChange}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     rows="3"
                  />
               </div>

               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                     Image
                  </label>
                  <input
                     type="file"
                     name="image"
                     onChange={handleImageChange}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     accept="image/*"
                  />
                  {imagePreview && getImageSrc() && (
                     <div className="mt-2 h-32 w-32 relative">
                        <img
                           src={getImageSrc()}
                           alt="Preview"
                           className="h-full w-full object-cover rounded"
                        />
                     </div>
                  )}
               </div>

               <div className="flex justify-end mt-6">
                  <button
                     type="button"
                     onClick={() => handleClose(false)}
                     className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                     disabled={isSubmitting}
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Save'}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default FoodFormModal;