import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get_carts, increase_carts, decrease_carts, delete_carts,  color_carts, size_carts } from "../../redux/actions/carts";
import { ImageLink } from "../../shared/funs";




const Cart = () => {
 
    const { t } = useTranslation();
    const [Carts, setCarts] = useState([])

    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.carts)

    useEffect(() => {
        dispatch(get_carts())
    }, [dispatch])

    useEffect(() => {
        setCarts(carts)
    }, [carts])



    const decreaseProduct = (id, price, quantity) => {
        dispatch(decrease_carts(id))
    }

    const increaseProduct = (id, price, quantity) => {
        dispatch(increase_carts(id))
    }

    const removeProduct = (id) => {
        dispatch(delete_carts(id))
    }
    const changeColor = (id , color) => {
       dispatch(color_carts(id , color))
    }

    const changeSize = (id , size , price) => {
        dispatch(size_carts(id , size , price))
    }


    return (

        // <!-- Start cart page -->
        <section className="ec-page-content section-space-p">
            <div className="container">
                <div className="row">
                    <div className="ec-cart-leftside col-lg-8 col-md-12 ">
                        {/* <!-- cart content Start --> */}
                        <div className="ec-cart-content">
                            <div className="ec-cart-inner">
                                <div className="row">
                                    <form action="#">

                                        <div className="table-content cart-table-content">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>{t("Product")}</th>
                                                        <th>{t("Price")}</th>
                                                        <th style={{textAlign: "center"}}>{t("Size")}</th>
                                                        <th style={{textAlign: "center"}}>{t("Color")}</th>  
                                                         <th style={{textAlign: "center"}}>{t("Quantity")}</th>
                                                        <th>{t("Total")}</th>
                                                        <th>{t("Remove")}</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                {Carts && Carts.length > 0 &&
                                                   Carts.map((cart, oi) => {
                                                    return (

                                                        <tr key={oi}>
                                                            <td data-label={t("Product")} className="ec-cart-pro-name">
                                                                <Link to={`/product/${cart.product.categoty}/${cart.product._id}`}><img className="ec-cart-pro-img mr-4" src={ImageLink(cart.product.images.imagesUrl[0])} alt="" />
                                                                    {cart.product.name}</Link></td>
                                                            <td data-label={t("Price")} className="ec-cart-pro-price"><span className="amount">{cart.price}</span></td>

                                                          
                                                            <td data-label={t("Size")} className="ec-cart-pro-qty dropdown" style={{ textAlign: "center" }}>

                                                                <button className="dropdown-toggle" data-bs-toggle="dropdown">
                                                                   {cart.size}
                                                                </button>
                                                                             
                                                                <ul className="dropdown-menu dropdown-menu-right">
                                                                       {cart.product.size.map((size , si) => {
                                                                             return (
                                                                                <li key={si}><a  className="dropdown-item" href="#" onClick={(e) => { changeSize(cart.product._id , size.size , size.price) }}>{size.size} (${size.price})</a> </li>
                                                                             )
                                                                        })}
                                                 
                                                                 </ul>

                                                            </td>

                                                            <td data-label={t("Color")} className="ec-cart-pro-qty dropdown" style={{ textAlign: "center" }}>

                                                                <button className="dropdown-toggle" data-bs-toggle="dropdown">
                                                                   {cart.color}
                                                                </button>
                                                                            
                                                                <ul className="dropdown-menu dropdown-menu-right">
                                                                    {cart.product.color.map((color , ci) => {
                                                                            return (
                                                                                <li key={ci}><a  className="dropdown-item" href="#" onClick={(e) => { changeColor(cart.product._id , color) }}>{color}</a> </li>
                                                                            )
                                                                        })}

                                                                </ul>

                                                                </td>

                                                          
                                                            <td data-label={t("Quantity")} className="ec-cart-pro-qty" style={{ textAlign: "center" }}>
                                                                <div className="cart-qty-plus-minus ">
                                                                    <input className="cart-plus-minus" type="text" name="cartqtybutton" onChange={() => { }} value={cart.quantity} />
                                                                    <div className="ec_cart_qtybtn">
                                                                       <div className="inc ec_qtybtn"  disabled={(cart.quantity <= 1)} onClick={(e) => { increaseProduct(cart.product._id)  }}>+</div>
                                                                       <div className="dec ec_qtybtn" onClick={(e) => { decreaseProduct(cart.product._id) }}>-</div>
                                                                     </div>
                                                                </div>
                                                            </td>

                                                            <td data-label={t("Total")} className="ec-cart-pro-subtotal">${cart.amount}</td>
                                                            <td data-label={t("Remove")} className="ec-cart-pro-remove" style={{ textAlign: "center" }}>
                                                                <a href="#" onClick={() => { removeProduct(cart.product._id) }}><i className="fa-solid fa-xmark"></i></a>
                                                            </td>
                                                        </tr>
                                                    
                                                        )
                                                    })

                                                  }
                                                </tbody>
                                            </table>
                                        </div>


                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="ec-cart-update-bottom">
                                                    <Link to="/">{t("Continue Shopping")}</Link>
                                                    <button className="btn btn-primary"><Link to="/checkout">{t("Check Out")}</Link> </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* <!--cart content End --> */}
                    </div>

                    {/* <!-- Sidebar Area Start --> */}
                    <div className="ec-cart-rightside col-lg-4 col-md-12">
                        <div className="ec-sidebar-wrap">
                            {/* <!-- Sidebar Summary Block --> */}
                            <div className="ec-sidebar-block">
                                <div className="ec-sb-title">
                                    <h3 className="ec-sidebar-title" style={{border : "none"}}>{t("Summary")}<div className="ec-sidebar-res">
                                    <i className="fa-solid fa-angle-down"></i></div></h3>
                                </div>
                             
                                <div className="ec-sb-block-content ec-sidebar-dropdown">
                                    <div className="ec-cart-summary-bottom">
                                        <div className="ec-cart-summary">
                                        {Carts && Carts.length > 0 &&
                                            <div className="ec-cart-summary-total">
                                                <span className="text-left">{t("Total Amount")}</span>
                                                <span className="text-right">${
                                                   Carts.reduce((amount , cart) => amount + cart.amount , 0 )
                                                 }</span>
                                            </div>
                                        }
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* <!-- Sidebar Summary Block --> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
// {/* <!-- End cart page --> */ }
  );
}

export default Cart;
