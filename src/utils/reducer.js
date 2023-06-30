import { reducerCase } from "./constants";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCase.SET_Token:
      console.log(action.payload);
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
      return{
        ...state,
        userInfo: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
