export type CounterManager = {
  value: number;
};

export type CounterManagerAction =
  | {
      type: "increment";
    }
  | {
      type: "decrement";
    }
  | {
      type: "incrementByValue";
      payload: number;
    };

export type CounterCotextType = {
  manager: CounterManager;
  dispatch: React.Dispatch<CounterManagerAction>;
};
