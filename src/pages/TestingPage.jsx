import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../store/slicers/counterSlice";

function TestingPage() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h1>testing reduc</h1>
        <div style={{ padding: 20 }}>
          <h1>Count: {count}</h1>
          <button onClick={() => dispatch(increment())}>+1</button>
          <button onClick={() => dispatch(decrement())}>-1</button>
          <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
        </div>
      </div>
    </div>
  );
}

export default TestingPage;
