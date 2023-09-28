import { createContext, useReducer } from "react";

export const ContractsContext = createContext();

export const contractsReducer = (state, action) => {
  switch (action.type) {
    case "GET_CONTRACTS":
      return {
        contracts: action.payload,
      };
    case "DELETE_CONTRACT":
      return {
        contracts: state.contracts.filter((u) => u._id !== action.payload._id),
      };
    case "SEARCH_CONTRACTS":
      return {
        contracts: state.contracts,
        isSearching: action.payload.length > 0 ? true : false,
        foundContracts: state.contracts.filter(c => {
          return c.ref.toLowerCase().search(action.payload.toLowerCase()) !== -1
        })
      };
    default:
      return state;
  }
};

export const ContractsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contractsReducer, {
    contracts: null,
  });
    // console.log(state);
  return (
    <ContractsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ContractsContext.Provider>
  );
};
