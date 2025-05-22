// src/services/api.js
const API_URL = 'http://localhost/nyehehe';

// Service for food items CRUD operations
export const FoodService = {
   // Get all food items
   getAllFoodItems: async () => {
      try {
         const response = await fetch(`${API_URL}/fetch_foods.php`);
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         return await response.json();
      } catch (error) {
         console.error('Error fetching food items:', error);
         throw error;
      }
   },

   // Add a new food item
   addFoodItem: async (formData) => {
      try {
         const response = await fetch(`${API_URL}/add_food.php`, {
            method: 'POST',
            body: formData, // Using FormData to handle file uploads
         });
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         return await response.json();
      } catch (error) {
         console.error('Error adding food item:', error);
         throw error;
      }
   },

   // Delete a food item
   deleteFoodItem: async (id) => {
      try {
         const formData = new FormData();
         formData.append('id', id);

         const response = await fetch(`${API_URL}/delete_food.php`, {
            method: 'POST',
            body: formData,
         });
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         return await response.json();
      } catch (error) {
         console.error('Error deleting food item:', error);
         throw error;
      }
   },

   // Edit a food item
   editFoodItem: async (formData) => {
      try {
         const response = await fetch(`${API_URL}/edit_food.php`, {
            method: 'POST',
            body: formData, // Using FormData to handle file uploads
         });
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         return await response.json();
      } catch (error) {
         console.error('Error editing food item:', error);
         throw error;
      }
   },

   // Get food categories
   getCategories: async () => {
      try {
         const response = await fetch(`${API_URL}/get_categories.php`);
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         return await response.json();
      } catch (error) {
         console.error('Error fetching categories:', error);
         throw error;
      }
   }
};

export const BranchService = {
   // Get all branches
   getAllBranches: async () => {
      try {
         const response = await fetch(`${API_URL}/fetch_branches.php`);
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         return await response.json();
      } catch (error) {
         console.error('Error fetching branches:', error);
         throw error;
      }
   },

   // Add a new branch
   addBranch: async (formData) => {
      try {
         const response = await fetch(`${API_URL}/add_branch.php`, {
            method: 'POST',
            body: formData, // Using FormData to handle file uploads
         });

         const contentType = response.headers.get('content-type');

         // Check if the response is JSON
         if (!contentType || !contentType.includes('application/json')) {
            // Handle non-JSON response (likely HTML error page)
            const text = await response.text();
            console.error('Server returned non-JSON response:', text);
            return {
               success: false,
               error: 'Server returned an invalid response format. Please check server logs.'
            };
         }

         // Parse JSON response
         const data = await response.json();

         if (!response.ok) {
            return { success: false, error: data.error || 'Server error occurred' };
         }

         return data;
      } catch (error) {
         console.error('Error adding branch:', error);
         return { success: false, error: 'Failed to connect to server' };
      }
   },
   // Delete a branch
   deleteBranch: async (id) => {
      try {
         const formData = new FormData();
         formData.append('id', id);

         const response = await fetch(`${API_URL}/delete_branch.php`, {
            method: 'POST',
            body: formData,
         });
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         return await response.json();
      } catch (error) {
         console.error('Error deleting branch:', error);
         throw error;
      }
   },

   // Edit a branch
   editBranch: async (formData) => {
      try {
         const response = await fetch(`${API_URL}/edit_branch.php`, {
            method: 'POST',
            body: formData, // Using FormData to handle file uploads
         });
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         return await response.json();
      } catch (error) {
         console.error('Error editing branch:', error);
         throw error;
      }
   },

   // Get a single branch by ID
   getBranchById: async (id) => {
      try {
         const formData = new FormData();
         formData.append('id', id);

         const response = await fetch(`${API_URL}/get_branch.php`, {
            method: 'POST',
            body: formData,
         });
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         return await response.json();
      } catch (error) {
         console.error('Error fetching branch details:', error);
         throw error;
      }
   }
};
