import React, { useContext, useEffect, useState } from "react";
import { getUser } from "../api/endpoints/user";
import AuthContext from "../contexts/AuthContext";
import "./profilePage.css";

import { editUser } from "../api/endpoints/user";

import EditableInput from "../Components/EditableInput/EditableInput";
import { editCompany } from "../api/endpoints/companies";

const UserProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userData && user) {
      getUser(user.uid).then((res) => setUserData(res));
    }
  }, []);

  const saveCallback = async (value, field) => {
    let res;
    if (field == "password") {
      let confirmPassword = prompt("Confirm new password");
      if (confirmPassword == value) {
        res = await editUser({ value: value, field: field, id: user.uid });
      }
    }

    res = await editUser({ value: value, field: field, id: user.uid });
    console.log(res);

    if (res) {
      const newUserContext = {
        email: res.email,
        name: res.name,
        uid: res._id,
      }
      

      setUser(newUserContext);
      localStorage.setItem("user", JSON.stringify(newUserContext));
      return true;
    } else {
      return false;
    }
  };

  
  return userData ? (
    <div className="container">
      <h1>Profile</h1>
      <h2>Info</h2>
      <EditableInput
        value={userData.name}
        type="string"
        label="Name"
        id="name"
        name="name"
        saveCallback={saveCallback}
      />
      <EditableInput
        value={userData.lastName}
        type="string"
        label="Last Name"
        id="lastName"
        name="lastName"
        saveCallback={saveCallback}
      />
      <EditableInput
        value={userData.email}
        type="email"
        label="Email"
        id="email"
        name="email"
        saveCallback={saveCallback}
      />

      <EditableInput
        value={""}
        type="password"
        label="Change password"
        id="password"
        name="password"
        saveCallback={saveCallback}
      />

<EditableInput
        value={userData.birthDate.split("T")[0]}
        type="date"
        label="Date of birth"
        id="birthDate"
        name="birthDate"
        saveCallback={saveCallback}
      />
    </div>
  ) : null;
};

export default UserProfilePage;
