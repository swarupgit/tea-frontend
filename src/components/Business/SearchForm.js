import { useRef } from 'react';
import classes from './SearchForm.module.css';

const SearchFrom = props => {
    const searchInputRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredText = searchInputRef.current.value;
        props.search(enteredText);
    };

    const keyupHandler = (event) => {
        props.search(event.target.value);
    };
    return (
        <form onSubmit={submitHandler}>
            <input 
                className={classes['text--input']} 
                onKeyUp={keyupHandler} 
                ref={searchInputRef} 
                placeholder='Search Items...'
            />
        </form>
    );
};

export default SearchFrom;