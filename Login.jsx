// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaGoogle,
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const LoginSignup = () => {
  const [formType, setFormType] = useState('login');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.username.trim()) newErrors.username = 'Username is required';
    if (!loginData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.username.trim()) newErrors.username = 'Username is required';
    if (!signupData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) newErrors.email = 'Invalid email format';
    if (!signupData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      console.log('Login Data:', loginData);
      setLoginData({ username: '', password: '' });
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (validateSignup()) {
      console.log('Signup Data:', signupData);
      setSignupData({ username: '', email: '', password: '' });
    }
  };

  const toggleFormType = (type) => {
    setErrors({});
    setFormType(type);
    // Reset form data when switching
    if (type === 'login') {
      setSignupData({ username: '', email: '', password: '' });
    } else {
      setLoginData({ username: '', password: '' });
    }
  };

  const animationProps = {
    initial: { opacity: 0, x: formType === 'login' ? 50 : -50, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: formType === 'login' ? -50 : 50, scale: 0.95 },
    transition: { duration: 0.4, ease: 'easeInOut' },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[80vh]">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex items-center  justify-center p-4 sm:p-8 md:p-10">
          <div className="w-full max-w-md ">
            <AnimatePresence mode="wait">
              {formType === 'login' ? (
                <motion.form
                  key="login"
                  onSubmit={handleLoginSubmit}
                  className="space-y-4 sm:space-y-6"
                  {...animationProps}
                >
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 text-center">Login</h1>

                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={loginData.username}
                      onChange={handleLoginChange}
                      className={`w-full py-2 px-4 pl-10 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.username ? 'border border-red-500' : 'border border-transparent'
                      }`}
                    />
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    {errors.username && (
                      <p className="text-red-500 text-xs text-left mt-1">{errors.username}</p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className={`w-full py-2 px-4 pl-10 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.password ? 'border border-red-500' : 'border border-transparent'
                      }`}
                    />
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    {errors.password && (
                      <p className="text-red-500 text-xs text-left mt-1">{errors.password}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Login
                  </button>

                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-sm text-gray-500 px-2">or login with</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>

                  <div className="flex justify-center space-x-4 text-xl text-gray-600">
                    <FaGoogle className="cursor-pointer hover:text-blue-500 transition-colors" />
                    <FaFacebook className="cursor-pointer hover:text-blue-600 transition-colors" />
                    <FaGithub className="cursor-pointer hover:text-gray-800 transition-colors" />
                    <FaLinkedin className="cursor-pointer hover:text-blue-700 transition-colors" />
                  </div>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  onSubmit={handleSignupSubmit}
                  className="space-y-4 sm:space-y-6"
                  {...animationProps}
                >
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 text-center">Register</h1>

                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      placeholder="Full Name"
                      value={signupData.username}
                      onChange={handleSignupChange}
                      className={`w-full py-2 px-4 pl-10 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        errors.username ? 'border border-red-500' : 'border border-transparent'
                      }`}
                    />
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    {errors.username && (
                      <p className="text-red-500 text-xs text-left mt-1">{errors.username}</p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      className={`w-full py-2 px-4 pl-10 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        errors.email ? 'border border-red-500' : 'border border-transparent'
                      }`}
                    />
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    {errors.email && (
                      <p className="text-red-500 text-xs text-left mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      className={`w-full py-2 px-4 pl-10 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        errors.password ? 'border border-red-500' : 'border border-transparent'
                      }`}
                    />
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    {errors.password && (
                      <p className="text-red-500 text-xs text-left mt-1">{errors.password}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Register
                  </button>

                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-sm text-gray-500 px-2">or sign up with</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>

                  <div className="flex justify-center space-x-4 text-xl text-gray-600">
                    <FaGoogle className="cursor-pointer hover:text-blue-500 transition-colors" />
                    <FaFacebook className="cursor-pointer hover:text-blue-600 transition-colors" />
                    <FaGithub className="cursor-pointer hover:text-gray-800 transition-colors" />
                    <FaLinkedin className="cursor-pointer hover:text-blue-700 transition-colors" />
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Side Panel */}
        <motion.div
          className={`w-full lg:w-1/2 flex flex-col justify-center items-center text-white p-6 sm:p-8 md:p-10 transition-colors duration-500 ${
            formType === 'login' ? 'bg-blue-500' : 'bg-purple-700'
          }`}
          key={formType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-xs">
            {formType === 'login' ? (
              <>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">New here?</h2>
                <p className="text-sm sm:text-base mb-4 sm:mb-6">
                  Sign up and join our community to discover amazing features!
                </p>
                <button
                  onClick={() => toggleFormType('signup')}
                  className="px-4 sm:px-6 py-2 border border-white rounded-md hover:bg-white hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Welcome back!</h2>
                <p className="text-sm sm:text-base mb-4 sm:mb-6">
                  Already have an account? Login to access your personalized dashboard.
                </p>
                <button
                  onClick={() => toggleFormType('login')}
                  className="px-4 sm:px-6 py-2 border border-white rounded-md hover:bg-white hover:text-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginSignup;