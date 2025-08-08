import React, { useState } from "react";
import { app } from "../firebase";
import { getDatabase, push, ref, set } from "firebase/database";
export default function ContactPage() {
  const [status,setStatus] = useState({
    loading:false,
    error:"",
    success:""
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };
  const saveData = async () => {
    if(formData==null||formData.name==""||formData.email==""||formData.message==""){
        setStatus((pre)=>({...pre,success:"",loading:false,error:"please fill all fields"}))
        return;
    }
    try {
      const db = getDatabase(app);
      const newDocRef = push(ref(db, "contact"));
      await set(newDocRef,{
        name:formData.name.trim(),
        email:formData.email.trim(),
        message:formData.message.trim(),
        createdAt:Date.now()
      });
       setStatus((pre)=>({...pre,success:"stored data successfully",error:""}));
    } catch (error) {
      console.log(error);
      setStatus((pre)=>({...pre,success:"",loading:false,error:"failed data not stored in db"}));
    } finally {
      setStatus((pre)=>({...pre,loading:false}));
    }
  };

  const handleSubmit = (e) => {
    setStatus((pre)=>({...pre,loading:true}));
    e.preventDefault();
    saveData();
    setFormData({
        name:"",
        email:"",
        message:""
    })
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left info panel */}
        <div className="p-8 bg-gradient-to-br from-indigo-600 to-purple-500 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Get in Touch</h2>
            <p className="mb-6">
              We’d love to hear from you. Fill out the form and we’ll get back
              to you within 1–2 business days.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75L12 13.5l9.75-6.75M12 13.5v7.5"
                  />
                </svg>
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-sm">support@example.com</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.5a9.6 9.6 0 0118 0c0 5.121-4.12 9.5-9.5 9.5S3 13.621 3 8.5z"
                  />
                  <circle cx="12" cy="8.5" r="2.5" />
                </svg>
                <div>
                  <div className="text-sm font-medium">Location</div>
                  <div className="text-sm">1234 Street Name, City, Country</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5.5h18M3 9.5h18M3 13.5h18M3 17.5h18"
                  />
                </svg>
                <div>
                  <div className="text-sm font-medium">Phone</div>
                  <div className="text-sm">+1 (555) 123-4567</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            {/* Social icons placeholders */}
            <a
              href="#"
              aria-label="Twitter"
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20c7.547 0 11.675-6.155 11.675-11.495 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.924a8.273 8.273 0 01-2.357.636 4.117 4.117 0 001.804-2.27 8.224 8.224 0 01-2.605.98A4.107 4.107 0 0015.448 4c-2.266 0-4.103 1.815-4.103 4.053 0 .318.036.627.105.925C7.728 8.864 4.1 6.884 1.67 3.905a4.025 4.025 0 00-.555 2.036c0 1.404.722 2.645 1.82 3.372a4.093 4.093 0 01-1.857-.51v.05c0 1.96 1.388 3.594 3.236 3.963a4.1 4.1 0 01-1.852.07 4.107 4.107 0 003.834 2.82A8.233 8.233 0 010 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
                <path d="M2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 .5a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.21.09 1.85 1.26 1.85 1.26 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.55.12-3.23 0 0 1.01-.33 3.3 1.23a11.5 11.5 0 016 0c2.29-1.56 3.3-1.23 3.3-1.23.66 1.68.24 2.92.12 3.23.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22 0 1.61-.01 2.91-.01 3.31 0 .32.22.7.83.58A12 12 0 0012 .5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right form panel */}
        <div className="p-8">
          <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
          <form className="space-y-6" noValidate onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={formData.name}
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                 value={formData.email}
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                name="message"
                placeholder="Write your message..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                 value={formData.message}
                required
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                We respect your privacy. Your information won’t be shared.
              </div>
              {
                status.error&&<p className="text-red-500">{status.error}</p>
                
              }
              {
                 status.success&&<p className="text-green-500">{status.success}</p>
              }
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition"
              >
                {
                    status.loading?<div className="h-6 w-6 border animate-spin rounded-full"></div>:"Send Message"
                }
              </button>
            </div>
          </form>
          <p className="mt-4 text-xs text-gray-500">
            Alternatively, you can email us directly at{" "}
            <span className="font-medium">support@example.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
