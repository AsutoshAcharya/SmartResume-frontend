import React, { createContext, useContext, useReducer } from "react";
import { CounterCotextType, CounterManager } from "./type";
import counterReducer from "./counterReducer";

const CounterContext = createContext<CounterCotextType>(
  {} as CounterCotextType
);

export const CounterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialManager: CounterManager = {
    value: 0,
  };
  const [manager, dispatch] = useReducer(counterReducer, initialManager);
  return (
    <CounterContext.Provider value={{ manager, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounterContext = useContext(CounterContext);
