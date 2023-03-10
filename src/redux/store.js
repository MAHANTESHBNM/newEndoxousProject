import { configureStore } from "@reduxjs/toolkit";
import {
  addBannerReducer,
  allBannersReducer,
  deleteBannerReducer,
} from "./reducers/bannerReducer";
import {
  allCategoriesReducer,
  newCategoryReducer,
} from "./reducers/categoryReducer";
import {
  chartReducer,
  chartSalesReducer,
  ordersPerDayReducer,
  salePerDayReducer,
} from "./reducers/chartReducer";
import {
  allNotificationsReducer,
  sendNotificationReducer,
} from "./reducers/notificationReducer";
import { allNurseriesReducer } from "./reducers/nurseryReducer";
import {
  addNoteReducer,
  allOrdersReducer,
  deleteorderNoteReducer,
  orderDetailsReducer,
  orderReducer,
  usersOrdersReducer,
} from "./reducers/orderReducer";
import {
  newFAQReducer,
  newProductReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
} from "./reducers/productReducers";
import {
  allTicketsReducer,
  ordersTicketReducer,
  ticketActionsReducer,
} from "./reducers/ticketsReducer";
import {
  adminReducer,
  allUsersReducer,
  userDetailsReducer,
  userReducer,
  verifyUserReducer,
} from "./reducers/userReducer";

const Store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    product: productReducer,
    newProduct: newProductReducer,
    verifyUser: verifyUserReducer,
    addBanner: addBannerReducer,
    banners: allBannersReducer,
    deleteBanner: deleteBannerReducer,
    allOrders: allOrdersReducer,
    allNurseries: allNurseriesReducer,
    orderDetails: orderDetailsReducer,
    ordersTicket: ordersTicketReducer,
    allCategories: allCategoriesReducer,
    newCategory: newCategoryReducer,
    allUsers: allUsersReducer,
    order: orderReducer,
    chart: chartReducer,
    chartSales: chartSalesReducer,
    ordersPerDay: ordersPerDayReducer,
    salePerDay: salePerDayReducer,
    userDetails: userDetailsReducer,
    usersOrders: usersOrdersReducer,
    addNote: addNoteReducer,
    deleteorderNote: deleteorderNoteReducer,
    allTickets: allTicketsReducer,
    ticketActions: ticketActionsReducer,
    newFAQ: newFAQReducer,
    admin: adminReducer,
    sendNotification: sendNotificationReducer,
    allNotifications: allNotificationsReducer,

    // categoryDetails : categoryDetailsReducer,
    // category : categoryReducer,
    // forgotPassword : forgotPasswordReducer,
    // deleteCart : deleteCartItemReducer,
    // shippingInfo : saveShippingReducer,
    // shippingDetails : shippingDetails,
    // newOrder : newOrderReducer,
    // myOrders : myOrdersReducer,
    // orderDetails : orderDetailsReducer,
    // newReview : newReviewReducer,
    // productReviews : productReviewsReducer,
    // reviews : reviewReducer,

    // newWishlist :newWishlistReducer,
    // myWishlist : myWishlistReducer,
    // deleteWishlist : deleteWishlistItemReducer,
  },
});

export default Store;
