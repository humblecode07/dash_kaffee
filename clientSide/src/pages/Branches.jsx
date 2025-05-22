import React, { useEffect, useState } from 'react';
import { BranchService } from '../api/api';
import BranchFormModal from '../modals/BranchFormModal';

export default function Branches() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBranch, setEditingBranch] = useState(null);
  
  // Load branches on component mount
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      const data = await BranchService.getAllBranches();
      setBranches(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch branches:', err);
      setError('Failed to load branches. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (branch = null) => {
    setEditingBranch(branch);
    setIsModalOpen(true);
  };

  const closeModal = (shouldRefresh = false) => {
    setIsModalOpen(false);
    setEditingBranch(null);

    if (shouldRefresh) {
      fetchBranches();
    }
  };

  const handleDeleteBranch = async (id) => {
    if (!window.confirm('Are you sure you want to delete this branch?')) {
      return;
    }

    try {
      const response = await BranchService.deleteBranch(id);
      if (response.success) {
        // Remove branch from local state to avoid refetch
        setBranches(branches.filter(branch => branch.id !== id));
      } else {
        alert('Failed to delete branch: ' + (response.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error deleting branch:', err);
      alert('Failed to delete branch. Please try again.');
    }
  };

  // Filter branches based on search term
  const filteredBranches = branches.filter(branch => 
    branch.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 ml-[250px] p-5 overflow-y-auto">
      <section id="branches-section" className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Cafe Branches</h2>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by location or name..."
              className="px-3 py-2 border border-gray-300 rounded-md w-full md:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              onClick={() => setSearchTerm('')}
            >
              {searchTerm ? 'Clear' : 'Search'}
            </button>
            <button
              id="add-branch-btn"
              onClick={() => openModal()}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Add New Branch
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading branches...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : filteredBranches.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No branches found. {searchTerm ? 'Try adjusting your search.' : 'Add your first branch!'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBranches.map((branch) => (
              <div 
                key={branch.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  {branch.image ? (
                    <img 
                      src={`${branch.image.startsWith('http') ? '' : 'http://localhost/nyehehe/'}${branch.image}`}
                      alt={`${branch.name} Branch`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{branch.name}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-700">
                      <span className="font-medium">Address:</span> {branch.address}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Contact:</span> {branch.contact}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Manager:</span> {branch.manager}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Hours:</span> {branch.hours}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button 
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex-1"
                      onClick={() => openModal(branch)}
                    >
                      Edit
                    </button>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex-1"
                      onClick={() => handleDeleteBranch(branch.id)}
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

      {isModalOpen && (
        <BranchFormModal
          show={isModalOpen} 
          handleClose={closeModal} 
          editBranch={editingBranch} 
        />
      )}
    </main>
  );
}