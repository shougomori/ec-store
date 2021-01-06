import React from "react";
import { getUserId,getUsername } from "../reducks/users/selectors";
import { useSelector } from "react-redux";
import { signOut } from "../reducks/users/operations";
import { useDispatch} from "react-redux";


const Home = () => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);
  const dispatch = useDispatch()


  return (
    <div>
      <h2>Home</h2>
      <p>{uid}</p>
      <p>ユーザー名:{username}</p>
      <button onClick={() => dispatch(signOut()) }>SIGNOUT</button>
    </div>
  );
};

export default Home;
