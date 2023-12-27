import ServicesSummary from "./ServicesSummary";
import AvailableServices from "./AvailableServices";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, token } from "../../store/auth-slice";
import { fetchItems } from "../../store/items-slice";
import BusinessStatistic from "./BusinessStatistic";

const Services = (props) => {
  const userToken = useSelector(token);
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(isLoggedIn);

  const loadData = async () => {
    await dispatch(fetchItems({ token: userToken }));
  };

  useEffect(() => {
    console.log("token->", userToken);
    loadData();
  }, [userToken]);
  return (
    <Fragment>
      {isUserLoggedIn && <BusinessStatistic/>}
      <ServicesSummary />
      {/* {isUserLoggedIn && <AvailableServices />} */}
    </Fragment>
  );
};

export default Services;
