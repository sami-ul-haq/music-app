import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { reducerCase } from "../utils/constants";
import { useStateProvider } from "../utils/StateProvider";

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  h2 {
    font-size: 1.2rem;
    padding: 1rem 1rem 0.5rem;
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 52vh;
    max-height: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
`;

const Playlists = () => {
  const {
    state: { token, playlists },
    dispatch,
  } = useStateProvider();

  const getPlaylistData = async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlistData = items.map(({ id, name }) => {
        return { id, name };
      });
      dispatch({
        type: reducerCase.SET_PLAYLISTS,
        payload: playlistData,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getPlaylistData();
    console.log("I run: Get play list data");
  }, [token]);

  const changePlaylist = (playlistId) => {
    dispatch({
      type: reducerCase.SET_PLAYLIST_ID,
      payload: playlistId,
    });
  };

  return (
    <Container>
      <h2>Playlists</h2>
      <ul>
        {playlists?.map((item, i) => (
          <li key={i} onClick={()=>changePlaylist(item.id)}>{item.name}</li>
        ))}
      </ul>
    </Container>
  );
};

export default Playlists;
