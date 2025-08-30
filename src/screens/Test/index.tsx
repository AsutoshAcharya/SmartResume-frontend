import {
  decrement,
  increment,
  incrementByValue,
} from "../../redux/counterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useCounterStore } from "./zustandStore";

const Test = () => {
  const counter = useAppSelector((state) => state.counter);
  //   const dispatch = useAppDispatch();
  const { value, increment, decrement, incrementByValue } = useCounterStore();
  return (
    <div className="w-screen h-screen bg-gray-800 text-white">
      <div> {counter.value} Redux counter value</div>

      <div> {value} Zustand counter value</div>
      <div className="flex flex-row gap-1">
        <button
          className="border-1"
          onClick={() => {
            // dispatch(increment());
            increment();
          }}
        >
          Increment
        </button>
        <button
          className="border-1"
          onClick={() => {
            //dispatch(decrement());
            decrement();
          }}
        >
          Decrement
        </button>
        <button
          className="border-1"
          onClick={() => {
            //dispatch(incrementByValue(5))
            incrementByValue(5);
          }}
        >
          Increment by 5
        </button>
      </div>
    </div>
  );
};

export default Test;
