import { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import classes from "./BusinessStatistic.module.css";
import { allOrders } from "../../store/order-slice";
import { useSelector } from "react-redux";
import { allCustomers } from "../../store/quote-slice";
import Link from "next/link";

const BusinessStatistic = () => {
  const orders = useSelector(allOrders);
  const customers = useSelector(allCustomers);
  const monthList = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [yearList, setYearList] = useState([new Date().getFullYear()]);
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    const list = [...yearList];
    orders.forEach((order) => {
      if(!yearList.includes(new Date(order.transactionDate).getFullYear())) {
        list.push(new Date(order.transactionDate).getFullYear());
      }
    })
    setYearList(list);

  }, [])
  const totalNetLeaf = orders
    .reduce((carry, item) => {
      return item.netLeafKgs ? carry + parseFloat(item.netLeafKgs) : carry + 0;
    }, 0)
    .toFixed(2);
  const totalDebitAmount = orders
    .reduce((carry, item) => {
      return item.debitAmount > 0
        ? carry + parseFloat(item.debitAmount)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const totalCreditAmount = orders
    .reduce((carry, item) => {
      return item.creditAmount > 0
        ? carry + parseFloat(item.creditAmount)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const monthNetLeaf = orders
    .reduce((carry, item) => {
      const tmonth = `${new Date(item.transactionDate).getMonth()}${new Date(
        item.transactionDate
      ).getFullYear()}`;
      const month = `${new Date().getMonth()}${new Date().getFullYear()}`;
      return tmonth === month && item.netLeafKgs
        ? carry + parseFloat(item.netLeafKgs)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const monthDebitAmount = orders
    .reduce((carry, item) => {
      const tmonth = `${new Date(item.transactionDate).getMonth()}${new Date(
        item.transactionDate
      ).getFullYear()}`;
      const month = `${new Date().getMonth()}${new Date().getFullYear()}`;
      return tmonth === month && item.debitAmount > 0
        ? carry + parseFloat(item.debitAmount)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const monthCreditAmount = orders
    .reduce((carry, item) => {
      const tmonth = `${new Date(item.transactionDate).getMonth()}${new Date(
        item.transactionDate
      ).getFullYear()}`;
      const month = `${new Date().getMonth()}${new Date().getFullYear()}`;
      return tmonth === month && item.creditAmount > 0
        ? carry + parseFloat(item.creditAmount)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const todayNetLeaf = orders
    .reduce((carry, item) => {
      const tday = `${new Date(item.transactionDate).getDate()}${new Date(
        item.transactionDate
      ).getMonth()}${new Date(item.transactionDate).getFullYear()}`;
      const day = `${new Date().getDate()}${new Date().getMonth()}${new Date().getFullYear()}`;
      return tday === day && item.netLeafKgs
        ? carry + parseFloat(item.netLeafKgs)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const todayDebitAmount = orders
    .reduce((carry, item) => {
      const tday = `${new Date(item.transactionDate).getDate()}${new Date(
        item.transactionDate
      ).getMonth()}${new Date(item.transactionDate).getFullYear()}`;
      const day = `${new Date().getDate()}${new Date().getMonth()}${new Date().getFullYear()}`;
      return tday === day && item.debitAmount > 0
        ? carry + parseFloat(item.debitAmount)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const todayCreditAmount = orders
    .reduce((carry, item) => {
      const tday = `${new Date(item.transactionDate).getDate()}${new Date(
        item.transactionDate
      ).getMonth()}${new Date(item.transactionDate).getFullYear()}`;
      const day = `${new Date().getDate()}${new Date().getMonth()}${new Date().getFullYear()}`;
      return tday === day && item.creditAmount > 0
        ? carry + parseFloat(item.creditAmount)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const monthYearNetLeaf = orders
    .reduce((carry, item) => {
      const tmonth = `${new Date(item.transactionDate).getMonth()}${new Date(
        item.transactionDate
      ).getFullYear()}`;
      const month = `${selectedMonth}${year}`;
      return tmonth === month && item.netLeafKgs
        ? carry + parseFloat(item.netLeafKgs)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const monthYearDebitAmount = orders
    .reduce((carry, item) => {
      const tmonth = `${new Date(item.transactionDate).getMonth()}${new Date(
        item.transactionDate
      ).getFullYear()}`;
      const month = `${selectedMonth}${year}`;
      return tmonth === month && item.debitAmount > 0
        ? carry + parseFloat(item.debitAmount)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const monthYearCreditAmount = orders
    .reduce((carry, item) => {
      const tmonth = `${new Date(item.transactionDate).getMonth()}${new Date(
        item.transactionDate
      ).getFullYear()}`;
      const month = `${selectedMonth}${year}`;
      return tmonth === month && item.creditAmount > 0
        ? carry + parseFloat(item.creditAmount)
        : carry + 0;
    }, 0)
    .toFixed(2);
  const handleClick = () => {
    localStorage.setItem('month', selectedMonth);
    localStorage.setItem('year', year);
  }
  let top1 = {
    _id: "",
    name: "",
    count: 0,
  };
  let top2 = {
    _id: "",
    name: "",
    count: 0,
  };
  let top3 = {
    _id: "",
    name: "",
    count: 0,
  };
  if (orders.length) {
    let maxCustomer = [];
    orders.forEach((d, i) => {
      if (d.customerId._id in maxCustomer) {
        maxCustomer[d.customerId._id]["count"] = ++maxCustomer[
          d.customerId._id
        ]["count"];
        maxCustomer[d.customerId._id]["leaf"] = parseFloat(
          parseFloat(maxCustomer[d.customerId._id]["leaf"]) +
            (d.netLeafKgs ? parseFloat(d.netLeafKgs) : 0)
        );
      } else {
        maxCustomer[d.customerId._id] = {
          _id: d.customerId._id,
          name: d.customerId.name,
          count: 1,
          leaf: d.netLeafKgs ? parseFloat(d.netLeafKgs) : 0,
        };
      }
    });
    maxCustomer = Object.values(maxCustomer);
    console.log(maxCustomer, "customer after");
    if (maxCustomer.length) {
      top1 = { ...maxCustomer[0] };
      maxCustomer.forEach((c, i) => {
        if (parseFloat(c.leaf) > parseFloat(top1.leaf)) {
          top1 = { ...c };
        }
      });
    }
    maxCustomer = maxCustomer.filter((i) => i._id !== top1._id);
    console.log(maxCustomer, "customer after1");
    if (maxCustomer.length) {
      top2 = { ...maxCustomer[0] };
      maxCustomer.forEach((c, i) => {
        if (parseFloat(c.leaf) > parseFloat(top2.leaf)) {
          top2 = { ...c };
        }
      });
    }
    maxCustomer = maxCustomer.filter((i) => i._id !== top2._id);
    console.log(maxCustomer, "customer after2");
    if (maxCustomer.length) {
      top3 = { ...maxCustomer[0] };
      maxCustomer.forEach((c, i) => {
        if (parseFloat(c.leaf) > parseFloat(top3.leaf)) {
          top3 = { ...c };
        }
      });
    }
    console.log(maxCustomer, "customer after3", new Date().getMonth());
  }
  return (
    <Fragment>
      <div className={`row ${classes.cardRow}`}>
        <div className="col-xl-4 col-lg-6 mb-2">
          <div
            className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}
            style={{ backgroundColor: "#FF0000" }}
          >
            <div className="card-body">
              <div className="row">
                <div className="col" style={{ textAlign: "center" }}>
                  <h5 className="card-title text-uppercase mb-0">
                    Total Green Leaves
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    {totalNetLeaf} KG
                  </span>
                  <h5 className="card-title text-uppercase mb-0">
                    Total Credit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    ₹ {totalCreditAmount}
                  </span>
                  <h5 className="card-title text-uppercase mb-0">
                    Total Debit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    ₹ {totalDebitAmount}
                  </span>
                  <h5 className="card-title text-uppercase mb-0">
                    Total Outstanding Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    ₹ {(totalCreditAmount - totalDebitAmount).toFixed(2)}
                  </span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    {/* <i className="pi pi-chart-bar" style={{ fontSize: '2.5rem' }}></i> */}
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              ></p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 mb-2">
          <div
            className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}
            style={{ backgroundColor: "#800080" }}
          >
            <div className="card-body">
              <div className="row">
                <div className="col" style={{ textAlign: "center" }}>
                  <h5 className="card-title text-uppercase mb-0">
                    This Month Green Leaves
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    {monthNetLeaf} KG
                  </span>
                  <h5 className="card-title text-uppercase mb-0">
                    This Month Credit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    ₹ {monthCreditAmount}
                  </span>
                  <h5 className="card-title text-uppercase mb-0">
                    This Month Debit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    ₹ {monthDebitAmount}
                  </span>
                  <h5 className="card-title text-uppercase mb-0">
                    This Month Outstanding Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    ₹ {(monthCreditAmount - monthDebitAmount).toFixed(2)}
                  </span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                    <i className="fas fa-chart-pie"></i>
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              ></p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 mb-2">
          <div
            className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}
            style={{ backgroundColor: "#0000FF" }}
          >
            <div className="card-body">
              <div className="row">
                <div className="col" style={{ textAlign: "center" }}>
                  <h5 className="card-title text-uppercase mb-0">
                    Today Green Leaves
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    {todayNetLeaf} KG
                  </span>
                  <h5 className="card-title text-uppercase mb-0">
                    Today Credit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    ₹ {todayCreditAmount}
                  </span>
                  <h5 className="card-title text-uppercase mb-0">
                    Today Debit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    ₹ {todayDebitAmount}
                  </span>
                  <h5 className="card-title text-uppercase mb-0">
                    Today Outstanding Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    ₹ {(todayCreditAmount - todayDebitAmount).toFixed(2)}
                  </span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    {/* <i className="pi pi-chart-bar" style={{ fontSize: '2.5rem' }}></i> */}
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              ></p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 mb-2">
          <div
            className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}
            style={{ backgroundColor: "#b3004d" }}
          >
            <div className="card-body">
              <div className="row">
                <div className="col" style={{ textAlign: "center" }}>
                  <h5 className="card-title text-uppercase mb-0">
                    Total Customer
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    {customers.length || 0}
                  </span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              ></p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 mb-2">
          <div
            className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}
            style={{ backgroundColor: "#00008B" }}
          >
            <div className="card-body">
              <div className="row">
                <div className="col" style={{ textAlign: "center" }}>
                  <h5 className="card-title text-uppercase mb-0">
                    Top Customers{" "}
                    <span className={classes.smallText}>(Upto 3)</span>
                  </h5>
                  {top1._id && (
                    <p className="h4 font-weight-bold mb-0">
                      1. {top1?.name || ""}{" "}
                      <span className={classes.smallText}>
                        ({top1?.leaf || 0}KG)
                      </span>
                    </p>
                  )}
                  {top2._id && (
                    <p className="h4 font-weight-bold mb-0">
                      2. {top2?.name || ""}{" "}
                      <span className={classes.smallText}>
                        ({top2?.leaf || 0}KG)
                      </span>
                    </p>
                  )}
                  {top3._id && (
                    <p className="h4 font-weight-bold mb-0">
                      3. {top3?.name || ""}{" "}
                      <span className={classes.smallText}>
                        ({top3?.leaf || 0}KG)
                      </span>
                    </p>
                  )}
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              ></p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 mb-2">
          <div
            className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}
            style={{ backgroundColor: "#D32D41" }}
          >
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <select onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth}>
                    {Object.values(monthList).map((i, k) => (
                      <option value={k} key={k}>{i}</option>
                    ))}
                  </select>
                  <select onChange={(e) => setYear(e.target.value)} value={year}>
                    {yearList.map((i, k) => (
                      <option value={i} key={k}>{i}</option>
                    ))}
                  </select>
                  <a href={`/month-wise?month=${selectedMonth}&year=${year}`} onClick={handleClick} style={{ float: "right", color: "#fff"}}>Take Print</a>
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ textAlign: "center" }}>
                  <h5 className="card-title text-uppercase mb-0">
                    {`${monthList[selectedMonth]}/${year}`}
                  </h5>
                  <h5 className="card-title text-uppercase mb-0">
                    Green Leaves
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    {monthYearNetLeaf} KG
                  </span>
                  <h5 className="card-title text-uppercase mb-0">
                    Credit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    ₹ {monthYearCreditAmount}
                  </span>
                  <h5 className="card-title text-uppercase mb-0">
                    Debit Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    ₹ {monthYearDebitAmount}
                  </span>
                  <h5 className="card-title text-uppercase mb-0">
                    Outstanding Amount
                  </h5>
                  <span className="h2 font-weight-bold mb-0">
                    ₹ {(monthYearCreditAmount - monthYearDebitAmount).toFixed(2)}
                  </span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    {/* <i className="pi pi-chart-bar" style={{ fontSize: '2.5rem' }}></i> */}
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BusinessStatistic;
