import { createContext, useReducer } from "react";

export const UsersContext = createContext();

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        users: action.payload,
      };
    case "DELETE_USER":
      return {
        users: state.users.filter((u) => u._id !== action.payload._id)
      };
    case "SEARCH_USERS":
      return {
        users: state.users,
        isSearching: action.payload.length > 0 ? true : false,
        foundUsers: state.users.filter(u => {
          return u.username.toLowerCase().search(action.payload.toLowerCase()) !== -1
        })
      }
    default:
      return state;
  }
};

export const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, {
    users: null,
  });
  console.log(state);
  return (
    <UsersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
