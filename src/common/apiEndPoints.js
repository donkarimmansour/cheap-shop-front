
const Host = {
  ROOT: "https://ectestone.herokuapp.com",
  PREFIX: "/v1/api", 
};

const ApiEndpoints = {

  AuthEndpoints: {
    route: `${Host.PREFIX}/user`,
    signup: `/signup`, 
    list: `/list`, 
    login: `/login`, 
    forgot: `/forgot-password`, 
    confirm: `/confirm-email`, 
    edit: `/edit`, 
    address: `/address`, 
    image: `/image`, 
  },
  ProductsEndpoints: {
    route: `${Host.PREFIX}/products`,
    list: `/list`,
    listtab: `/listtab`,
    create: `/create`,
    edit: `/edit/:id`,
    delete: `/delete/:id`,
    duplicate: `/duplicate/:id`,
    review: `/review/:id`,
    distinct: `/distinct`,
    count: `/count`,
    views: `/views`,

  },
  OrdersEndpoints: {
    route: `${Host.PREFIX}/orders`,
    list: `/list`,
    create: `/create`,
    calculate: `/calculate`,
    edit: `/edit`,
    delete: `/delete`,
    duplicate: `/duplicate`,
  },
  MainEndpoints: {
    route: `${Host.PREFIX}/main`,
    list: `/list`,
    create: `/create`,
    edit: `/edit`,
    delete: `/delete`,
    duplicate: `/duplicate`,
  },
  WishlistEndpoints: {
    route: `${Host.PREFIX}/wishlist`,
    list: `/list`,
    create: `/create`,
    delete: `/delete`,
  },
  FileEndpoints: {
    route: `${Host.PREFIX}/file`,
    getSingleImageView: `/get-single-image/:id/view`,
    getSingleImageDownload: `/get-single-image/:id/download`,
    createSingleImage: `/create-single-image`,
    createMultipleImage: `/create-multiple-image`, 
  },
  SubscribeEndpoints: {
    route: `${Host.PREFIX}/subscribe`,
    list: `/list`,
    create: `/create`
  },
  ContactEndpoints: {
    route: `${Host.PREFIX}/contact`,
    list: `/list`,
    create: `/create`
  },
};
 
export {ApiEndpoints , Host}