import React, { useState } from 'react'
import DashCoffeeLargeIcon from '../../assets/svgs/DashCoffeeLargeIcon'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('http://localhost/nyehehe/submit_contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Something went wrong')
      setSuccess(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full h-[55.375rem] flex justify-center py-[3.375rem]">
      <div className="w-full max-w-[80rem] flex justify-between items-end px-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[2rem]">
          <div className="flex flex-col">
            <h2 className="font-nerko-one text-[3.25rem] text-[#507046]">Contact Us!</h2>
            <p className="font-inter font-bold text-[1.25rem]">
              Have questions or feedback? We'd love
              <br />
              to hear from you.
            </p>
          </div>
          <div className="flex flex-col gap-[.75rem]">
            <span className="font-inter font-bold text-[1.25rem]">Full Name</span>
            <div className="w-[29.5rem] h-[3rem] border border-[#C5C5C5] rounded-[.25rem] overflow-hidden">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="What’s your full name?"
                className="w-full h-full px-4 py-2 font-inter text-[#333] outline-none placeholder-[#999] text-[1rem]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[.75rem]">
            <span className="font-inter font-bold text-[1.25rem]">Email Address</span>
            <div className="w-[29.5rem] h-[3rem] border border-[#C5C5C5] rounded-[.25rem] overflow-hidden">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="youremail@example.com"
                className="w-full h-full px-4 py-2 font-inter text-[#333] outline-none placeholder-[#999] text-[1rem]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[.75rem]">
            <span className="font-inter font-bold text-[1.25rem]">Message</span>
            <div className="w-[29.5rem] h-[12.5rem] border border-[#C5C5C5] rounded-[.25rem] overflow-hidden">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message for the team here..."
                className="w-full h-full px-4 py-2 font-inter text-[#333] outline-none placeholder-[#999] text-[1rem]"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-[29.5rem] h-[3rem] bg-[#507046] rounded-[.25rem] flex items-center justify-center hover:bg-[#405e39] transition"
          >
            <span className="font-inter font-bold text-[1.25rem] text-white">
              {loading ? 'Sending...' : 'Submit'}
            </span>
          </button>
          {success && <p className="text-green-600 font-inter">Message sent successfully!</p>}
          {error && <p className="text-red-600 font-inter">Error: {error}</p>}
        </form>
        <div className="flex items-end h-full">
          <DashCoffeeLargeIcon />
        </div>
      </div>
    </section>
  )
}

export default ContactUs
