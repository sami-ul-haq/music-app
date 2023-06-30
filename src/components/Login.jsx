import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 3rem;
`;
const Img = styled.img`
  height: 20vh;
`;

const Button = styled.button`
  padding: 1rem 5rem;
  border-radius: 5rem;
  border: none;
  background-color: black;
  color: #1db954;
  cursor: pointer;
  font-size: 1.4rem;
  &:hover {
    color: #000;
    background-color: #fff;
  }
`;
const Login = () => {
  const handleClick = () => {
    const clientId = "5340d1c4fa9f47f3a6557d43509ab4f0";
    const redirectUri = 'https://music-app-bytewise.netlify.app/';
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];
    
    window.location.href = `${apiUrl}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope.join("%20")}&show_dialog=true`;
  };

  return (
    <Container>
      <Img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify-logo"
      />
      <Button onClick={handleClick}>Connect</Button>
    </Container>
  );
};

export default Login;
