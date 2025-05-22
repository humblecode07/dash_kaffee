import React, { useEffect, useState } from 'react'
import { BranchService } from '../../api/api' // Adjust if needed
import SearchIcon from '../../assets/svgs/SearchIcon'
import CardIcon from '../../assets/svgs/CardIcon'
import ListIcon from '../../assets/svgs/ListIcon'
import LocationIcon from '../../assets/svgs/LocationIcon'
import ClockIcon from '../../assets/svgs/ClockIcon'
import DirectionIcon from '../../assets/svgs/DirectionIcon'
import CallIcon from '../../assets/svgs/CallIcon'

const DashLocations = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await BranchService.getAllBranches();
        setBranches(data);
      } catch (error) {
        console.error('Failed to fetch branches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  return (
    <section className='w-full'>
      <div
        className='w-full h-[25rem] flex flex-col bg-no-repeat bg-cover bg-center bg-fixed text-center pt-[12.5rem]'
        style={{ backgroundImage: "url('/dash_location_bg.jpg')" }}
      >
        <h2 className="font-nerko-one text-[3.25rem] text-white">Find Your Nearest Dash Coffee</h2>
        <p className="font-inter font-semibold text-[1.25rem] text-white">
          Whether you’re craving a creamy blend or a fruity refresher, there’s a Dashkada hangout
          <br />just around the corner.
        </p>
      </div>
      <div className='w-full h-[12.25rem] flex items-center justify-center bg-white rounded-t-[.5rem] -mt-[1rem]'>
        <div className='flex flex-col gap-[1.25rem]'>
          <div className='flex gap-[2rem]'>
            <div className='w-[39.625rem] h-[2.625rem] border border-[#C5C5C5] rounded-[.25rem] overflow-hidden'>
              <input
                type="text"
                placeholder="Enter your city or areas..."
                className="w-full h-full px-4 py-2 font-inter text-[#333] outline-none placeholder-[#999] text-[0.95rem]"
              />
            </div>
            <button className='w-[10.8125rem] h-[2.625rem] bg-[#507046] flex items-center justify-center gap-[.625rem] rounded-[.25rem] transition-colors duration-300 hover:bg-[#3e5b36]'>
              <SearchIcon />
              <span className='text-white font-inter font-semibold'>Find Stores</span>
            </button>
          </div>
          <div className='flex gap-[1rem] font-inter text-[.875rem] text-white'>
            <button className='py-[0.4375rem] px-[1.25rem] bg-[#507046] rounded-full transition-all duration-300 hover:bg-[#3e5b36]'>
              <span>All Location</span>
            </button>
            <button className='py-[0.4375rem] px-[1.25rem] bg-white rounded-full border border-[#507046] transition-all duration-300 hover:bg-[#507046] hover:text-white'>
              <span className='text-[#507046] hover:text-white'>Open Now</span>
            </button>
            <button className='py-[0.4375rem] px-[1.25rem] bg-white rounded-full border border-[#507046] transition-all duration-300 hover:bg-[#507046] hover:text-white'>
              <span className='text-[#507046] hover:text-white'>With Study Areas</span>
            </button>
          </div>
        </div>
      </div>
      <div className='w-full min-h-[64.625rem] bg-[#363129] px-[5.375rem] py-[3.5rem] flex flex-col gap-[3.25rem]'>
        <div className='flex justify-between'>
          <span className='text-[1.75rem] text-white font-inter font-bold'>Locations Near You</span>
          <div className='flex gap-[1rem]'>
            <button className='w-[2.125rem] h-[2.125rem] flex items-center justify-center bg-[#507046] rounded-[.5rem]'>
              <CardIcon />
            </button>
            <button className='w-[2.125rem] h-[2.125rem] flex items-center justify-center rounded-[.5rem] border-[1px] border-solid border-[#FFFFFF]'>
              <ListIcon />
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-white font-inter">Loading branches...</p>
        ) : branches.length === 0 ? (
          <p className="text-white font-inter">No branches found.</p>
        ) : (
          <div className='flex gap-[2rem] flex-wrap'>
            {branches.map((branch) => (
              <div key={branch.id} className='flex flex-col'>
                <div className='w-[25rem] h-[12.5rem] flex flex-col rounded-[.5rem]'>
                  <img
                    src={`http://localhost/nyehehe/${branch.image}`}
                    alt={branch.name}
                    className='w-full h-full object-cover rounded-t-[.5rem]'
                  />
                </div>
                <div className='w-[25rem] h-[12.5rem] p-[1.5rem] flex flex-col justify-between bg-white rounded-b-[.5rem]'>
                  <div className='flex flex-col'>
                    <span className='font-bold font-inter text-[1.25rem]'>{branch.name}</span>
                    <div className='flex gap-[.5rem] items-center'>
                      <LocationIcon />
                      <span className='font-light text-[#505050]'>{branch.address}</span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-[.5rem] text-[.75rem]'>
                    <div className='flex justify-between'>
                      <div className='flex gap-[.5rem] items-center'>
                        <ClockIcon />
                        <span>{branch.hours}</span>
                      </div>
                      <div>
                        <span>{branch.contact}</span>
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <div className='w-[10.75rem] h-[1.875rem] flex items-center justify-center gap-[.5rem] bg-[#2E4328] rounded-[.25rem]'>
                        <DirectionIcon />
                        <span className='font-inter text-white'>Get Directions</span>
                      </div>
                      <div className='w-[10.75rem] h-[1.875rem] flex items-center justify-center gap-[.5rem] rounded-[.25rem] border-[1px] border-solid border-[#2E4328]'>
                        <CallIcon />
                        <span className='font-inter text-[#2E4328]'>Call</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DashLocations;
