import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { calculateRating, countDown, extractDesk, ImageLink } from '../../shared/funs';
import { get_feature_products, get_limited_products, get_products, set_product_id } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import myClassNames from 'classnames';
import { Link , useNavigate } from "react-router-dom"; import { create_carts } from "../../redux/actions/carts";
import { create_wishlist } from "../../redux/actions/wishlist";
import { getLocalStorage } from "../../shared/localStorage";
import { getCookie } from "../../shared/cookie";
import { isAuthentication } from "../../shared/auth";
import MainSlider from "./mainSlider";

const FeatureAndLimit = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [LimitedProducts, setLimitedProducts] = useState([])
    const [FeatureProducts, setFeatureProducts] = useState([])
    const limit = props.limit
    const skip = props.skip
    const sort = props.sort

    const [SlideWidth, setSlideWidth] = useState(0)
    const [SlideMargin, setSlideMargin] = useState(0)
    const [countDownDateL, setCountDownDateL] = useState({ days: "", hr: "", min: "", sec: "" })
    const [countDownDateF, setCountDownDateF] = useState({ days: "", hr: "", min: "", sec: "" })
    const [currentFeature, setCurrentFeature] = useState(0)
    const [currentLimited, setCurrentLimited] = useState(0)
    const [offsetL, setOffsetL] = useState(0)
    const [offsetF, setOffsetF] = useState(0)

    const dispatch = useDispatch()
    const { featureproducts , limitedproducts } = useSelector(state => state.products) 


    useEffect(() => {
        setSlideWidth(document.querySelector("body").offsetWidth)
       // setSlideMargin(document.querySelector(".ec-fre-spe-section .ec-fre-products .slick-track").style.marginRghit)
        console.log(document.querySelector(".ec-fre-spe-section .row"));
    }, [window.innerWidth])


    useEffect(() => {
        dispatch(get_feature_products({ filter: {}, limit, skip, sort : '{"viewcount" : -1}'}))
        dispatch(get_limited_products({ filter: {}, limit, skip, sort : '{"limitedAtt" : -1}'}))
    }, [dispatch])

    useEffect(() => {
        setFeatureProducts(featureproducts)
        setLimitedProducts(limitedproducts)
    }, [featureproducts , limitedproducts])



    useEffect(() => {

        if (FeatureProducts && FeatureProducts[currentFeature] && FeatureProducts[currentFeature].limitedAtt
          &&  LimitedProducts && LimitedProducts[currentLimited] && LimitedProducts[currentLimited].limitedAtt) {

            setCountDownDateF({ ...countDown(FeatureProducts[currentFeature].limitedAtt) })
            setCountDownDateL({ ...countDown(LimitedProducts[currentLimited].limitedAtt) })
            const clearCountDown = setInterval(() => {
                 setCountDownDateL({ ...countDown(LimitedProducts[currentLimited].limitedAtt) })
                 setCountDownDateF({ ...countDown(FeatureProducts[currentFeature].limitedAtt) })
            }, 1000);
            return () => {
                clearInterval(clearCountDown)
            }
            
        }
       
    }, [currentFeature , currentLimited , FeatureProducts , LimitedProducts])

 

 


    const prevSlide = (cl) => {

        
        const sildes = Array.from(document.querySelectorAll(`.ec-${cl}-section .ec-${cl}-products .slick-list .slick-track .slick-slide`))

        let move = 575;

        let len = sildes.length
        const index = sildes.findIndex(e => e.className.includes("slick-current"))

        if (index == 0) {

            sildes[index].classList.remove("slick-current")
            sildes[len - 1].classList.add("slick-current")

            if (cl == "fre") {
                setCurrentFeature(len - 1)
                setOffsetF(0)
            } else {
                setCurrentLimited(len - 1)
                setOffsetL(0)
            }

            
            return false;

        } else {

            sildes[index].classList.remove("slick-current")
            sildes[index - 1].classList.add("slick-current")
            if(cl == "fre") {
                setCurrentFeature(index - 1)
                setOffsetF(((index - 1) * move))
              }else {
                setCurrentLimited(index - 1)
                setOffsetL(((index - 1) * move))
              }
         
           

            return false

        }

      
    }

    const nextSlide = (cl) => {
        
        const sildes = Array.from(document.querySelectorAll(`.ec-${cl}-section .ec-${cl}-products .slick-list .slick-track .slick-slide`))

        let move = 575;

        let len = sildes.length
        const index = sildes.findIndex(e => e.className.includes("slick-current"))


        if (index == (len - 1)) {

            sildes[index].classList.remove("slick-current")
            sildes[0].classList.add("slick-current")

            if(cl == "fre") {
              setCurrentFeature(0)
              setOffsetF(0)
            }else {
                setCurrentLimited(0)
                setOffsetL(0)
            }

           
            return false;

        } else {

            sildes[index].classList.remove("slick-current")
            sildes[index + 1].classList.add("slick-current")

            if (cl == "fre") {
                setCurrentFeature(index + 1)
                setOffsetF(((index + 1) * move))
            } else {
                setCurrentLimited(index + 1)
                setOffsetL(((index + 1) * move))
            }
           
            return false

        }

    }


        

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
        // <!--  Feature & Special Section Start -->
        <section className="section ec-fre-spe-section section-space-p">
            <div className="container">
                <div className="row">
                    {/* <!--  Feature Section Start --> */}
                    <div className="ec-fre-section col-lg-6 col-md-6 col-sm-6 margin-b-30 slideInRight"
                        data-animation="slideInRight" data-animated="true">
                        <div className="col-md-12 text-left">
                            <div className="section-title">
                                <h2 className="ec-bg-title">{t("Feature Items")}</h2>
                                <h2 className="ec-title">{t("Feature Items")}</h2>
                            </div>
                        </div>

                        <div className="ec-fre-products slick-initialized slick-slider">
                            <button className="slick-prev slick-arrow"
                                aria-label="Previous" type="button" onClick={(e) => { prevSlide("fre") }}><i className="fa-solid fa-angle-left"></i></button>
                            <div className="slick-list draggable">
                                <div className="slick-track"
                                    style={{ opacity: 1, width: SlideWidth * limit + "px", transform: `translate3d(-${offsetF}px, 0px, 0px)` }}>

                                    { FeatureProducts && FeatureProducts.length > 0 &&  
                                           FeatureProducts.map((product, pi) => {
                                               return (


                                   <div key={pi} className={myClassNames("slick-slide slick-current", { "slick-current": pi == 0 })}  data-slick-index="0"  aria-hidden="false" style={{  width: SlideWidth < 991 ? SlideWidth + "px" :  (SlideWidth / 2) - (78) + "px"}}  >
                                        <div>

                                            <div className="ec-fs-product" style={{ width: "100%", display: "inline-block" }}>
                                                <div className="ec-fs-pro-inner">
                                                    
                                                    <div className="ec-fs-pro-image-outer col-lg-6 col-md-6 col-sm-6">
                                                        <div className="ec-fs-pro-image">
                                                            <Link to={`/product/${product.category}/${product._id}`} className="image"
                                                                tabIndex="0"><img className="main-image"
                                                                        src={ImageLink(product.images.imagesUrl[0])}
                                                                    alt="Product" /></Link>
                                                                <a href="#" className="quickview" title="Quick view" onClick={() => { quickView(product._id) }}><i style={{color : "black"}} className="far fa-eye"></i></a>

                                                        </div>
                                                    </div>

                                                    <div className="ec-fs-pro-content col-lg-6 col-md-6 col-sm-6">
                                                        <h5 className="ec-fs-pro-title"><Link to={`/product/${product.category}/${product._id}`}
                                                            tabIndex="0">{product.name}</Link>
                                                        </h5>

                                                    {/* {products.reviews.length > 0 && <div className="ec-fs-pro-rating">
                                                        <span className="ec-fs-rating-icon">
                                                    {
                                                        calculateRating(products.reviews).map((star, i) => {
                                                        return (
                                                        <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                    )
                                                    })

                                                    }

                                                    </span></div>
                                                    <span className="ec-fs-rating-text">4 {t("Review")}</span>} */}

                        
                                                        <div className="ec-fs-price">
                                                            {product.oldprice && <span className="old-price">${product.oldprice}</span>}
                                                            <span className="new-price">${product.price}</span>
                                                        </div>

                                                        {product.limitedAtt != null && new Date(product.limitedAtt).getTime() > Date.now() &&
                                                            <div className="countdowntimer">
                                                                <span id="ec-fs-count-1" className="style colorDefinition labelformat">
                                                                <span className="timerDisplay label4" style={{ display: "flex" }}>

                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateF.days}</span>
                                                                            <span className="periodDisplay">{t("Days")}</span>
                                                                        </span>
                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateF.hr}</span>
                                                                            <span className="periodDisplay">{t("Hours")}</span>
                                                                        </span>
                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateF.min}</span>
                                                                            <span className="periodDisplay">{t("Min")}</span>
                                                                        </span>
                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateF.sec}</span>
                                                                            <span className="periodDisplay">{t("Sec")}</span>
                                                                        </span>

                                                                        </span>

                                                               </span>
                                                            </div>

                                                        }

                                                         <div className="ec-fs-pro-desc">{extractDesk(product.description, 100)}</div>
                                                        <div className="ec-fs-pro-btn">
                                                            <a href="#" className="btn btn-lg btn-secondary" onClick={() => { addToCart(product) }} >{t('Add To Cart')}</a>
                                                            <a href="#" className="btn btn-lg btn-primary" onClick={() => { addToWishList(product._id, userId._id) }}>{t('Wishlist')}</a>
                                                        </div>


                                                    </div>
                                                </div>

                                            </div>
                                        </div>     
                                        </div>     

)    })
                                    }

                                </div>
                            </div><button className="slick-next slick-arrow" aria-label="Next" type="button" onClick={(e) => { nextSlide("fre") }}
                            ><i className="fa-solid fa-angle-right"></i></button>
                        </div>
                    </div>
                    {/* <!--  Feature Section End -->






                <!--  Special Section Start --> */}
                    <div className="ec-spe-section col-lg-6 col-md-6 col-sm-6 slideInLeft" data-animation="slideInLeft"
                        data-animated="true">
                        <div className="col-md-12 text-left">
                            <div className="section-title">
                                <h2 className="ec-bg-title">{t("Limited Time Offer")}</h2>
                                <h2 className="ec-title">{t("Limited Time Offer")}</h2>
                            </div>
                        </div>



                        <div className="ec-spe-products slick-initialized slick-slider">
                            <button className="slick-prev slick-arrow"
                                aria-label="Previous" type="button" onClick={(e) => { prevSlide("spe") }}><i className="fa-solid fa-angle-left"></i></button>
                            <div className="slick-list draggable">
                                <div className="slick-track"
                                    style={{ opacity: 1, width :  SlideWidth * limit + "px" , transform: `translate3d(-${offsetL}px, 0px, 0px)` }}>

                                    { FeatureProducts && FeatureProducts.length > 0 &&  
                                           FeatureProducts.map((product, pi) => {
                                               return (


                                   <div key={pi} className={myClassNames("slick-slide slick-current", { "slick-current": pi == 0 })}  data-slick-index="0"  aria-hidden="false" style={{  width: SlideWidth < 991 ? SlideWidth + "px" :  (SlideWidth / 2) - (78) + "px"}} >
                                        <div>

                                            <div className="ec-fs-product" style={{ width: "100%", display: "inline-block" }}>
                                                <div className="ec-fs-pro-inner">
                                                    
                                                    <div className="ec-fs-pro-image-outer col-lg-6 col-md-6 col-sm-6">
                                                        <div className="ec-fs-pro-image">
                                                            <Link to={`/product/${product.category}/${product._id}`} className="image"
                                                                tabIndex="0"><img className="main-image"
                                                                        src={ImageLink(product.images.imagesUrl[0])}
                                                                    alt="Product" /></Link>
                                                            <a href="#" className="quickview" title="Quick view" onClick={() => { quickView(product._id) }}><i style={{color : "black"}} className="far fa-eye"></i></a>

                                                        </div>
                                                    </div>

                                                    <div className="ec-fs-pro-content col-lg-6 col-md-6 col-sm-6">
                                                        <h5 className="ec-fs-pro-title"><Link to={`/product/${product.category}/${product._id}`}
                                                            tabIndex="0">{product.name}</Link>
                                                        </h5>

                                                    {/* {products.reviews.length > 0 && <div className="ec-fs-pro-rating">
                                                        <span className="ec-fs-rating-icon">
                                                    {
                                                        calculateRating(products.reviews).map((star, i) => {
                                                        return (
                                                        <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                    )
                                                    })

                                                    }

                                                    </span></div>
                                                    <span className="ec-fs-rating-text">4 {t("Review")}</span>} */}

                        
                                                        <div className="ec-fs-price">
                                                            {product.oldprice && <span className="old-price">${product.oldprice}</span>}
                                                            <span className="new-price">${product.price}</span>
                                                        </div>

                                                        {product.limitedAtt != null && new Date(product.limitedAtt).getTime() > Date.now() &&
                                                            <div className="countdowntimer">
                                                                <span id="ec-fs-count-1" className="style colorDefinition labelformat">
                                                                <span className="timerDisplay label4" style={{ display: "flex" }}>

                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateL.days}</span>
                                                                            <span className="periodDisplay">{t("Days")}</span>
                                                                        </span>
                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateL.hr}</span>
                                                                            <span className="periodDisplay">{t("Hours")}</span>
                                                                        </span>
                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateL.min}</span>
                                                                            <span className="periodDisplay">{t("Min")}</span>
                                                                        </span>
                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateL.sec}</span>
                                                                            <span className="periodDisplay">{t("Sec")}</span>
                                                                        </span>

                                                                        </span>

                                                               </span>
                                                            </div>

                                                        }

                                                         <div className="ec-fs-pro-desc">{extractDesk(product.description, 100)}</div>
                                                        <div className="ec-fs-pro-btn">
                                                            <a href="#" className="btn btn-lg btn-secondary" onClick={() => { addToCart(product) }} >{t('Add To Cart')}</a>
                                                            <a href="#" className="btn btn-lg btn-primary" onClick={() => { addToWishList(product._id, userId._id) }}>{t('Wishlist')}</a>
                                                        </div>


                                                    </div>
                                                </div>

                                            </div>
                                        </div>     
                                        </div>     

)    })
                                    }

                                </div>
                            </div><button className="slick-next slick-arrow" aria-label="Next" type="button" onClick={(e) => { nextSlide("spe") }}
                            ><i className="fa-solid fa-angle-right"></i></button>
                        </div>
                   
                         </div>
                    {/* <!--  Special Section End --> */}
                </div>
            </div>
        </section>
        // {/* <!--  Feature & Special Section end --> */}
    );
}

export default FeatureAndLimit;