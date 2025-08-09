import {createContext} from 'react';

const CounterContext = createContext();

function CounterProvider(){
    const [count, setCount] = useState(0);
    return(
        <CounterContext.Provider value={{ count, setCount }}>
        
        </CounterContext.Provider>
    )
}

export default CounterContext;
