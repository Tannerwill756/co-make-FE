import { ADD_LIKE, REMOVE_LIKE } from "../actions/actions";

const initialState = {
  likes: [],
};

export const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIKE:
      return {
        ...state,
        likes: [...state.likes, action.payload],
      };
    case REMOVE_LIKE:
      //   state.likes.filter((num) => {
      //     if (num === action.payload) {
      //       const index = state.likes.indexOf(num);

      //       state.likes.splice(index, 1);
      //     } else {
      //       return state;
      //     }
      //   });
      return state;

    default:
      return state;
  }
};
