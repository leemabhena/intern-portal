import "./ProfileTile.css";
import { useState, useEffect } from "react";

const ProfileTile = ({ setUser, user }) => {
  // Load user from local storage on component mount
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    if (storedId) {
      setUser({ userId: storedId, username: storedUsername });
    } else {
      const randomId = generateRandomID();
      // set user to local storage
      localStorage.setItem("userId", randomId);
      localStorage.setItem("username", `@Anon${randomId}`);
      setUser({ userId: randomId, username: `@Anon${randomId}` });
      alert(
        `You have been assigned a random Id, ${randomId} for use in deleting posts`
      );
    }
  }, []);
  return (
    user && (
      <div className="ProfileTile">
        <div className="avatar avatar-sm">
          <img
            src="https://gitlab.com/uploads/-/system/user/avatar/56386/tt_avatar_small.jpg"
            alt="User image"
          />
        </div>
        <div className="user-description">
          <p className="user-name">{user.username}</p>
          <p className="user-id">{user.userId}</p>
        </div>
      </div>
    )
  );
};

export default ProfileTile;

function generateRandomID() {
  // Generate a random number between 10000 and 99999
  const randomNum = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  return randomNum;
}
