import styled from "styled-components";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "./Playlists";

const Container = styled.div`
  background-color: #000;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .top_links {
    display: flex;
    flex-direction: column;

    .logo {
      margin: 1rem 0;
      img {
        display: block;
        margin: 0 auto;
      }
    }

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li{
        display: flex !important:
        align-items: center;
        gap: 1rem;
        transition: 0.3s ease-in-out;
        &:hover{
          color: #fff;
        }
        span{
          margin-left: 10px;
        }
      }
    }
  }
`;

const Img = styled.img`
  width: 100%;
  padding: 1rem;
`;

const Sidebar = () => {
  return (
    <Container>
      <div className="top_links">
        <div className="logo">
          <Img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="spotify-logo"
          />
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your Library</span>
          </li>
        </ul>
      </div>
      <Playlists />
    </Container>
  );
};

export default Sidebar;
