import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate , useParams } from 'react-router-dom';
import { get_order, get_orders } from "../../redux/actions/orders";
import { CLEAR_MESSAGE } from "../../redux/constans/message";
import { isAuthentication } from "../../shared/auth";
import { getCookie } from "../../shared/cookie";
import { ImageLink } from "../../shared/funs";
import { getLocalStorage } from "../../shared/localStorage";
import myClassname from "classnames";
import { loader } from "../../shared/elements";


const Track = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {

        if (!isAuthentication()) {
            navigate("/")
            return
        }
        dispatch({ type: CLEAR_MESSAGE })

    }, [])


    const [Status, setStatus] = useState("waiting")
    const { t } = useTranslation();


    const authorization = isAuthentication() ? { "Authorization": `bearer ${getCookie("token")}` } : [{ _id: "" }]
    const user = localStorage.getItem("user") ? getLocalStorage("user") : [{ _id: "" }]

    useEffect(() => {
        dispatch(get_order({ filter: { "userId": user._id , _id : params.orderid } }, authorization))
    }, [dispatch])



    const { loading } = useSelector(state => state.loading)
    const { order } = useSelector(state => state.orders)

    //orders

 
    useEffect(() => {

        if (order._id) {
            const index = order.orders.findIndex(o =>   o.productId === params.productid )
            if (index != -1) {
                const status = order.orders[index].status
                console.log(status);
                setStatus(status)
            }
        }

    }, [order])


    return (
        // <!-- Start  Track Order section  -->
        <section className="ec-page-content section-space-p">
            <div className="container">

                {loading && loader()}
 
                {/* <!-- Track Order Content Start --> */}
                {order  && Status != "waiting" &&

                    <div className="ec-trackorder-content col-md-12" >



                        <div className="ec-trackorder-inner">
                            <div className="ec-trackorder-top">
                                <h2 className="ec-order-id">{t("order")} #</h2>
                                <div className="ec-order-detail">
                                    {/* <div>{t("Expected arrival")} 14-02-2021-2022</div>
                                    <div>{t("Grasshoppers")} <span>v534hb</span></div> */}
                                </div>
                            </div>
                            <div className="ec-trackorder-bottom">
                                <div className="ec-progress-track">
                                    <ul id="ec-progressbar">

                                        <li className={myClassname("step0", { "active": Status === "processed" || Status === "designing" || Status === "shipped" || Status === "enroute" || Status === "arrived" })}>

                                            <span className="ec-track-icon">
                                                <img src={ImageLink("ws-track_1.png")} alt="track_order" />
                                            </span>
                                            <span className="ec-progressbar-track"></span>
                                            <span className="ec-track-title">{t("order")}<br />{t("processed")}</span>
                                        </li>


                                        <li className={myClassname("step0", { "active":   Status === "designing" || Status === "shipped" || Status === "enroute" || Status === "arrived" })} >
                                            <span className="ec-track-icon">
                                                <img src={ImageLink("ws-track_2.png")} alt="track_order" />
                                            </span>
                                            <span className="ec-progressbar-track"></span>
                                            <span className="ec-track-title">{t("order")} <br />{t("designing")}</span>
                                        </li>

                                        <li className={myClassname("step0", { "active":  Status === "shipped" || Status === "enroute" || Status === "arrived"  })} >
                                            <span className="ec-track-icon">
                                                <img src={ImageLink("ws-track_3.png")} alt="track_order" />
                                            </span>
                                            <span className="ec-progressbar-track"></span>
                                            <span className="ec-track-title">{t("order")} <br />{t("shipped")}</span>
                                        </li>

                                        <li className={myClassname("step0", { "active": Status === "enroute" || Status === "arrived" })} >
                                            <span className="ec-track-icon">
                                                <img src={ImageLink("ws-track_4.png")} alt="track_order" />
                                            </span>
                                            <span className="ec-progressbar-track"></span>
                                            <span className="ec-track-title">{t("order")} <br />{t("enroute")} </span>
                                        </li>

                                        <li className={myClassname("step0", { "active": Status === "arrived" })} >
                                            <span className="ec-track-icon">
                                                <img src={ImageLink("ws-track_5.png")} alt="track_order" />
                                            </span>
                                            <span className="ec-progressbar-track"></span>
                                            <span className="ec-track-title">{t("order")} <br />{t("arrived")}</span>
                                        </li>

                                    </ul>

                                    {/* processed/designing/shipped/enroute/arrived */}
                                </div>
                            </div>
                        </div>
                    </div>

                }


                {/* <!-- Track Order Content end --> */}
            </div>
        </section>
        // {/* <!-- End  Track Order section  --> */ }
    );
}

export default Track;