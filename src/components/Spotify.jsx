import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { reducerCase } from "../utils/constants";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;

  .spotify_body {
    display: grid;
    grid-template-columns: 20vw 80vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);

    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;

const Spotify = () => {
  const [navBg, setNavBg] = useState(false);
  const [headerBg, setHeaderBg] = useState(false);
  const bodyRef = useRef();

  const bodySccrolled = () => {
    bodyRef.current.scrollTop >= 30 ? setNavBg(true) : setNavBg(false);
    bodyRef.current.scrollTop >= 268 ? setHeaderBg(true) : setHeaderBg(false);
  };

  const {
    state: { token },
    dispatch,
  } = useStateProvider();

  const getUserData = async () => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
      };
      dispatch({
        type: reducerCase.SET_USERINFO,
        payload: userInfo,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [token]);

  return (
    <Container>
      <div className="spotify_body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodySccrolled}>
          <Navbar navBg={navBg} />
          <div className="body-contents">
            <Body headerBg={headerBg} />
          </div>
        </div>
      </div>
      <div className="spotify_footer">
        <Footer />
      </div>
    </Container>
  );
};

export default Spotify;
