import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from "../utils/StateProvider";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({navBg})=>navBg ? "rgba(0,0,0,0.7)" : "transparent"};
  .search__bar {
    background-color: #fff;
    width: 40%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: #000;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: #fff;
      text-decoration: none;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;

const Navbar = ({navBg}) => {
  const {
    state: { userInfo },
  } = useStateProvider();

  return (
    <Container navBg={navBg}>
      <div className="search__bar">
        <FaSearch />
        <input type="text" placeholder="Artists, songs or podcasts" />
      </div>
      <div className="avatar">
        <a href="#">
          <CgProfile />
          <span>
            {userInfo?.userName ? userInfo?.userName : "Guest"}
          </span>
        </a>
      </div>
    </Container>
  );
};

export default Navbar;
