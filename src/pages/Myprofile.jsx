import React, { useState } from "react";

export default function MyProfile() {
  const [userData, setUserData] = useState({
    name: "Nikhilesh K S",
    email: "nikhilesh@example.com",
    phone: "+91 8088521583",
    gender: "Male",
    dob: "2001-09-14",
    address: {
      line1: "123, Main Street",
      city: "Mysore",
      state: "Karnataka",
      zip: "570001",
    },
    image: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Format DOB for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      address: { ...userData.address, [name]: value },
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: "Please select an image file" });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ ...errors, image: "Image size should be less than 5MB" });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setUserData({ ...userData, image: reader.result });
        setErrors({ ...errors, image: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  // Form validation
  const validateForm = () => {
    let newErrors = {};
    
    if (!userData.name.trim()) newErrors.name = "Name is required";
    else if (userData.name.trim().length < 2) newErrors.name = "Name should be at least 2 characters";
    
    if (!userData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email))
      newErrors.email = "Invalid email address";
    
    if (!userData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?\d{10,15}$/.test(userData.phone.replace(/\s/g, '')))
      newErrors.phone = "Invalid phone number";
    
    if (!userData.address.line1.trim())
      newErrors.line1 = "Address Line 1 is required";
    
    if (!userData.address.city.trim())
      newErrors.city = "City is required";
    
    if (!userData.address.state.trim())
      newErrors.state = "State is required";
    
    if (!userData.address.zip.trim())
      newErrors.zip = "ZIP code is required";
    else if (!/^\d{5,6}(-\d{4})?$/.test(userData.address.zip))
      newErrors.zip = "Invalid ZIP code";
    
    return newErrors;
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEdit(false);
    setErrors({});
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setIsLoading(true);
    
    // Fake API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEdit(false);
      setSuccessMessage("Profile updated successfully ✅");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
            {!isEdit && (
              <button 
                className="bg-indigo-600 hover:bg-indigo-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                onClick={() => setIsEdit(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
          
          {successMessage && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {successMessage}
            </div>
          )}
          
          {!isEdit ? (
            // View Mode
            <div className="space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {userData.image ? (
                    <img 
                      src={userData.image} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-800 text-4xl font-bold">
                        {userData.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800">{userData.name}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">Personal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{userData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{userData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{userData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{userData.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{formatDate(userData.dob)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">Address</h3>
                  <div>
                    <p className="text-sm text-gray-500">Full Address</p>
                    <p className="font-medium">
                      {`${userData.address.line1}, ${userData.address.city}, ${userData.address.state}, ${userData.address.zip}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">Personal Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={userData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        id="dob"
                        name="dob"
                        type="date"
                        value={userData.dob}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">Address Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="line1" className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1 *
                      </label>
                      <input
                        id="line1"
                        name="line1"
                        value={userData.address.line1}
                        onChange={handleAddressChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                          errors.line1 ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.line1 && <p className="mt-1 text-sm text-red-600">{errors.line1}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        id="city"
                        name="city"
                        value={userData.address.city}
                        onChange={handleAddressChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        id="state"
                        name="state"
                        value={userData.address.state}
                        onChange={handleAddressChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                          errors.state ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        id="zip"
                        name="zip"
                        value={userData.address.zip}
                        onChange={handleAddressChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                          errors.zip ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.zip && <p className="mt-1 text-sm text-red-600">{errors.zip}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="profile-image" className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Image
                      </label>
                      <input 
                        id="profile-image"
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      />
                      {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                      {userData.image && (
                        <div className="mt-2">
                          <img
                            src={userData.image}
                            alt="Profile Preview"
                            className="w-24 h-24 rounded-lg object-cover border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <button 
                  type="button" 
                  className="px-5 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}