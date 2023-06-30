import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  input{
    width: 10rem;
    border-radius: 2rem;
    height: 0.5rem;
    -webkit-appearance: none;
    appearance: none;
  background: transparent;
  &::-webkit-slider-runnable-track {
  background: #fff;
  border-radius: 5px;
  height: 0.5rem;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
   appearance: none;
   margin-top: -8px;
   background-color: #b3b3b3; 
   width: 25px;
   height: 25px;
   border-radius: 50%;  
}
`;

const Volume = () => {
  const {
    state: { token },
  } = useStateProvider();

  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <Container>
      <input type="range" min={0} max={100} onMouseUp={(e) => setVolume(e)} />
    </Container>
  );
};

export default Volume;
