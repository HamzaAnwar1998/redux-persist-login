import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../store/slices/UserSlice";

const Home = () => {
  // redux state
  const { userObj } = useSelector((state) => state.user);

  // dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {userObj ? (
        <>
          <h1>{userObj.firstName}</h1>
          <h3>{userObj.email}</h3>
          <button type="button" onClick={() => dispatch(clearUser())}>
            LOGOUT
          </button>
        </>
      ) : (
        <>
          <h4>Implementation of Redux Persist Login using an API Call.</h4>
          <button type="button" onClick={() => navigate("/login")}>
            LOGIN
          </button>
        </>
      )}
    </>
  );
};

export default Home;
