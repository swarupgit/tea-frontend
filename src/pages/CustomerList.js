import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import Table from "../components/UI/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  allCustomers,
  fetchCustomer,
  quoteHeaders,
} from "../store/quote-slice";
import NewQuote from "../components/Business/NewQuote";
import { isLoggedIn } from "../store/auth-slice";

export default function CustomerList() {
  const columns = useSelector(quoteHeaders);
  const customers = useSelector(allCustomers);
  const [addQuote, setAddQuote] = useState(false);
  const isUserLoggedIn = useSelector(isLoggedIn);

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

  return (
    <Fragment>
      {addQuote && isUserLoggedIn && <NewQuote onClose={hideNewQuoteHandler} />}
      <div className={`card overlay`}>
        <div className="card-header">
          Customer List
          <button
            className="theme-button"
            type="button"
            onClick={showAddQuoteHandler}
          >
            Add a New Customer
          </button>
        </div>
        <Table data={customers} columns={columns} filter="row" />
      </div>
    </Fragment>
  );
}
