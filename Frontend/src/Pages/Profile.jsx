/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { token, backendURL } = useContext(AppContext);
  const [profile, setProfile] = useState(null);


  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/vendor/profile`,
        {
          headers: {
        token},
        }
      );

      if (data.success) {
        setProfile(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
        console.log(error)
      toast.error("Failed to load profile");
    } 
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500">Please login first</p>
      </div>
    );
  }

    if (!profile) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500">Profile not available</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Vendor Profile
        </h2>

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">{profile.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{profile.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">{profile.phone}</p>
          </div>

          <div>
            <p className="text-gray-500">Login Type</p>
            <p className="font-medium capitalize">
              {profile.oauthProvider}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
