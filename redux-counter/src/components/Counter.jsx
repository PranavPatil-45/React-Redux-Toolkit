
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/counterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+1 Increament </button>
      <button onClick={() => dispatch(decrement())}>-1 Decreament</button>
    </div>
  );
}