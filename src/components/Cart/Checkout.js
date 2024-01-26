import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    const phoneInputRef = useRef();

    const isValidInput = value => (value !== '') && (value.length >= 3);
    const isValidPhone = value => value.length === 10;

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        address: true,
        postal: true,
        city: true,
        phone: true
    });
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    const nameIsValid = isValidInput(enteredName);
    const addressIsValid = isValidInput(enteredAddress);
    const postalIsValid = isValidInput(enteredPostal);
    const cityIsValid = isValidInput(enteredCity);
    const phoneIsValid = isValidInput(enteredPhone) && isValidPhone(enteredPhone);

    setFormInputsValidity({
        name: nameIsValid,
        address: addressIsValid,
        postal: postalIsValid,
        city: cityIsValid,
        phone: phoneIsValid
    });

    const formIsValid = nameIsValid && addressIsValid && postalIsValid && cityIsValid && phoneIsValid;

    if(!formIsValid) {
        return;
    }

    props.onConfirm({
        name: enteredName,
        address: enteredAddress,
        postal: enteredPostal,
        city: enteredCity,
        phone: enteredPhone
    });
  };

  const nameClass = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
  const addressClass = `${classes.control} ${formInputsValidity.address ? '' : classes.invalid}`;
  const postalClass = `${classes.control} ${formInputsValidity.postal ? '' : classes.invalid}`;
  const cityClass = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;
  const phoneClass = `${classes.control} ${formInputsValidity.phone ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
        <section>
            <h3 className={classes.heading}>Customer Details</h3>
            <div className={nameClass}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} autoComplete='off'/>
                {!formInputsValidity.name && <p>Enter a valid name!</p>}
            </div>
            <div className={addressClass}>
                <label htmlFor='address'>Address</label>
                <input type='text' id='address' ref={addressInputRef} autoComplete='off'/>
                {!formInputsValidity.address && <p>Enter a valid address!</p>}
            </div>
            <div className={postalClass}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} autoComplete='off'/>
                {!formInputsValidity.postal && <p>Enter a valid postal code!</p>}
            </div>
            <div className={cityClass}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} autoComplete='off'/>
                {!formInputsValidity.city && <p>Enter a valid city!</p>}
            </div>
            <div className={phoneClass}>
                <label htmlFor='phone'>Contact number</label>
                <input type='text' id='phone' maxLength={10} ref={phoneInputRef} autoComplete='off'/>
                {!formInputsValidity.phone && <p>Enter a valid contact number!</p>}
            </div>
        </section>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;