import "./CreateRandomId.css";
import { useState } from "react";

export default function CreateRandomId({ user }) {
  // const [randomId, setRandomId] = useState(generateRandomID());
  return (
    <div className="CreateRandomId">
      <h3>Welcome to the internship portal</h3>
      <p className="random-intro">
        You have been assigned an id and username shown below, which you can use
        to create, update and delete posts and comments.
      </p>
      <input type="text" name="userName" placeholder={user.username} />
      <p className="randomId">Assigned id: {user.userId}</p>
      {/* <button>Sign Up</button>
      <p>Or login using the form below if you already have id.</p>
      <input type="text" placeholder="Username" /> &nbsp;
      <input type="text" name="userId" placeholder="User id" />
      <button>Login</button> */}
    </div>
  );
}

function generateRandomID() {
  // Generate a random number between 10000 and 99999
  const randomNum = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  return randomNum;
}
