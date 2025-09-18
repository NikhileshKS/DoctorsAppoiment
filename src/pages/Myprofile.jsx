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
      city: "Mysuru",
      state: "Karnataka",
      zip: "570001",
    },
    image: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ Format DOB for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      address: { ...userData.address, [name]: value },
    });
  };

  // ✅ Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUserData({ ...userData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // ✅ Form validation
  const validateForm = () => {
    let newErrors = {};
    if (!userData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email))
      newErrors.email = "Invalid email address";
    if (!/^\+?\d{10,15}$/.test(userData.phone))
      newErrors.phone = "Invalid phone number";
    if (!userData.address.line1.trim())
      newErrors.line1 = "Address Line 1 is required";
    return newErrors;
  };

  // ✅ Submit handler
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
      alert("Profile updated successfully ✅");
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-3xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h1>

        {/* Profile Image Upload */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-40 h-40 rounded-full bg-blue-200 flex items-center justify-center animate-pulse">
          <img
            src={userData.image || "https://via.placeholder.com/150"}
            alt=""
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105"
          />

          {isEdit && (
            <>
              {/* Edit Button */}
              <label
                htmlFor="profileImage"
                className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-800 transition transform hover:scale-110"
              >
                ✎
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {/* Remove Button (Reset to Placeholder) */}
              <button
                type="button"
                onClick={() => setUserData(prev => ({ ...prev, image: "https://via.placeholder.com/150" }))}
                className="absolute top-2 right-2 bg-yellow-500 text-white p-2 rounded-full shadow-md hover:bg-yellow-600 transition transform hover:scale-110"
                title="Remove and reset image"
              >
                🗑
              </button>
            </>
          )}
        </div>
      </div>
      


      {/* Edit / View Form */}
      {isEdit ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className={`w-full border rounded p-2 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className={`w-full border rounded p-2 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className={`w-full border rounded p-2 ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium">Gender</label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={userData.dob}
              onChange={handleInputChange}
              max={new Date().toISOString().split("T")[0]}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium">Address</label>
            <input
              type="text"
              name="line1"
              placeholder="Address Line 1"
              value={userData.address.line1}
              onChange={handleAddressChange}
              className={`w-full border rounded p-2 mb-2 ${
                errors.line1 ? "border-red-500" : ""
              }`}
            />
            {errors.line1 && (
              <p className="text-red-500 text-sm">{errors.line1}</p>
            )}
            <input
              type="text"
              name="city"
              placeholder="City"
              value={userData.address.city}
              onChange={handleAddressChange}
              className="w-full border rounded p-2 mb-2"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={userData.address.state}
              onChange={handleAddressChange}
              className="w-full border rounded p-2 mb-2"
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={userData.address.zip}
              onChange={handleAddressChange}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={() => {
                setIsEdit(false);
                setErrors({});
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
          <p>
            <strong>Gender:</strong> {userData.gender}
          </p>
          <p>
            <strong>Date of Birth:</strong> {formatDate(userData.dob)}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {`${userData.address.line1}, ${userData.address.city}, ${userData.address.state}, ${userData.address.zip}`}
          </p>

          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
