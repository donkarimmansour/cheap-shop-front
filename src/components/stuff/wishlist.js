import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { calculateRating, handleColor, handleSize, ImageLink } from '../../shared/funs';
import { get_products, set_product_id } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import myClassNames from 'classnames';
import { Link } from "react-router-dom";import { create_carts } from "../../redux/actions/carts";
import { delete_wishlist, get_wishlist } from "../../redux/actions/wishlist";
import { getLocalStorage } from "../../shared/localStorage";
import { getCookie} from "../../shared/cookie";
import { isAuthentication} from "../../shared/auth";

const Wishlist = (props) => {
    const { t } = useTranslation();

    const [Wishlist, setWishlist] = useState([])
    const limit = props.limit
    const skip = props.skip
    const sort = props.sort

    const dispatch = useDispatch()
    const { wishlist } = useSelector(state => state.wishlist)

    const authorization =  isAuthentication()  ? {"Authorization" : `bearer ${getCookie("token")}`} : [{_id : ""}]
    const userId = localStorage.getItem("user") ?  getLocalStorage("user") : [{_id : ""}] 

    useEffect(() => {
        dispatch(get_wishlist({ filter: {userId : userId._id}, limit, skip, sort , expend : 'productId' }))
    }, [dispatch])

    useEffect(() => {
        setWishlist(wishlist)
    }, [wishlist])

    const addToCart = (product) => {
       dispatch(create_carts(product))  
    }

    const removeFromWishList = (id) => {
        dispatch(delete_wishlist(id , authorization))
    }

    const quickView = (productId) => {
       dispatch(set_product_id(productId))
    }
 
    return ( 
        <Fragment>
            { Wishlist && wishlist && Wishlist.length > 0 &&   // <!-- New Wishlist Start -->

                <section className="section ec-new-product section-space-p">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-12 text-center">
                                <div className="section-title">
                                    <h2 className="ec-bg-title">{t("Wishlist")}</h2>
                                    <h2 className="ec-title">{t("Wishlist")}</h2>
                                    <p className="sub-title">{t("Browse The Collection of Top Wishlists")}</p>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            {/* <!-- New Wishlist Content --> */}

                            {Wishlist.map((wishlist, i) => {

                                return (

                                    <div key={i} className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 ec-product-content flipInY" >

                                        <div className="ec-product-inner">
                                            <div className="ec-pro-image-outer">


                                                <div className="ec-pro-image">
                                                    <Link to="/" className="image">
                                                        <img className="main-image" src={ImageLink(wishlist.productId.images.imagesUrl[0])} alt="Wishlist" />
                                                    </Link>

                                                    <span className="flags">
                                                        {wishlist.productId.stock == 0 && <span className="sale">{t("Sale")}</span>}
                                                        {wishlist.productId.condition == "new" && <span className="new">{t("New")}</span>}
                                                    </span>

                                                    {wishlist.productId.oldprice && <span className="percentage">{Math.ceil(wishlist.productId.price * (wishlist.productId.oldprice / 100))}%</span>}

                                                    <div className="ec-pro-actions">
                                                        <button title="Add To Cart" className="ec-btn-group compare"  onClick={() => {addToCart(wishlist)}}><i className="fas fa-cart-plus"></i></button>
                                                        <button className="ec-btn-group wishlist" title="Wishlist" onClick={() => {removeFromWishList(wishlist._id)}}><i className="fa-solid fa-heart-crack"></i></button >
                                                    </div>
                                                    <a href="#" className="quickview" title="Quick view"  data-toggle="modal" data-target="#ec_quickview_modal" onClick={() => {quickView(wishlist.productId._id)}}><i className="far fa-eye"></i></a>

                                                </div>
                                            </div>

                                            <div className="ec-pro-content">
                                                <h5 className="ec-pro-title"><Link to={`/product/${wishlist.productId._id}`}>{wishlist.productId.name}</Link></h5>

                                                {/* {wishlist.productId.reviews.length > 0 && <div className="ec-pro-rating">
                                                    {
                                                        calculateRating(wishlist.productId.reviews).map((star, i) => {
                                                            return (
                                                                <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                            )
                                                        })

                                                    }

                                                </div>} */}

                                                <span className="ec-price">
                                                    {wishlist.productId.oldprice && <span className="old-price">${wishlist.productId.oldprice}</span>}
                                                    <span className="new-price">${wishlist.productId.price}</span>
                                                </span>

                                                <div className="ec-pro-option">

                                                    {wishlist.productId.color.length > 0 &&
                                                        <div className="ec-pro-color">
                                                            <span className="ec-pro-opt-label">{t("Color")}</span>
                                                            <ul className="ec-opt-swatch ec-change-img">

                                                                {wishlist.productId.color.map((color, index) => {
                                                                    return (
                                                                        <li className={myClassNames({ "active": index == 0 })} onClick={(e) => { handleColor(index , e) }} key={index} >
                                                                            <a className="ec-opt-clr-img"><span style={{ backgroundColor: color }}></span></a>
                                                                        </li>
                                                                    );
                                                                })}


                                                            </ul>
                                                        </div>
                                                    }

                                                    {wishlist.productId.size.length > 0 &&
                                                        <div className="ec-pro-size">
                                                            <span className="ec-pro-opt-label">{t("Size")}</span>
                                                            <ul className="ec-opt-size">
                                                                {wishlist.productId.size.map((size, index) => {
                                                                    return (
                                                                        <li className={myClassNames({ "active": index == 0 })}  onClick={(e) => { handleSize(size.price, index, e) }} key={index}>
                                                                            <a className="ec-opt-sz" >{size.size}</a>
                                                                        </li>
                                                                    );
                                                                })}

                                                            </ul>
                                                        </div>
                                                    }


                                                </div>
                                            </div>


                                        </div>
                                    </div>


                                );
                            })}


                        </div>
                    </div>

                </section>
                // {/* <!-- New Wishlist end--> */}
            }

        </Fragment>


    );
}

export default Wishlist ;
