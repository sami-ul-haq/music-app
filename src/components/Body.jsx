import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import { useEffect } from "react";
import axios from "axios";
import { reducerCase } from "../utils/constants";

const Container = styled.div`
  .playlist-item {
    .playlist-data {
      margin: 0 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      .image {
        img {
          height: 15rem;
          box-shadow: rgba(0 0 0, 0.25) 0 25px 25px -12px;
        }
      }

      .playlist__details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        color: #e0dede;
        .title {
          color: #fff;
          font-size: 3rem;
          line-height: 3rem;
        }
      }
    }

    .list {
      .header-row {
        display: grid;
        grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
        color: #dddcdc;
        margin: 1rem 0 0 0;
        position: sticky;
        top: 15vh;
        padding: 1rem 3rem;
        transition: 0.3s ease-in-out;
        background-color: ${({ headerBg }) =>
          headerBg ? "#000000dc" : "transparent"};
      }
      .tracks {
        padding: 0 2rem;
        display: flex;
        flex-direction: column;
        padding-bottom: 5rem;
        .row {
          padding: 0.5rem 1rem;
          cursor: pointer;
          display: grid;
          grid-template-columns: 0.3fr 3.1fr 1.9fr 0.1fr;
          &:hover {
            background-color: rgba(0, 0, 0, 0.7);
          }
          .col {
            display: flex;
            align-items: center;
            color: #dddcdc;
            img {
              height: 40px;
            }
          }
          .details {
            display: flex;
            gap: 1rem;
            .info {
              display: flex;
              flex-direction: column;
            }
          }
        }
      }
    }
  }
`;

const Body = ({ headerBg }) => {
  const {
    state: { token, selectedPlaylistId, selectedPlaylist },
    dispatch,
  } = useStateProvider();

  const getSelectedPlaylist = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    const selectedPlaylist = {
      id: data?.id,
      name: data?.name,
      desc: data?.description.startsWith("<a") ? "" : data.description,
      image: data?.images[0]?.url,
      tracks: data?.tracks.items.map(({ track }) => ({
        id: track?.id,
        name: track?.name,
        artists: track?.artists.map((artist) => artist.name),
        image: track?.album.images[2].url,
        duration: track?.duration_ms,
        album: track?.album.name,
        context_url: track?.album.uri,
        track_number: track?.track_number,
      })),
    };
    dispatch({
      type: reducerCase.SET_PLAYLIST,
      payload: selectedPlaylist,
    });
  };

  const msToMinAndSec = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    // return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  useEffect(() => {
    getSelectedPlaylist();
  }, [token, selectedPlaylistId]);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };

      dispatch({
        type: reducerCase.SET_PLAYING,
        payload: currentPlaying,
      });
      dispatch({
        type: reducerCase.SET_PLAYER_STATE,
        payload: true,
      });
    } else {
      dispatch({
        type: reducerCase.SET_PLAYER_STATE,
        payload: false,
      });
    }
  };

  return (
    <Container headerBg={headerBg}>
      {selectedPlaylist && (
        <div className="playlist-item">
          <div className="playlist-data">
            <div className="image">
              <img src={selectedPlaylist.image} alt="playlist-image" />
            </div>
            <div className="playlist__details">
              <span className="type">Playlist</span>
              <h2 className="title">{selectedPlaylist.name}</h2>
              <div className="description">{selectedPlaylist.desc}</div>
            </div>
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  i
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span>{i + 1}</span>
                      </div>
                      <div className="col details">
                        <div className="image">
                          <img src={image} alt="alt" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span className="artist">{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinAndSec(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Body;
