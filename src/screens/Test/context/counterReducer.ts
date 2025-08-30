import { CounterManager, CounterManagerAction } from "./type";

function counterReducer(
  manager: CounterManager,
  action: CounterManagerAction
): CounterManager {
  switch (action.type) {
    case "increment":
      return { ...manager, value: manager.value + 1 };
    case "decrement":
      return { ...manager, value: manager.value - 1 };
    case "incrementByValue":
      return { ...manager, value: manager.value + action.payload };
    default:
      return { ...manager, value: manager.value + 1 };
  }
}

export default counterReducer;
