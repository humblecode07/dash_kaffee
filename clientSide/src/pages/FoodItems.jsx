import React, { useState, useEffect } from 'react';
import FoodFormModal from '../modals/FoodFormModal';
import { FoodService } from '../api/api';

const FoodItems = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [foodItems, setFoodItems] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);
   const [editingItem, setEditingItem] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');
   const [categoryFilter, setCategoryFilter] = useState('');

   // Load food items on component mount
   useEffect(() => {
      fetchFoodItems();
   }, []);

   const fetchFoodItems = async () => {
      setIsLoading(true);
      try {
         const data = await FoodService.getAllFoodItems();
         setFoodItems(data);
         setError(null);
      } catch (err) {
         console.error('Failed to fetch food items:', err);
         setError('Failed to load food items. Please try again later.');
      } finally {
         setIsLoading(false);
      }
   };

   const openModal = (item = null) => {
      setEditingItem(item);
      setIsModalOpen(true);
   };

   const closeModal = (shouldRefresh = false) => {
      setIsModalOpen(false);
      setEditingItem(null);

      if (shouldRefresh) {
         fetchFoodItems();
      }
   };

   const handleDeleteItem = async (id) => {
      if (!window.confirm('Are you sure you want to delete this item?')) {
         return;
      }

      try {
         const response = await FoodService.deleteFoodItem(id);
         if (response.success) {
            // Remove item from local state to avoid refetch
            setFoodItems(foodItems.filter(item => item.id !== id));
         } else {
            alert('Failed to delete item: ' + (response.error || 'Unknown error'));
         }
      } catch (err) {
         console.error('Error deleting item:', err);
         alert('Failed to delete item. Please try again.');
      }
   };

   // Filter items based on search and category
   const filteredItems = foodItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === '' || item.category === categoryFilter;

      return matchesSearch && matchesCategory;
   });

   console.log(filteredItems);

   return (
      <main className="flex-1 ml-[250px] p-5 overflow-y-auto">
         <section id="food-section" className="mt-4">
            <div className="mb-6">
               <h2 className="text-2xl font-bold mb-4">Food Items</h2>
               <div className="flex flex-wrap gap-3 items-center">
                  <select
                     className="border border-gray-300 rounded px-3 py-2"
                     value={categoryFilter}
                     onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                     <option value="">All Categories</option>
                     <option value="Beverages">Beverages</option>
                     <option value="Pastries">Pastries</option>
                  </select>
                  <input
                     type="text"
                     placeholder="Search..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="border border-gray-300 rounded px-3 py-2 flex-1"
                  />
                  <button
                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                     onClick={() => {
                        if (!searchTerm) {
                           setSearchTerm('');
                        }
                     }}
                  >
                     Search
                  </button>
                  <button
                     id="add-food-btn"
                     onClick={() => openModal()}
                     className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                     Add New Item
                  </button>
               </div>
            </div>

            {isLoading ? (
               <div className="text-center py-10">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
                  <p className="mt-2 text-gray-600">Loading food items...</p>
               </div>
            ) : error ? (
               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
               </div>
            ) : filteredItems.length === 0 ? (
               <div className="text-center py-10 text-gray-500">
                  No food items found. {searchTerm || categoryFilter ? 'Try adjusting your search.' : 'Add your first item!'}
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
                  {filteredItems.map((item) => (
                     <div
                        key={item.id}
                        className="bg-white rounded-lg overflow-hidden shadow-md"
                     >
                        {item.image ? (
                           <div className="h-[150px] bg-gray-100">
                              <img
                                 src={`http://localhost/nyehehe/${item.image}`}
                                 alt={item.name}
                                 className="h-full w-full object-cover"
                              />
                           </div>
                        ) : (
                           <div className="h-[150px] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                              <span>No Image</span>
                           </div>
                        )}
                        <div className="p-4">
                           <div className="flex justify-between font-semibold mb-2">
                              <span>{item.name}</span>
                              <span className="text-green-700">₱{item.price}</span>
                           </div>
                           <div className="text-sm text-gray-500 mb-2">{item.category}</div>
                           <p className="text-sm text-gray-700">{item.description}</p>
                           <div className="flex gap-2 mt-4">
                              <button
                                 className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                 onClick={() => openModal(item)}
                              >
                                 Edit
                              </button>
                              <button
                                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                 onClick={() => handleDeleteItem(item.id)}
                              >
                                 Delete
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </section>

         <FoodFormModal
            show={isModalOpen}
            handleClose={closeModal}
            editItem={editingItem}
         />
      </main>
   );
};

export default FoodItems;