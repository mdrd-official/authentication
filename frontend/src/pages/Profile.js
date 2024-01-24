import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../services/userServices";
import { setData, setProfileImage } from "../features/auth/userSlice";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isUploaded } = useSelector((state) => state.userAuth);

  const [selectedImage, setSelectedImage] = useState(null);
  const [fullName, setFullName] = useState(user ? user.fullName : "");
  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [mobile, setMobile] = useState(user ? user.mobile : "");
  const [image, setImage] = useState(user ? user.image : "");
  const [isLoaded, setisLoaded] = useState(isUploaded);

  const handleSubmit = async () => {
    try {
      const formData = {
        fullName,
        username,
        email,
        mobile,
      };

      const response = await updateUserProfile(formData);
      dispatch(setData(response.user));
      alert(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileImageUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", event.target.image.files[0]);
    try {
      // Replace 'http://localhost:3001/upload' with your actual server endpoint
      const response = await axios.post(
        "http://localhost:3001/api/users/profileImage",
        formData,
        { withCredentials: true }
      );
      const userData = response.data.user;

      dispatch(setProfileImage(userData));
      alert(response.data.message);
    } catch (error) {
      // Handle error
      console.error("Error uploading image:", error);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row mx-5">
        <form
          className="col-md-4"
          onSubmit={handleProfileImageUpload}
          encType="multipart/form-data"
        >
          <div className="col-md-3 border-right mx-5">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <div className="mb-3">
                {isLoaded ? (
                  image ? (
                    <img
                      className="rounded-circle"
                      width="150px"
                      src={`http://localhost:3001/${image}`}
                      alt="Profile"
                    />
                  ) : null
                ) : selectedImage ? (
                  <img
                    className="rounded-circle"
                    width="150px"
                    src={selectedImage}
                    alt="Selected Profile"
                  />
                ) : (
                  <img
                    className="rounded-circle"
                    width="150px"
                    src="download.jpeg"
                    alt="Selected Profile"
                  />
                )}

                <input
                  type="file"
                  className="mt-3"
                  id="profileImage"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="mt-3 text-center">
                <button
                  className="btn btn-success profile-button"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="col-md-8 border-right">
          <div className="p-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3"></div>
            <div className="row mt-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-3 text-center">
              <button
                className="btn btn-success profile-button"
                type="button"
                onClick={handleSubmit}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
