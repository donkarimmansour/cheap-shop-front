import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { calculateRating, extractDesk, handleColor, handleSize, ImageLink } from '../../shared/funs';
import myClassNames from 'classnames';
import { Link, useNavigate, useParams , useSearchParams } from "react-router-dom";
import { get_catigories, get_colors, get_count, get_filter, get_sizes, set_product_id } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { create_wishlist } from "../../redux/actions/wishlist";
import { create_carts } from "../../redux/actions/carts";
import { getLocalStorage } from "../../shared/localStorage";
import { getCookie } from "../../shared/cookie";
import { isAuthentication } from "../../shared/auth";



const Cartgory = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const params = useParams();
    const [query] = useSearchParams();

    const [Products, setProducts] = useState([])
    const [Colors, setColors] = useState([])
    const [Categories, setCategories] = useState([])
    const [More, setMore] = useState({ s: "none", w: "More" })
    const [Sizes, setSizes] = useState([])
    const [Pages, setPages] = useState({ pages: ["", "", ""], currentPage: 1 })
    const [Filters, setFilters] = useState({ category: [], size: [], color: [], min: 1, max: 250, order: "1" })

    const caty = params.caty
    const limit = props.limit
    const inc = query.get("inc")

    const dispatch = useDispatch()
    const { filters, count, catigories, sizes, colors } = useSelector(state => state.products)



    useEffect(() => {
        dispatch(get_catigories("category"))
        dispatch(get_colors("color"))
        dispatch(get_sizes("size.size"))

    }, [dispatch])


    useEffect(() => {


        const skip = Pages.currentPage == 1 ? 0 : ((Pages.currentPage - 1) * limit)

        const sort = Filters.order == 1 ? { "_id": 1 } :
            Filters.order == 2 ? { "uptatedAt": 1 } :
                Filters.order == 3 ? { "uptatedAt": -1 } :
                    Filters.order == 4 ? { "name": 1 } :
                        Filters.order == 5 ? { "name": -1 } :
                            Filters.order == 6 ? { "price": 1 } :
                                Filters.order == 7 ? { "price": -1 } : { "_id": 1 }



        let filter = {
            "category": { "$in": [...Filters.category] },
            color: { "$in": [...Filters.color] },
            size: { "$elemMatch": { "size": { "$in": [...Filters.size] } } },
            price: { "$gt": Filters.min, "$lt": Filters.max },
            name: { "$ne": "wwwwwmwwwww" }
        }

        if (inc) {
            filter = { ...filter, name: { "$regex": inc, "$options": "i" } }
        }

        dispatch(get_count({ filter }))
        dispatch(get_filter({ filter, limit, skip, sort }))

    }, [dispatch, Filters, Pages.currentPage])



    useEffect(() => {

        setCategories(() => {
            return [...catigories.filter(c => c != caty)]
        })
        setColors(colors)
        setSizes(sizes)
    }, [catigories, sizes, colors])

    useEffect(() => {
        setProducts(filters)
        setPages((Pages) => {
            Pages.pages.length = Math.ceil(count / limit)
            Pages.pages.fill("page")
            return { ...Pages, pages: Pages.pages }
        })
    }, [filters, count])




    useEffect(() => {
        const ncaty = caty ? [caty] : catigories
        setFilters({ ...Filters, category: [...ncaty], size: [...Sizes], color: [...Colors] })

    }, [Colors, Sizes])


    const handleColorSer = (index, e) => {

        if (e.target.style.backgroundColor) {

            const Pcolor = e.target.parentElement.parentElement
            const color = e.target.style.backgroundColor
            if (Pcolor.className.includes("active")) {
                Pcolor.className = ""
                setFilters({ ...Filters, color: Filters.color.filter((item, pos, self) => item != color) })

            } else {
                Pcolor.className = "active"
                setFilters({ ...Filters, color: [...new Set([...Filters.color, color])] })

            }
        }



    }
 


    const handleSizeSearch = (e) => {
        const size = e.target.parentElement.querySelector("a").innerText;

        if (e.target.checked) {
            setFilters({ ...Filters, size: [...new Set([...Filters.size, size])] })
        } else {
            setFilters({
                ...Filters, size: Filters.size.filter((item, pos, self) => item != size)
            })
        }
    }


    const handleCatySearch = (e) => {
        const caty = e.target.parentElement.querySelector("a").innerText.toLowerCase();
        if (e.target.checked) {
            setFilters({ ...Filters, category: [...new Set([...Filters.category, caty])] })
        } else {
            setFilters({
                ...Filters, category: Filters.category.filter((item, pos, self) => item != caty)
            })
        }
    }


    const handleRange = (e) => {
        setFilters({ ...Filters, [e.target.name]: parseInt(e.target.value) })

    }


    const handleOrder = (e) => {
        setFilters({ ...Filters, order: e.target.value })
    }

    const paginations = []
    const Pagination = () => {


        const currentPage = Pages.currentPage
        const pagesLength = Pages.pages.length

        if (pagesLength > 0) {

            if (currentPage == 1) {

                for (let pageid = 1; pageid <= pagesLength; pageid++) {
                    paginations.push(<li key={pageid}><a onClick={() => { setCurrentPags(pageid) }} className={myClassNames({ "active": pageid == currentPage })} href="#">{pageid}</a></li>)
                    if (pageid == 3) {
                        paginations.push(<li key="next"><a onClick={() => { setCurrentPags("next") }} className="next" href="#">Next <i className="ecicon eci-angle-right"></i></a></li>)
                        return
                    }
                }

            }
            else if (pagesLength > 0 && currentPage == pagesLength || currentPage == (pagesLength - 1) || currentPage == (pagesLength - 2)) {
                paginations.push(<li key="previews"><a onClick={() => { setCurrentPags("prev") }} className="next" href="#">Previews <i className="ecicon eci-angle-left"></i></a></li>)

                for (let pageid = (pagesLength - 3); pageid <= pagesLength; pageid++) {
                    if (pageid > 0) {
                        paginations.push(<li key={pageid}><a onClick={() => { setCurrentPags(pageid) }} className={myClassNames({ "active": pageid == currentPage })} href="#">{pageid}</a></li>)
                    }
                }

            }
            else {
                paginations.push(<li key="previews"><a onClick={() => { setCurrentPags("prev") }} className="next" href="#">Previews <i className="ecicon eci-angle-left"></i></a></li>)

                for (let pageid = (currentPage - 1); pageid <= pagesLength; pageid++) {
                    paginations.push(<li key={pageid}><a onClick={() => { setCurrentPags(pageid) }} className={myClassNames({ "active": pageid == currentPage })} href="#">{pageid}</a></li>)

                    if (pageid == currentPage + 2) {
                        paginations.push(<li key="next"><a onClick={() => { setCurrentPags("next") }} className="next" href="#">Next <i className="ecicon eci-angle-right"></i></a></li>)

                        return
                    }
                }
            }
        }//end if


    }//end Pagination

    (() => {
        Pagination()
    })()

    const setCurrentPags = (current) => {
        if (current == "prev") setPages({ ...Pages, currentPage: Pages.currentPage - 1 })
        else if (current == "next") setPages({ ...Pages, currentPage: Pages.currentPage + 1 })
        else setPages({ ...Pages, currentPage: current })
    }


    const handleMore = (e) => {
        const s = More.s == "block" ? "none" : "block"
        const w = More.w == "More" ? "Less" : "More"
        e.target.parentElement.classList.toggle("active")
        setMore({ s, w })
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



    const changeView = (e) => {
        let btn = e.target.parentElement.parentElement.querySelectorAll(".btn")
        if (e.target.className.includes("btn"))
            btn = e.target.parentElement.querySelectorAll(".btn")

        btn.forEach(element => {
            element.classList.remove("active")
        });
        if (e.target.className.includes("btn"))
            e.target.classList.add("active")
        else e.target.parentElement.classList.add("active")

        document.querySelector(".shop-pro-content .shop-pro-inner").classList.toggle("list-view")

        document.querySelectorAll(".shop-pro-content .shop-pro-inner .pro-gl-content").forEach(element => {
            element.classList.toggle("width-100")
        });


    }

    return (

        // <!-- Ec Shop page -->
        <section className="ec-page-content section-space-p">
            <div className="container">
                <div className="row">
                    <div className="ec-shop-rightside col-lg-9 order-lg-last col-md-12 order-md-first margin-b-30">
                        {/* <!-- Shop Top Start --> */}
                        <div className="ec-pro-list-top d-flex">
                            <div className="col-md-6 ec-grid-list">
                                <div className="ec-gl-btn">
                                    <button className="btn btn-grid active" onClick={(e) => {changeView(e)}}><i className="fas fa-th fa-lg"></i></button>
                                    <button className="btn btn-list" onClick={(e) => {changeView(e)}}><i className="fas fa-th-list fa-lg"></i></button>
                                </div>
                            </div>
                            <div className="col-md-6 ec-sort-select">
                                <span className="sort-by">{t("Sort by")}</span>
                                <div className="ec-select-inner">
                                    <select name="ec-select" id="ec-select" value={Filters.order} onChange={(e) => { handleOrder(e) }}>
                                        <option disabled="" value="1">{t("Position")}</option>
                                        <option value="2">{t('Latest')}</option>
                                        <option value="3">{t('Oldest')}</option>
                                        <option value="4">{t('Name, A to Z')}</option>
                                        <option value="5">{t('Name, Z to A')}</option>
                                        <option value="6">{t('Price, low to high')}</option>
                                        <option value="7">{t('Price, high to low')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Shop Top End -->


                    <!-- Shop content Start --> */}




                        <div className="shop-pro-content">
                            <div className="shop-pro-inner">

                                <Fragment>
                                    {Products.length > 0 &&


                                        <div className="row">

                                            {Products.map((product, i) => {

                                                return (

                                                    <div key={i} className="col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-6 pro-gl-content" >

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

                                                                {product.reviews.length > 0 && <div className="ec-pro-rating">
                                                                    {
                                                                        calculateRating(product.reviews).map((star, i) => {
                                                                            return (
                                                                                <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                                            )
                                                                        })

                                                                    }

                                                                </div>}




                                                                <div className="ec-pro-rating">
                                                                    {
                                                                        calculateRating().map((star, i) => {
                                                                            return (
                                                                                <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>


                                                                <div className="ec-pro-list-desc">{extractDesk(product.description , 100)}</div>

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

                                        </div>


                                    }

                                </Fragment>

                            </div>

                            {/* <!-- Ec Pagination Start --> */}
                            <div className="ec-pro-pagination">

                                <span>{t('Showing')} {(((limit * Pages.currentPage) - limit) + 1)}-{limit * Pages.currentPage} {t('of')} {count} {t('item(s)')}</span>

                                <ul className="ec-pro-pagination-inner">{paginations}</ul>




                            </div>
                            {/* <!-- Ec Pagination End --> */}


                        </div>
                        {/* <!--Shop content End --> */}
                    </div>
                    {/* <!-- Sidebar Area Start --> */}
                    <div className="ec-shop-leftside col-lg-3 order-lg-first col-md-12 order-md-last">
                        <div id="shop_sidebar" className="is-affixed" style={{ height: "882px", position: "relative" }}>
                            <div className="inner-wrapper-sticky"
                                style={{ position: "relative", transform: "translate3d(0px, 0px, 0px)" }}>
                                <div className="ec-sidebar-heading">
                                    <h1>{t('Filter Products By')}</h1>
                                </div>
                                <div className="ec-sidebar-wrap">
                                    {/* <!-- Sidebar Category Block --> */}

                                    {Categories && Categories.length > 0 &&

                                        <div className="ec-sidebar-block">
                                            <div className="ec-sb-title">
                                                <h3 className="ec-sidebar-title">{t('Category')}<div className="ec-sidebar-res"><i
                                                    className="ecicon eci-angle-down"></i></div>
                                                </h3>
                                            </div>
                                            <div className="ec-sb-block-content ec-sidebar-dropdown">
                                                <ul>

                                                    {caty && catigories.includes(caty) &&

                                                        <li onClick={(e) => { handleCatySearch(e) }}>
                                                            <div className="ec-sidebar-block-item">
                                                                <input type="checkbox" defaultChecked={true} /> <a href="#">{caty}</a><span
                                                                    className="checked"></span>
                                                            </div>
                                                        </li>
                                                    }

                                                    {Categories.map((cat, ci) => {

                                                        if (ci > 1) {
                                                            return
                                                        }

                                                        return (
                                                            <li key={ci} onClick={(e) => { handleCatySearch(e) }}>
                                                                <div className="ec-sidebar-block-item">
                                                                    <input type="checkbox" defaultChecked={caty ? caty == cat ? true : false : true} /> <a href="#">{cat}</a><span
                                                                        className="checked"></span>
                                                                </div>
                                                            </li>

                                                        )
                                                    })

                                                    }

                                                    {Categories.length > 1 &&

                                                        <li id="ec-more-toggle-content" style={{ padding: "0", display: More.s }}>
                                                            <ul>
                                                                {
                                                                    Categories.slice(2).map((cat, ci) => {

                                                                        return (
                                                                            <li key={ci} onClick={(e) => { handleCatySearch(e) }}>
                                                                                <div className="ec-sidebar-block-item">
                                                                                    <input type="checkbox" defaultChecked={caty ? caty == cat ? true : false : true} /> <a href="#">{cat}</a><span
                                                                                        className="checked"></span>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    })}
                                                            </ul>
                                                        </li>
                                                    }





                                                    <li onClick={(e) => { handleMore(e) }}>
                                                        <div className="ec-sidebar-block-item ec-more-toggle">
                                                            <span className="checked"></span><span id="ec-more-toggle">{t(More.w)}{" "}{t('Categories')}</span>
                                                        </div>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>


                                    }



                                    {/* <!-- Sidebar Size Block --> */}
                                    {Sizes.length > 0 &&

                                        < div className="ec-sidebar-block">
                                            <div className="ec-sb-title">
                                                <h3 className="ec-sidebar-title">{("Size")}<div className="ec-sidebar-res"><i
                                                    className="ecicon eci-angle-down"></i></div>
                                                </h3>
                                            </div>
                                            <div className="ec-sb-block-content ec-sidebar-dropdown">
                                                <ul>

                                                    {Sizes.map((size, si) => {

                                                        return (
                                                            <li key={si} onClick={(e) => { handleSizeSearch(e) }}>
                                                                <div className="ec-sidebar-block-item">
                                                                    <input type="checkbox" defaultChecked /> <a href="#">{size}</a><span
                                                                        className="checked"></span>
                                                                </div>
                                                            </li>

                                                        )
                                                    })
                                                    }
                                                </ul>
                                            </div>
                                        </div>

                                    }

                                    {/* <!-- Sidebar Color item --> */}


                                    {Colors.length > 0 &&

                                        <div className="ec-sidebar-block ec-sidebar-block-clr">
                                            <div className="ec-sb-title">
                                                <h3 className="ec-sidebar-title">{t('Color')}<div className="ec-sidebar-res"><i
                                                    className="ecicon eci-angle-down"></i></div>
                                                </h3>
                                            </div>
                                            <div className="ec-sb-block-content ec-sidebar-dropdown ">
                                                <ul>
                                                    {Colors.map((color, ci) => {

                                                        return (
                                                            <li className="active" onClick={(e) => { handleColorSer(ci, e) }} key={ci} >
                                                                <div className="ec-sidebar-block-item"><span
                                                                    style={{ backgroundColor: color }}></span></div>
                                                            </li>

                                                        )
                                                    })
                                                    }
                                                </ul>
                                            </div>
                                        </div>

                                    }

                                    {/* <!-- Sidebar Price Block --> */}
                                    <div className="ec-sidebar-block">
                                        <div className="ec-sb-title">
                                            <h3 className="ec-sidebar-title">{t("Price Range")}<div className="ec-sidebar-res"><i
                                                className="ecicon eci-angle-down"></i></div>
                                            </h3>
                                        </div>

                                        <div className="ec-sb-block-content es-price-slider ec-sidebar-dropdown">


                                            <div className="ec-price-input">
                                                <label className="filter__label"><input type="number"
                                                    className="filter__input" onChange={(e) => { handleRange(e) }} name="min" value={Filters.min} max="249" min="1" /></label>
                                                <span className="ec-price-divider"></span>
                                                <label className="filter__label"><input type="number"
                                                    className="filter__input" onChange={(e) => { handleRange(e) }} name="max" value={Filters.max} max="250" min="2" /></label>
                                            </div>




                                        </div>
                                    </div>




                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >



        // {/* <!-- Ec Shop page end --> */}

    );
}

export default Cartgory;
