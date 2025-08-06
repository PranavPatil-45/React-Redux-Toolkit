import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add , remove} from '../features/todoSlice';

function TodoComponent() {
    const [valueAdd, setvalueAdd] = useState('');
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.value);

    const handleAddTodo = () => {
        if (valueAdd.trim()) {
            dispatch(add(valueAdd));
            setvalueAdd('');
        }
    };

    return (
        <div>
            <h2>Todos:</h2>

            <div>
                <input
                    type="text"
                    value={valueAdd}
                    onChange={(e) => setvalueAdd(e.target.value)}
                />
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>

            <ul>
                {todos.map((item, i) => (
                    <li key={i}>
                        {item.title} - {item.status ? 'Completed' : 'In Completed'}
                         <button className="delete-btn" onClick={() => dispatch(remove(item.title))}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoComponent;