import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import Table from "../components/UI/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  allCustomers,
  delCustomer,
  fetchCustomer,
  putCustomer,
  quoteHeaders,
} from "../store/quote-slice";
import NewQuote from "../components/Business/NewQuote";
import { isLoggedIn } from "../store/auth-slice";

export default function CustomerList() {
  const columns = useSelector(quoteHeaders);
  const customers = useSelector(allCustomers);
  const [addQuote, setAddQuote] = useState(false);
  const isUserLoggedIn = useSelector(isLoggedIn);
  const [editingItem, setEditingItem] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomer());
  }, []);

  const showAddQuoteHandler = () => {
    setAddQuote(true);
  };
  const hideNewQuoteHandler = () => {
    setAddQuote(false);
  };

  
  const editItem = (data, index) => {
    console.log(data, index);
    setAddQuote(true);
    setEditingItem(data);
    document.body.classList.add('hidden-overflow')
  };

  const updateCustomer = async (updatingItem) => {
    await dispatch(putCustomer(updatingItem));
    setAddQuote(false);
    document.body.classList.remove('hidden-overflow');
    dispatch(fetchCustomer());
  }

  const deleteItem = async (data, index) => {
    console.log(data, index, 'item');
    await dispatch(delCustomer(data.id));
    dispatch(fetchCustomer());
  };

  return (
    <Fragment>
      {addQuote && isUserLoggedIn && <NewQuote onClose={hideNewQuoteHandler} editingItem={editingItem} updateCustomer={updateCustomer}/>}
      <div className={`card overlay`}>
        <div className="card-header text-white">
          Customer List
          <button
            className="theme-button"
            type="button"
            onClick={showAddQuoteHandler}
          >
            Add a New Customer
          </button>
        </div>
        <Table data={customers} columns={columns} filter="row"  edit={true} delete={true} editItem={editItem} deleteItem={deleteItem} />
      </div>
    </Fragment>
  );
}
