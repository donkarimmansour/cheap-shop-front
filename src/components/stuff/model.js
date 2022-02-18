import React, { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useTranslation } from 'react-i18next';
import { calculateRating, ImageLink, countDown, extractDesk } from '../../shared/funs';
import { List, ListTab } from '../../services/products';
import myClassNames from 'classnames';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_single_product, set_product_id } from "../../redux/actions/products";
import Products from "../products/products";
import { create_carts } from "../../redux/actions/carts";



const Model = () => {
    const { t } = useTranslation();

    const [Product, setProduct] = useState({})
    const [currentImage, setCurrentImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const slideWidth = useRef()

    const dispatch = useDispatch()
    const { singleproduct, productid } = useSelector(state => state.products)

    useEffect(() => {

         if (productid != "" )
            dispatch(get_single_product({ filter: { "_id": productid } }))
    }, [dispatch, productid])

    useEffect(() => {
        setProduct(singleproduct)
    }, [singleproduct])


    const handleSize = (price, index, e) => {
        const sizes = e.target.parentElement.parentElement.querySelectorAll("li");

        sizes.forEach((em, i) => {
            em.className = ""
            if (i == index) {
                em.className = "active"

                em.parentElement.parentElement
                    .parentElement.parentElement
                    .parentElement.querySelector(".quickview-pro-content .new-price").innerText = `$${price}`

            }
        })

    }

    const handleColor = (index, e) => {
        const colors = e.target.parentElement.parentElement.querySelectorAll("li");

        colors.forEach((em, i) => {
            em.className = ""
            if (i == index) {
                em.className = "active"
            }
        })
    }



    const nextImage = () => {

        if (currentImage < (Product.images.imagesUrl.length - 1)) {
            setCurrentImage(currentImage => {
                return currentImage + 1
            })
        } else {
            setCurrentImage(0)
        }


    }
    const prevImage = () => {
        if (currentImage != 0) {
            setCurrentImage(currentImage => {
                return currentImage - 1
            })
        } else {
            setCurrentImage((Product.images.imagesUrl.length - 1))
        }
    }

    const handleQuantityInc = () => {
        setQuantity(quantity => quantity + 1)
    }

    const handleQuantityDesk = () => {
        if (quantity != 1) {
            setQuantity(quantity => quantity - 1)
        }

    }

    const addToCart = (product) => {
        dispatch(create_carts(product))
        dispatch(set_product_id(""))
    }
    const close = (e) => {
         dispatch(set_product_id(""))
    }


    return (
        <Fragment>

            {productid != "" && Product && Product.name &&
                // {/* <!-- Modal --> */}
                <div className="modal-open">
                    <div className={myClassNames("modal fade", { "show": productid != "" })} id="ec_quickview_modal" tabIndex="-1" role="dialog" aria-modal="true" style={{ display: "block", paddingLeft: "0px" }}>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <button type="button" className="btn-close qty_close" onClick={(e) => { close(e) }}></button>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-5 col-sm-12 col-xs-12"> 
                                            {/* <!-- Swiper --> */}


                                            <div className="qty-product-cover slick-initialized slick-slider">
                                                <div className="slick-list draggable">
                                                    <div className="slick-track" >
                                                        <div className="slick-slide" aria-hidden="true" style={{ width: "274px" }} tabIndex="-1">
                                                            <div>
                                                                <div className="qty-slide" style={{ width: "100%", display: "inline-block" }}>
                                                                    <img className="img-responsive" src={ImageLink(Product.images.imagesUrl[currentImage])} alt={Product.name} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="qty-nav-thumb slick-initialized slick-slider">
                                                <button className="slick-prev slick-arrow" aria-label="Previous" type="button" onClick={prevImage}><i className="fa-solid fa-angle-left"></i></button>
                                                <div className="slick-list draggable">

                                                    <div className="slick-track" style={{ opacity: 1, width: "756px", transform: `translate3d(-${ (currentImage * ( (!slideWidth.current) ? 54 : (!slideWidth.current.offsetWidth) ? 54 : slideWidth.current.offsetWidth) )   }px, 0px, 0px)` }}>


                                                        {
                                                            Product.images.imagesUrl.map((image, i) => {
                                                                return ( 
                                                                    <div key={i} className="slick-slide"
                                                                        aria-hidden="true" ref={slideWidth} style={{ width: "54px" }} tabIndex="-1">
                                                                        <div>
                                                                            <div className="qty-slide" style={{ width: "100%", display: "inline-block" }}>
                                                                                <img className="img-responsive" src={ImageLink(image)} alt={Product.name} />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                ) 
                                                            })
                                                        }
                                                    </div>

                                                </div>
                                                <button className="slick-next slick-arrow" aria-label="Next" type="button" onClick={nextImage}><i className="fa-solid fa-angle-right"></i></button>
                                            </div>
                                        </div>


                                        <div className="col-md-7 col-sm-12 col-xs-12">
                                            <div className="quickview-pro-content">
                                                <h5 className="ec-quick-title"><a href="product-left-sidebar.html">{Product.name}</a>
                                                </h5>
                                                <div className="ec-quickview-rating">
                                                    {
                                                        calculateRating().map((star, i) => {
                                                            return (
                                                                <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                            )
                                                        })


                                                    }
                                                </div>

                                                <div className="ec-quickview-desc">{extractDesk(Product.description, 100)}</div>
                                                <div className="ec-quickview-price">
                                                    {Product.oldprice && <span className="old-price">${Product.oldprice}</span>}
                                                    <span className="new-price">${Product.price}</span>
                                                </div>

                                                <div className="ec-pro-variation">

                                                    {Product.color.length > 0 &&

                                                        <div className="ec-pro-variation-inner ec-pro-variation-color">
                                                            <span>Color</span>
                                                            <div className="ec-pro-color">
                                                                <ul className="ec-opt-swatch">
                                                                    {
                                                                        Product.color.map((color, index) => {
                                                                            return (
                                                                                <li key={index} className={myClassNames({ "active": index == 0 })} >
                                                                                    <span style={{ backgroundColor: color }} onClick={(e) => { handleColor(index, e) }}></span></li>
                                                                            );
                                                                        })}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    }

                                                    {Product.size.length > 0 &&

                                                        <div className="ec-pro-variation-inner ec-pro-variation-size ec-pro-size">
                                                            <span>Size</span>
                                                            <div className="ec-pro-variation-content">
                                                                <ul className="ec-opt-size">
                                                                    {
                                                                        Product.size.map((size, index) => {
                                                                            return (
                                                                                <li key={index}
                                                                                    className={myClassNames({ "active": index == 0 })}
                                                                                    onClick={(e) => { handleSize(size.price, index, e) }}>
                                                                                    <a href="#" className="ec-opt-sz" >{size.size}</a>
                                                                                </li>
                                                                            );
                                                                        })}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>

                                                <div className="ec-quickview-qty">
                                                    <div className="qty-plus-minus">
                                                        <div className="dec ec_qtybtn" disabled={(quantity <= 1)} onClick={handleQuantityDesk}>-</div>
                                                        <input className="qty-input" type="text" name="ec_qtybtn" onChange={() => { }} value={quantity} />
                                                        <div className="inc ec_qtybtn" onClick={handleQuantityInc}>+</div>
                                                    </div>
                                                    <div className="ec-quickview-cart" onClick={() => { addToCart(Product) }}>
                                                        <button className="btn btn-primary">Add To Cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                // {/* <!-- Modal end --> */}
            }
        </Fragment>

    );
}

export default Model;
