import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove, update } from '../features/todoSlice';

function TodoComponent() {
  const [input, setinput] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.value);

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(add(input));
      setinput('');
    }
  };

  const handleUpdateTodo = (index, status) => {
    dispatch(update({ index, title: input || todos[index].title, status }));
    setinput('');
  };

  return (
    <div>
      <h2>Todos:</h2>

      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setinput(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <ul>
        {todos.map((item, i) => (
          <li key={i}>
            {item.title} - {item.status ? 'Completed' : 'Incomplete'}
            <button onClick={() => handleUpdateTodo(i, !item.status)}>Update</button>
            <button onClick={() => dispatch(remove(i))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoComponent;
