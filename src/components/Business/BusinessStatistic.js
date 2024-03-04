import { Fragment } from "react";
import { Card } from "react-bootstrap";
import classes from "./BusinessStatistic.module.css";
import { allOrders } from "../../store/order-slice";
import { useSelector } from "react-redux";

const BusinessStatistic = () => {  
  const orders = useSelector(allOrders);
  const totalNetLeaf = orders.reduce((carry, item) => {
    return item.netLeafKgs ? carry + parseFloat(item.netLeafKgs) : carry + 0;
  }, 0).toFixed(2);
  const totalDebitAmount = orders
    .reduce((carry, item) => {
      return item.debitAmount > 0 ? carry + parseFloat(item.debitAmount) : carry + 0;
    }, 0)
    .toFixed(2);
  const totalCreditAmount = orders
    .reduce((carry, item) => {
      return item.creditAmount > 0 ? carry + parseFloat(item.creditAmount) : carry + 0;
    }, 0)
    .toFixed(2);
  const monthDebitAmount = orders
    .reduce((carry, item) => {
      return (new Date(item.transactionDate)).getMonth() === (new Date()).getMonth() && item.debitAmount > 0 ? carry + parseFloat(item.debitAmount) : carry + 0;
    }, 0)
    .toFixed(2);
  const monthCreditAmount = orders
    .reduce((carry, item) => {
      return (new Date(item.transactionDate)).getMonth() === (new Date()).getMonth() && item.creditAmount > 0 ? carry + parseFloat(item.creditAmount) : carry + 0;
    }, 0)
    .toFixed(2);
  const todayDebitAmount = orders
    .reduce((carry, item) => {
      return (new Date(item.transactionDate)).getDate() === (new Date()).getDate() && item.debitAmount > 0 ? carry + parseFloat(item.debitAmount) : carry + 0;
    }, 0)
    .toFixed(2);
  const todayCreditAmount = orders
    .reduce((carry, item) => {
      return (new Date(item.transactionDate)).getDate() === (new Date()).getDate() && item.creditAmount > 0 ? carry + parseFloat(item.creditAmount) : carry + 0;
    }, 0)
    .toFixed(2);
  return (
    <Fragment>
      <div className={`row ${classes.cardRow}`}>
        <div className="col-xl-3 col-lg-6 mb-2">
          <div className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    Total Green Leaves
                  </h5>
                  <span className="h2 font-weight-bold mb-0">{totalNetLeaf} KG</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    {/* <i className="pi pi-chart-bar" style={{ fontSize: '2.5rem' }}></i> */}
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              >
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 mb-2">
          <div className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    Total Credit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">₹ {totalCreditAmount}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    {/* <i className="pi pi-chart-bar" style={{ fontSize: '2.5rem' }}></i> */}
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              >
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 mb-2">
          <div className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    Total Debit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">₹ {totalDebitAmount}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    {/* <i className="pi pi-chart-bar" style={{ fontSize: '2.5rem' }}></i> */}
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              >
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 mb-2">
          <div className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    This Month's Credit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">₹ {monthCreditAmount}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                    <i className="fas fa-chart-pie"></i>
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              >
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 mb-2">
          <div className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    This Month's Debit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">₹ {monthDebitAmount}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                    <i className="fas fa-chart-pie"></i>
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              >
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 mb-2">
          <div className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    Today's Credit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">₹ {todayCreditAmount}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              >
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 mb-2">
          <div className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    Today's Debit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">₹ {todayDebitAmount}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              >
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BusinessStatistic;
