"use client";

import { ReactFlowInstance } from "@xyflow/react";
import { createContext, ReactNode, useContext, useReducer } from "react";

interface State {
  editor: ReactFlowInstance | null;
}

interface Action {
  type: "SET_EDITOR";
  payload?: ReactFlowInstance;
}

interface ContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initialState: State = {
  editor: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_EDITOR":
      return {
        ...state,
        editor: action.payload || null,
      };
    default:
      return state;
  }
}

const AppContext = createContext<ContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
