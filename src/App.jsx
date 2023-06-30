import { useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { reducerCase } from "./utils/constants";
import { useStateProvider } from "./utils/StateProvider";

const App = () => {
  const { dispatch, state } = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.split("&")[0].split("=")[1];
      dispatch({
        type: reducerCase.SET_Token,
        payload: token,
      });
    }
  }, []);

  return <div className="app">{state.token ? <Spotify />  : <Login />}</div>;
  // return <div className="app"><Spotify /></div>;
};

export default App;
