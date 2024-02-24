import { Fragment } from "react";
import { Card } from "react-bootstrap";
import classes from "./BusinessStatistic.module.css";

const BusinessStatistic = () => {
  return (
    <Fragment>
      <div className={`row ${classes.cardRow}`}>
        <div className="col-xl-3 col-lg-6">
          <div className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    Total Green Leaves
                  </h5>
                  <span className="h2 font-weight-bold mb-0">₹ 350,897</span>
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
                {/* <span className="text-success mr-2">
                  <i className="fa fa-arrow-up"></i> 3.48%
                </span>
                <span className="text-nowrap">Since last month</span> */}
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    This Month
                  </h5>
                  <span className="h2 font-weight-bold mb-0">₹ 2,356</span>
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
                {/* <span className="text-danger mr-2">
                  <i className="fas fa-arrow-down"></i> 3.48%
                </span>
                <span className="text-nowrap">Since last month</span> */}
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    Today
                  </h5>
                  <span className="h2 font-weight-bold mb-0">₹ 924</span>
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
                {/* <span className="text-warning mr-2">
                  <i className="fas fa-arrow-down"></i> 1.10%
                </span>
                <span className="text-nowrap">Since yesterday</span> */}
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className={`card card-stats mb-4 mb-xl-0 ${classes.stats}`}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    New Users
                  </h5>
                  <span className="h2 font-weight-bold mb-0">49,65%</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                    <i className="fas fa-percent"></i>
                  </div>
                </div>
              </div>
              <p
                className={`mt-3 mb-0 text-muted text-sm ${classes.cardSpace}`}
              >
                {/* <span className="text-success mr-2">
                  <i className="fas fa-arrow-up"></i> 12%
                </span>
                <span className="text-nowrap">Since last month</span> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BusinessStatistic;
