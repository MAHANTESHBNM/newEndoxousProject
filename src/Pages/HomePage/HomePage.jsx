import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../Components/SideBar/Loader/Loader";
import { MdDelete } from "react-icons/md";
import {
  addBanner,
  clearErrors,
  deleteBanner,
  getAllBanners,
} from "../../redux/actions/bannerAction";
import { toast } from "react-toastify";
import {
  ADD_BANNER_RESET,
  DELETE_BANNER_RESET,
} from "../../constants/bannerConstants";
import { getAllOrders } from "../../redux/actions/orderAction";
import { getAllNurseries } from "../../redux/actions/nurseryAction";
import { getAllNotifications } from "../../redux/actions/notificationAction";

const HomePage = ({ toggle, setRestrictSide }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  // -------------------------------- Selctors --------------------------------
  const { error, loading, banners } = useSelector((state) => state.banners);

  const {
    error: addBannerError,
    message,
    success,
  } = useSelector((state) => state.addBanner);

  const {
    error: deleteBannerError,
    message: deleteMessge,
    isDeleted,
  } = useSelector((state) => state.deleteBanner);

  const { error: ordersError, orders } = useSelector(
    (state) => state.allOrders
  );

  const { error: nurseriesError, nurseries } = useSelector(
    (state) => state.allNurseries
  );

  const { error: NotificationError, notifications } = useSelector(
    (state) => state.allNotifications
  );

  // ----------------------------------------------------------------//

  const pendingOrders =
    orders && orders.filter((order) => order.orderStatus === "pending");

  const pendingOrdersWorth =
    pendingOrders &&
    pendingOrders.reduce((acc, item) => acc + item.totalPrice, 0);

  const ordersToShip =
    orders &&
    orders.filter(
      (order) =>
        order.orderStatus !== "Shipped" &&
        order.orderStatus !== "Cancelled" &&
        order.orderStatus !== "Delivered"
    );

  const top5Nuseries = nurseries && nurseries.slice(0, 5);

  // -------------------------------- UseEffect --------------------------------

  useEffect(() => {
    setRestrictSide(false);
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (addBannerError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (deleteBannerError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (ordersError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (nurseriesError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(message);
      setAvatarPreview("");
      setAvatar("");
      dispatch({ type: ADD_BANNER_RESET });
    }
    if (isDeleted) {
      toast.success(deleteMessge);
      dispatch({ type: DELETE_BANNER_RESET });
    }
    dispatch(getAllNotifications());
    dispatch(getAllBanners());
    dispatch(getAllOrders());
    dispatch(getAllNurseries());
  }, [
    dispatch,
    error,
    addBannerError,
    message,
    success,
    navigate,
    deleteBannerError,
    deleteMessge,
    isDeleted,
    ordersError,
    nurseriesError,
  ]);

  const bannerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createBannerSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("avatar", avatar);
    dispatch(addBanner(myForm));
  };

  // Delete Banner
  const bannerDeleteHandler = (id) => {
    dispatch(deleteBanner(id));
  };

  const notificationHandler = () => {
    navigate(`/notification/new`);
  };

  const [sales, setSales] = useState(orders);
  const [totalSales, setTotalSales] = useState();

  useEffect(() => {
    setTotalSales(sales.reduce((acc, item) => acc + item.totalPrice, 0));
  }, [sales]);

  // -------------------------------- Calculating Date --------------------------------

  // Today
  let currentDate = new Date().toJSON().slice(0, 10);

  // Yesterday
  const getYesterdayDate = () => {
    const now = new Date();
    return new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
      .toJSON()
      .slice(0, 10);
  };
  const yesterday = getYesterdayDate();

  // -------------------------------- Filtering --------------------------------
  const todayOrders =
    orders &&
    orders.filter((order) => order.createdAt.slice(0, 10) === currentDate);

  const yesterdayOrders =
    orders &&
    orders.filter((order) => order.createdAt.slice(0, 10) === yesterday);

  const daySelect = (e) => {
    let item = parseInt(e.target.value);
    if (item === 1) {
      setSales(orders);
    } else if (item === 2) {
      setSales(todayOrders);
    } else if (item === 3) {
      setSales(yesterdayOrders);
    }
  };

  return (
    <div className="section2 ">
      <nav
        className="s2-navabar navbar navbar-expand-lg "
        style={{ backgroundColor: "white" }}
      >
        <div className="container-fluid px-5">
          <button
            onClick={() => toggle()}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <NavLink className="fw-bold navbar-brand" to="/">
            Home
          </NavLink>
          <button
            className="btn btn-outline-success btnround"
            type="submit"
          ></button>
        </div>
        <hr />
      </nav>
      <div className="overviewText d-flex justify-content-between align-items-center pe-2 pb-2 pt-4">
        <div
          className="d-flex justify-content-between align-items-center px-5"
          style={{ width: "24rem" }}
        >
          <p className="m-0" style={{ fontSize: "1.2rem" }}>
            Overview
          </p>
          <p className="m-0" style={{ fontSize: ".8rem", opacity: ".8" }}>
            View all
          </p>
        </div>
        <div className="homePageSelector">
          <div className="d-flex px-4 me-2">
            <div className="p2-selection mx-2">
              <select
                // selected={saleDate}
                className="form-select-sm"
                aria-label="Default select example"
                onChange={daySelect}
              >
                <option value="1">Lifetime</option>
                <option value="2">Today</option>
                <option value="3">Yesterday</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div
            className="topTableContainer-HomePage container-lg d-flex justify-content-between px-5 py-1"
            style={{ width: "100%" }}
          >
            <table
              className="table table-borderless me-4"
              style={{
                width: "29rem",
                height: "14rem",
                borderRadius: ".5rem",
                backgroundColor: "white",
                boxShadow: "3px 3px 5px #546b910f",
              }}
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{
                      opacity: ".9",
                      fontWeight: "500",
                      paddingBottom: ".7rem",
                      paddingTop: "1.1rem",
                    }}
                  ></th>
                  <th
                    scope="col"
                    style={{
                      opacity: ".9",
                      fontWeight: "500",
                      paddingBottom: ".7rem",
                      paddingTop: "1.1rem",
                    }}
                  >
                    TOP NURSERIES
                  </th>
                  <th
                    scope="col"
                    style={{
                      opacity: ".9",
                      fontWeight: "500",
                      paddingBottom: ".7rem",
                      paddingTop: "1.1rem",
                    }}
                  >
                    SALES
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ color: "#000", opacity: ".5" }}>
                  {top5Nuseries &&
                    top5Nuseries.map((nursery, index) => (
                      <>
                        <td scope="row"></td>
                        <td key={index}>
                          {index + 1}. &nbsp; &nbsp; {nursery.name}
                        </td>
                        <td>60,000</td>
                      </>
                    ))}
                </tr>
              </tbody>
            </table>
            <div
              className="container-sm px-4"
              style={{
                width: "100%",
                boxShadow: "3px 3px 5px #546b910f",
                backgroundColor: "white",
                borderRadius: ".5rem",
                height: "14rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    opacity: ".9",
                    fontWeight: "500",
                    fontWeight: 500,
                    paddingBottom: ".7rem",
                    paddingTop: "1.1rem",
                    marginBottom: ".5rem",
                  }}
                >
                  TOTAL SALES
                </p>
                <h4 style={{ fontWeight: 700, fontSize: "1.3rem" }}>
                  Rs {Math.round(totalSales)}
                </h4>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: ".8rem",
                    opacity: ".8",
                    paddingBottom: ".7rem",
                    paddingTop: "1.1rem",
                    marginBottom: ".5rem",
                  }}
                >
                  Lifetime
                </p>
                <h4 style={{ fontWeight: 700, fontSize: "1.3rem" }}>
                  {sales && sales.length}
                </h4>
              </div>
            </div>
          </div>
          <div className="lastContainerHolder container-lg d-flex justify-content-between px-5 py-4">
            <div
              className="tableAndBannerHolder container-md p-0"
              style={{ width: "63%" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Banners</h5>
                {/* <button type="file" className="btn btn py-0">
              + Add new
            </button> */}
                <form
                  action=""
                  className="createproductForm"
                  encType="multipart/form-data"
                  onSubmit={createBannerSubmitHandler}
                >
                  <div>
                    <input
                      className="d-none"
                      id="file"
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={bannerDataChange}
                    />
                    {avatar !== "" ? (
                      <Fragment>
                        <button type="submit">Save</button>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <label
                          htmlFor="file"
                          className="btn btn py-0"
                          style={{ fontSize: ".8rem", opacity: ".7" }}
                        >
                          + Add new
                        </label>
                      </Fragment>
                    )}
                  </div>
                </form>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: ".5rem",
                  overflowX: "auto",
                  boxShadow: "3px 3px 5px #546b910f",
                }}
                className="container-sm d-flex justify-content-between py-2"
              >
                {avatarPreview ? (
                  <div
                    className="card mx-1"
                    style={{ width: "10rem", height: "5rem" }}
                  >
                    <img
                      src={avatarPreview}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                ) : (
                  ""
                )}

                {banners &&
                  banners?.map((banner, index) => (
                    <div className="bannerContainer" key={index}>
                      <div
                        className="card mx-1"
                        style={{
                          width: "10rem",
                          height: "5rem",
                          overflow: "hidden",
                          borderRadius: ".4rem",
                        }}
                      >
                        <img
                          style={{ borderRadius: ".4rem" }}
                          src={banner.url}
                          className="bg-primary img-fluid rounded-start h-100"
                          alt="..."
                        />
                        <MdDelete
                          style={{
                            position: "absolute",
                            right: ".3rem",
                            top: ".3rem",
                            color: "#dc3545",
                            cursor: "pointer",
                          }}
                          onClick={() => bannerDeleteHandler(banner._id)}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="container-md px-0 py-4" style={{ width: "100%" }}>
                <div className="d-flex justify-content-between align-items-center container-md p-0 my-2">
                  <h5>Notifications</h5>
                  <button
                    type="button"
                    className="btn btn py-0"
                    style={{ fontSize: ".8rem", opacity: ".7" }}
                    onClick={notificationHandler}
                  >
                    Push new notification
                  </button>
                </div>
                <div className="s2-table subTableForAll">
                  <table
                    className="table table-borderless"
                    style={{
                      overflow: "hidden",
                      width: "100%",
                      borderRadius: ".5rem",
                      backgroundColor: "white",
                    }}
                  >
                    <thead style={{ backgroundColor: "#eaeaea" }}>
                      <tr>
                        <th scope="col" style={{ border: "none" }}></th>
                        <th scope="col" style={{ fontSize: ".8rem" }}>
                          S.no
                        </th>
                        <th scope="col" style={{ fontSize: ".8rem" }}>
                          Title
                        </th>
                        <th scope="col" style={{ fontSize: ".8rem" }}>
                          Message
                        </th>
                        <th scope="col" style={{ fontSize: ".8rem" }}>
                          Sent to
                        </th>
                        <th scope="col" style={{ border: "none" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifications &&
                        notifications.map((item, index) => (
                          <tr key={index}>
                            <th scope="col" style={{ border: "none" }}></th>
                            <th
                              scope="row"
                              className="text-success"
                              style={{ fontSize: ".8rem", opacity: ".7" }}
                            >
                              {index + 1}
                            </th>
                            <td style={{ fontSize: ".8rem", opacity: ".7" }}>
                              {item?.title}
                            </td>
                            <td
                              className="text-wrap w-50"
                              style={{ fontSize: ".8rem", opacity: ".7" }}
                            >
                              {item?.message}
                            </td>
                            <td
                              className="text-success"
                              style={{ fontSize: ".8rem", opacity: ".7" }}
                            >
                              {item?.sendTo}
                            </td>
                            <th scope="col" style={{ border: "none" }}></th>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              className="orderSummaryContainer container d-flex flex-column justify-content-start py-0 px-2"
              style={{ width: "35%" }}
            >
              <div className="pt-1">
                <h5>Orders</h5>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: ".5rem",
                  width: "100%",
                  height: "5.6rem",
                  boxShadow: "3px 3px 5px #546b910f",
                }}
                className="container-sm d-flex justify-content-between mt-1 px-4"
              >
                <p className="d-flex align-items-end">
                  {pendingOrders && pendingOrders.length} Pending orders
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: ".5rem",
                  width: "100%",
                  height: "5.6rem",
                  boxShadow: "3px 3px 5px #546b910f",
                }}
                className="container-sm d-flex justify-content-between mt-4 px-4"
              >
                <p className="d-flex align-items-end">
                  {pendingOrders && pendingOrders.length} Pending order worth Rs{" "}
                  {pendingOrdersWorth && pendingOrdersWorth}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: ".5rem",
                  width: "100%",
                  height: "5.6rem",
                  boxShadow: "3px 3px 5px #546b910f",
                }}
                className="container-sm d-flex justify-content-between mt-4 px-4"
              >
                <p className="d-flex align-items-end">
                  {ordersToShip && ordersToShip.length} order to ship
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: ".5rem",
                  width: "100%",
                  height: "5.6rem",
                  boxShadow: "3px 3px 5px #546b910f",
                }}
                className="container-sm d-flex justify-content-between mt-4 px-4"
              >
                <p className="d-flex align-items-end">
                  {pendingOrders && pendingOrders.length} Pending orders
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
