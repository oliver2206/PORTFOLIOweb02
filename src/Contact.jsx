import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    services: []
  });

  const servicesList = ['Branding', 'Digital Experiences', 'Web Development', 'Graphic Design', 'Content Creation'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Build email content
    const subject = `Inquiry about: ${formData.services.join(', ')}`;
    const body = `
Hi Creation Niel,

Service(s) Interested In: ${formData.services.join(', ')}

Message:
${formData.message || '(No message provided)'}

Best regards,
${formData.name}
${formData.email}
Phone: ${formData.phone || 'Not provided'}
    `.trim();

    // Create Gmail compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=creationniel6@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  const copyAllDetails = () => {
    const details = `Email: creationniel6@gmail.com\nMobile: +63 912 345 6789`;
    navigator.clipboard.writeText(details);
    alert('All contact details copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - INQUIRE NOW */}
      <div className="bg-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">INQUIRE NOW</h1>
          <p className="text-xl md:text-2xl text-gray-300">WE'D LOVE TO HEAR FROM YOU</p>
        </div>
      </div>

      {/* REACH OUT Section */}
      <div className="py-12 px-4 border-b">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">REACH OUT</h2>
          <p className="text-gray-500 mt-2">CONTACT US NOW</p>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info & Deal Text */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">WE OFFER ONE OF THE BEST DEALS IN THE MARKET.</h3>
              <p className="text-gray-600 mb-2">We understand where our clients are coming from. They run a business. We do too.</p>
              <p className="text-gray-600 mb-2">We come up with ways to cut cost and focus on the essentials that make a great branding experience.</p>
              <p className="text-gray-800 font-semibold mt-4">We provide you top quality outputs at only a fraction of the price.</p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">EMAIL</p>
                  <p className="font-medium text-gray-800">creationniel6@gmail.com</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded">G GMAIL</span>
                  <button 
                    onClick={() => copyToClipboard('creationniel6@gmail.com')}
                    className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition"
                  >
                    COPY
                  </button>
                </div>
              </div>

              {/* Mobile */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">MOBILE</p>
                  <p className="font-medium text-gray-800">+63 912 345 6789</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition">CALL</button>
                  <button 
                    onClick={() => copyToClipboard('+63 912 345 6789')}
                    className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition"
                  >
                    COPY
                  </button>
                </div>
              </div>

              {/* Copy All Button */}
              <button 
                onClick={copyAllDetails}
                className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                COPY ALL CONTACT DETAILS
              </button>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="James Harry"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="JamesHarry@gmail.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                />
              </div>

              {/* Phone Number (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="094525636332"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                />
              </div>

              {/* Address (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address (optional)</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                />
              </div>

              {/* Message / Project Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message / Project Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                ></textarea>
              </div>

              {/* Services Interested In */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Services Interested In *</label>
                <div className="flex flex-wrap gap-2">
                  {servicesList.map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        formData.services.includes(service)
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
                {formData.services.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">Please select at least one service</p>
                )}
              </div>

              {/* File Attachment Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-800 mb-2">How to attach files in Gmail (after clicking Send)</p>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  <li>After you click "Send Message", Gmail will open in a new tab with your message pre-filled.</li>
                  <li>Look for the <span className="font-bold">Attach files icon (paperclip)</span> at the bottom of the compose window.</li>
                  <li>Click the paperclip icon, then select images, documents, or any files from your computer (design briefs, logos, references, etc.).</li>
                  <li>You can also drag & drop files directly into the email window. Attachments appear as thumbnails below the subject line.</li>
                  <li>Once files are attached, review your message and click Send - your attachments will be delivered along with the inquiry.</li>
                </ol>
                <p className="text-xs text-blue-600 mt-2 italic">Pro tip: Maximum attachment size in Gmail is 25MB. If your files are larger, share via Google Drive link or compress them before attaching</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                SEND MESSAGE
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Fill out the form, then click Send. Gmail will open with your message - simply attach your files using the paperclip icon.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
