import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { calculateRating, handleColor, handleSize, ImageLink } from '../../shared/funs';
import { get_products, set_product_id } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import myClassNames from 'classnames';
import { Link , useNavigate } from "react-router-dom"; 
import { create_carts } from "../../redux/actions/carts";
import { create_wishlist } from "../../redux/actions/wishlist";
import { getLocalStorage } from "../../shared/localStorage";
import { getCookie } from "../../shared/cookie";
import { isAuthentication } from "../../shared/auth";


const Products = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [Products, setProducts] = useState([])

    const caty = props.caty ? { "category": props.caty } : {}
    const limit = props.limit
    const skip = props.skip
    const sort = props.sort
    const catyName = props.caty ? props.caty : "New Arrivals"

    const { products } = useSelector(state => state.products)


    useEffect(() => {
        dispatch(get_products({ filter: caty, limit, skip, sort, catyName }))
    }, [dispatch])

    useEffect(() => {
        setProducts(products[catyName])
    }, [products[catyName]])

    const addToCart = (product) => {
        dispatch(create_carts(product))
    }

    const authorization = isAuthentication() ? { "Authorization": `bearer ${getCookie("token")}` } : [{ _id: "" }]
    const userId = localStorage.getItem("user") ? getLocalStorage("user") : [{ _id: "" }]


    const addToWishList = (productId, userId) => {

        if (!isAuthentication()) {
            navigate("/login")
        } else {
            dispatch(create_wishlist(productId, userId, authorization))
        }

    }

    const quickView = (productId) => {
        dispatch(set_product_id(productId))
    }


    return (
        <Fragment>
            {Products && products[catyName] && Products.length > 0 &&   // <!-- New Product Start -->

                <section className="section ec-new-product section-space-p">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-12 text-center">
                                <div className="section-title">
                                    <h2 className="ec-bg-title">{t(catyName)}</h2>
                                    <h2 className="ec-title">{t(catyName)}</h2>
                                    <p className="sub-title">{t("Browse The Collection of Top Products")}</p>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            {/* <!-- New Product Content --> */}

                            {Products.map((product, i) => {

                                return (

                                    <div key={i} className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 ec-product-content flipInY" >

                                        <div className="ec-product-inner">
                                            <div className="ec-pro-image-outer">


                                                <div className="ec-pro-image">
                                                    <Link to={`/product/${product.category}/${product._id}`} className="image">
                                                        <img className="main-image" src={ImageLink(product.images.imagesUrl[0])} alt="Product" />
                                                    </Link>

                                                    <span className="flags">
                                                        {product.stock == 0 && <span className="sale">{t("Sale")}</span>}
                                                        {product.condition == "new" && <span className="new">{t("New")}</span>}
                                                    </span>

                                                    {product.oldprice && <span className="percentage">{Math.ceil(product.price * (product.oldprice / 100))}%</span>}

                                                    <div className="ec-pro-actions">
                                                        <button title="Add To Cart" className="ec-btn-group compare" onClick={() => { addToCart(product) }}><i className="fas fa-cart-plus"></i></button>
                                                        <button className="ec-btn-group wishlist" title="Wishlist" onClick={() => { addToWishList(product._id, userId._id) }}><i className="far fa-heart"></i></button >
                                                    </div>
                                                    <a href="#" className="quickview" title="Quick view" onClick={() => { quickView(product._id) }}><i className="far fa-eye"></i></a>

                                                </div>
                                            </div>

                                            <div className="ec-pro-content">
                                                <h5 className="ec-pro-title"><Link to={`/product/${product.category}/${product._id}`}>{product.name}</Link></h5>

                                                {/* {product.reviews.length > 0 && <div className="ec-pro-rating">
                                                    {
                                                        calculateRating(product.reviews).map((star, i) => {
                                                            return (
                                                                <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                            )
                                                        })

                                                    }

                                                </div>} */}

                                                <span className="ec-price">
                                                    {product.oldprice && <span className="old-price">${product.oldprice}</span>}
                                                    <span className="new-price">${product.price}</span>
                                                </span>

                                                <div className="ec-pro-option">

                                                    {product.color.length > 0 &&
                                                        <div className="ec-pro-color">
                                                            <span className="ec-pro-opt-label">{t("Color")}</span>
                                                            <ul className="ec-opt-swatch ec-change-img">

                                                                {product.color.map((color, index) => {
                                                                    return (
                                                                        <li className={myClassNames({ "active": index == 0 })} onClick={(e) => { handleColor(index, e) }} key={index} >
                                                                            <a className="ec-opt-clr-img"><span style={{ backgroundColor: color }}></span></a>
                                                                        </li>
                                                                    );
                                                                })}


                                                            </ul>
                                                        </div>
                                                    }

                                                    {product.size.length > 0 &&
                                                        <div className="ec-pro-size">
                                                            <span className="ec-pro-opt-label">{t("Size")}</span>
                                                            <ul className="ec-opt-size">
                                                                {product.size.map((size, index) => {
                                                                    return (
                                                                        <li className={myClassNames({ "active": index == 0 })} onClick={(e) => { handleSize(size.price, index, e) }} key={index}>
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




                            <div className="col-sm-12 shop-all-btn">
                                <Link to={`/catigory/${catyName}`}>{t("Shop All Collection")}</Link>
                            </div>


                        </div>
                    </div>

                </section>
                // {/* <!-- New Product end--> */}
            }

        </Fragment>


    );
}

export default Products;
