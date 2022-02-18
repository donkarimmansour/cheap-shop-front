import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { calculateRating, ImageLink } from '../../shared/funs';
import { List } from '../../services/products';
import { Link } from "react-router-dom";
import myClassNames from 'classnames';
import { get_catyone, get_catytwo } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";



const CatySlideTwo = (props) => {
    const { t } = useTranslation();
    const [Products, setProducts] = useState([])
    const caty = props.caty ? { "category": props.caty } : {}
    const limit = props.limit
    const skip = props.skip
    const sort = props.sort

    const dispatch = useDispatch()
    const { catytwo } = useSelector(state => state.products)


    useEffect(() => {
        dispatch(get_catytwo({ filter: caty, limit, skip, sort, catyName: props.caty }))
    }, [dispatch])

    useEffect(() => {
        setProducts(catytwo[props.caty])
    }, [catytwo[props.caty]])


    return (


        <Fragment>
            {Products && Products.length > 0 &&


                // <!--  Category Section Start -->
                <section className="section ec-category-section ec-category-wrapper-4 section-space-p">
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
                        <div className="infiniteslide_wrap" style={{ overflow: "hidden" }}>
                            <div className="row cat-space-3 cat-auto margin-minus-tb-15"
                                style={{ display: "flex", flexFlow: "row nowrap", alignItems: "center", animation: "22.8s linear 0s infinite normal none running infiniteslide1643012105807dd8" }}>


                                {Products.map((product, i) => {
                                    return (
                                        <div key={i} className="col-lg-2 col-md-4 col-sm-12" style={{ flex: "0 0 auto", display: "block" }}>
                                            <div className="cat-card">
                                                <div className="card-img">
                                                    <img className="cat-icon"
                                                        src={ImageLink(product.images.imagesUrl[0])}
                                                        alt="cat-icon" />
                                                </div>
                                                <div className="cat-detail">
                                                    <h4>{product.name}</h4>
                                                    <h5>${product.price}</h5>
                                                    <Link className="btn-primary" to={`/product/${product.category}/${product._id}`}>{("shop now")}</Link>
                                                </div>
                                            </div>
                                        </div>

                                    );
                                })}



                            </div>
                        </div>
                    </div>
                </section>
                // {/* <!--  Category Section end --> */}

            }

        </Fragment>

    );
}

export default CatySlideTwo;
