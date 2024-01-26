import { Fragment, useRef, useState } from 'react';
import classes from './PartsItemForm.module.css';
import Input from '../../UI/Input';

const PartsItemFrom = props => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber >5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    };

    const addButton = <Fragment>
        {props.canSell && <button >+ Add</button>}
        {!(props.canSell) && <button type="button" disabled>+ Add</button>}
    </Fragment>
    return <form className={classes.form} onSubmit={submitHandler}>
        <Input 
            label="No(s)" 
            ref={amountInputRef}
            input={{
            id: 'amount',
            type: 'number',
            min: '1',
            max: `${props.stock}`,
            step: '1',
            defaultValue: '1'
        }}/>
        {addButton}
        {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
};

export default PartsItemFrom;