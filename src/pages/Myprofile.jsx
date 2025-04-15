// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { assets } from "../assets/assets"; // Correct import

const MyProfile = () => {
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState({
    name: "Nikhilesh K S",
    image: assets.profile_pic, // Use the imported image
    email: "nikhileshks09@gmail.com",
    phone: "+91 8088521583",
    address: {
      line1: "Behind the court Road",
      line2: "Near the D, cross Doddballapura",
    },
    gender: "male",
    dob: "2001-09-14",
  });

  return (
    <div>
      <img src={userData.image} alt="Profile" />
    </div>
  );
};

export default MyProfile;
