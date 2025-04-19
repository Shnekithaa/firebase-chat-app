import React from "react";
import "./userInfo.css";
import { useUserStore } from "../../lib/userStore";
import { auth } from "../../lib/firebase";
import { FaSignOutAlt } from "react-icons/fa";

function UserInfo() {
  const { currentUser } = useUserStore();

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h2>{currentUser.username}</h2>
        <div className="icons">
          <img src="./more.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./edit.png" alt="" />

          <button className="logout" onClick={handleLogout}>
            <FaSignOutAlt style={{ height: "14px", filter: "invert(1)" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
