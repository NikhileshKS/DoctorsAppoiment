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
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl flex flex-col lg:flex-row overflow-hidden relative">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 overflow-hidden">
          <div className="w-full max-w-xs relative">
            <AnimatePresence mode="wait">
              {formType === 'login' ? (
                <motion.form
                  key="login"
                  onSubmit={handleLoginSubmit}
                  className="space-y-6 text-center"
                  {...animationProps}
                >
                  <h1 className="text-3xl font-bold text-gray-700">Login</h1>

                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={loginData.username}
                      onChange={handleLoginChange}
                      className={`w-full py-2 pl-4 pr-10 rounded-md bg-gray-100 focus:outline-none transition-all ${errors.username ? 'border border-red-500' : ''}`}
                    />
                    <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    {errors.username && <p className="text-red-500 text-xs text-left mt-1">{errors.username}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className={`w-full py-2 pl-4 pr-10 rounded-md bg-gray-100 focus:outline-none transition-all ${errors.password ? 'border border-red-500' : ''}`}
                    />
                    <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    {errors.password && <p className="text-red-500 text-xs text-left mt-1">{errors.password}</p>}
                  </div>

                  <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    Login
                  </button>

                  <p className="text-sm">or login with</p>
                  <div className="flex justify-center space-x-3 text-xl text-gray-600">
                    <FaGoogle className="cursor-pointer hover:text-blue-500" />
                    <FaFacebook className="cursor-pointer hover:text-blue-600" />
                    <FaGithub className="cursor-pointer hover:text-gray-800" />
                    <FaLinkedin className="cursor-pointer hover:text-blue-700" />
                  </div>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  onSubmit={handleSignupSubmit}
                  className="space-y-6 text-center"
                  {...animationProps}
                >
                  <h1 className="text-3xl font-bold text-gray-700">Register</h1>

                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      placeholder="Full Name"
                      value={signupData.username}
                      onChange={handleSignupChange}
                      className={`w-full py-2 pl-4 pr-10 rounded-md bg-gray-100 focus:outline-none transition-all ${errors.username ? 'border border-red-500' : ''}`}
                    />
                    <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    {errors.username && <p className="text-red-500 text-xs text-left mt-1">{errors.username}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      className={`w-full py-2 pl-4 pr-10 rounded-md bg-gray-100 focus:outline-none transition-all ${errors.email ? 'border border-red-500' : ''}`}
                    />
                    <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    {errors.email && <p className="text-red-500 text-xs text-left mt-1">{errors.email}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      className={`w-full py-2 pl-4 pr-10 rounded-md bg-gray-100 focus:outline-none transition-all ${errors.password ? 'border border-red-500' : ''}`}
                    />
                    <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    {errors.password && <p className="text-red-500 text-xs text-left mt-1">{errors.password}</p>}
                  </div>

                  <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                    Register
                  </button>

                  <p className="text-sm">or sign up with</p>
                  <div className="flex justify-center space-x-3 text-xl text-gray-600">
                    <FaGoogle className="cursor-pointer hover:text-blue-500" />
                    <FaFacebook className="cursor-pointer hover:text-blue-600" />
                    <FaGithub className="cursor-pointer hover:text-gray-800" />
                    <FaLinkedin className="cursor-pointer hover:text-blue-700" />
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Side Panel */}
        <motion.div
          className={`w-full lg:w-1/2 flex flex-col justify-center items-center text-white p-10 transition-colors duration-500 ${formType === 'login' ? 'bg-blue-500' : 'bg-[#9526a9]'}`}
          key={formType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {formType === 'login' ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-center">New here?</h2>
              <p className="text-sm mb-6 text-center">Sign up and join our community!</p>
              <button
                onClick={() => toggleFormType('signup')}
                className="px-6 py-2 border border-white rounded-md hover:bg-white hover:text-blue-500 transition-colors"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4 text-center">Welcome back!</h2>
              <p className="text-sm mb-6 text-center">Already have an account?</p>
              <button
                onClick={() => toggleFormType('login')}
                className="px-6 py-2 border border-white rounded-md hover:bg-white hover:text-[#9526a9] transition-colors"
              >
                Login
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoginSignup;