import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { calculateRating, ImageLink } from '../../shared/funs';
import { List } from '../../services/products';
import { Link } from "react-router-dom";
import myClassNames from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { get_catyone } from "../../redux/actions/products";



const CatySlideOne = (props) => {
    const { t } = useTranslation();
    const [Products, setProducts] = useState([])
    const [offset, setOffset] = useState(0)
    const caty = props.caty ? { "category": props.caty } : {}
    const limit = props.limit
    const skip = props.skip
    const sort = props.sort

    const dispatch = useDispatch()
    const { catyone } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(get_catyone({ filter: caty, limit, skip, sort, catyName: props.caty }))
    }, [dispatch])

    useEffect(() => {
        setProducts(catyone[props.caty])
    }, [catyone[props.caty]])



    const handleNext = () => {
        const cats = Array.from(document.querySelectorAll(".ec-category-wrapper-1 .slick-list .slick-slide")) 
        const move = 278;

             const index = cats.findIndex(c => c.className.includes("slick-current")) 
             if (index >= 0) {

              //  let jump = (index <= 3) ? 0 : (index - 3);
                const len = document.querySelectorAll(".ec-category-wrapper-1  .slick-list .slick-slide").length
              //  jump += 1

                if (index == (len - 1)) {

                    setOffset(0)
                    cats[index].classList.remove("slick-current")
                    cats[0].classList.add("slick-current")
                   // jump = 0
                    return false

                } else {

                    setOffset((move * (index + 1)))
                    cats[index].classList.remove("slick-current")
                    cats[index + 1].classList.add("slick-current")
                    return false

                }

            }



    }

    const handlePrevious = () => {

        const cats = Array.from(document.querySelectorAll(".ec-category-wrapper-1 .slick-list .slick-slide")) 
        const move = 278;

        if (offset > 0) {

            const index = cats.findIndex(c => c.className.includes("slick-current")) 

            if (index >= 0) {
                if (cats[index].className.includes("slick-current")) {
                    cats[index - 1].classList.add("slick-current")
                    setOffset(offset => (offset - move))

                    return false;
                }
            }
        }



    }


    return (

        <Fragment>
            {Products && Products.length > 0 &&

                // <!--  category Section Start -->
                <section className="section ec-category-section ec-category-wrapper-1 section-space-p">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <div className="section-title">
                                    <h2 className="ec-bg-title">{t(props.caty)}</h2>
                                    <h2 className="ec-title">{t(props.caty)}</h2>
                                    <p className="sub-title">{t("Browse The Collection of Top Categories")}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row margin-minus-tb-15">
                            <div className="ec_cat_slider slick-initialized slick-slider"><button className="slick-prev slick-arrow"
                                aria-label="Previous" type="button" onClick={handlePrevious} style={{fontSize : "30px"}}><i className="fa-solid fa-angle-left"></i></button>
                                <div className="slick-list draggable">
                                    <div className="slick-track"
                                        style={{ opacity: 1, width: "3892px", transform: `translate3d(-${offset}px, 0px, 0px)` }}>

                                        {Products.map((product, i) => {
                                            return (
                                                <div key={i} className={myClassNames("slick-slide", { "slick-current": i == 0 })} aria-hidden="false"
                                                    style={{ width: "278px" }} tabIndex="-1">
                                                    <div>
                                                        <div className="ec_cat_content" style={{ width: "100%", display: "inline-block" }}>
                                                            <div className="ec_cat_inner">
                                                                <div className="ec-cat-image">
                                                                    <img src={ImageLink(product.images.imagesUrl[0])}
                                                                        alt={product.name} />
                                                                </div>
                                                                <div className="ec-cat-desc">
                                                                    <span className="ec-section-btn"><Link to={`/product/${product.category}/${product._id}`} className="btn-primary"
                                                                        tabIndex="0">{("lighting")}</Link></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            );
                                        })}




                                    </div>
                                </div><button className="slick-next slick-arrow" aria-label="Next" type="button" style={{fontSize : "30px"}} onClick={handleNext}><i className="fa-solid fa-angle-right"></i></button>
                            </div>
                        </div>
                    </div>
                </section>

                // {/* <!--  category Section end --> */}

            }

        </Fragment>





    );
}

export default CatySlideOne;
