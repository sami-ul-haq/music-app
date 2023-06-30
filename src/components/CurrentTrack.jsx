import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";
import { reducerCase } from "../utils/constants";
import { useStateProvider } from "../utils/StateProvider";

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      h4 {
        color: #fff;
      }
      h6 {
        color: #b3b3b3;
      }
    }
  }
`;

const CurrentTrack = () => {
  const {
    state: { token, currentlyPlaying },
    dispatch,
  } = useStateProvider();

  const getCurrentTrack = async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data !== "") {
        const { item } = response.data;
        const currentlyPlayingData = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };

        dispatch({
          type: reducerCase.SET_PLAYING,
          payload: currentlyPlayingData,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getCurrentTrack();
    console.log("I run: Get Current Track");
  }, [token]);

  return (
    <Container>
      {currentlyPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentlyPlaying?.image} alt="track" />
          </div>
          <div className="track__info">
            <h4>{currentlyPlaying?.name}</h4>
            <h6>{currentlyPlaying?.artists.join(", ")}</h6>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CurrentTrack;
