import { reducerCase } from "./constants";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylist: null,
  selectedPlaylistId: "1nNH6QUhKtlu7X7TraYIRr",
  currentlyPlaying: null,
  playerState: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCase.SET_Token:
      return {
        ...state,
        token: action.payload,
      };
    case reducerCase.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
      };

    case reducerCase.SET_USERINFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case reducerCase.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.payload,
      };
    case reducerCase.SET_PLAYING:
      return {
        ...state,
        currentlyPlaying: action.payload,
      };
    case reducerCase.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.payload,
      };
    case reducerCase.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
