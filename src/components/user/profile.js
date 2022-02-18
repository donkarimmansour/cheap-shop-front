import React, { useEffect, useState, Fragment } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { Field, Formik, Form } from "formik"
import { isAuthentication } from "../../shared/auth"
import { getCookie } from "../../shared/cookie"
import { loader } from "../../shared/elements"
import * as yup from 'yup'
import { getLocalStorage } from "../../shared/localStorage"
import myClassName from "classnames"
import { AddressAccounts, EditAccounts, updateImageProfile } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { get_orders } from "../../redux/actions/orders";
import { ImageLink } from "../../shared/funs";
import { CLEAR_MESSAGE } from "../../redux/constans/message"
import { set_single_image } from "../../redux/actions/file"



const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        if (!isAuthentication()) {
            navigate("/")
            return
        }
        dispatch({ type: CLEAR_MESSAGE })

    }, [])




    const [type, setType] = useState("account")
    const [Orders, setOrders] = useState([])

    const { t } = useTranslation();

    const authorization = isAuthentication() ? { "Authorization": `bearer ${getCookie("token")}` } : [{ _id: "" }]
    const user = localStorage.getItem("user") ? getLocalStorage("user") : [{ _id: "" }]

    const { loading } = useSelector(state => state.loading)
    const { errorMsg, successMsg } = useSelector(state => state.message)
    const { orders } = useSelector(state => state.orders)

    //orders

    useEffect(() => {
        dispatch(get_orders({ filter: { "userId": user._id }, expend: "images-productId" }, authorization))
    }, [dispatch])


    useEffect(() => {
        setOrders(orders)
    }, [orders])


    useEffect(() => {
        if (successMsg === "updated") {
            alert("updated")
        }
    }, [successMsg])


    //form
    const [initial, setInitial] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        address: "",
        country: "",
        city: "",
        state: "",
        phone: "",
        postcode: "",
    })


    const onSubmit = values => {

        if (type && type == "account") {
            dispatch(EditAccounts(user._id, values, authorization))

        } else if (type && type == "address") {

            dispatch(AddressAccounts(user._id, values, authorization))
        }

    }


    const Validator = yup.object().shape({
        firstname: yup.string().required(t("firstname field is required")),
        lastname: yup.string().required(t("lastname field is required")),
        email: yup.string().required(t("email field is required")).email("email must be email"),
        address: yup.string().required(t("address field is required")),
        country: yup.string().required(t("country field is required")),
        city: yup.string().required(t("city field is required")),

    })



    const editAccount = () => {
        setType("account")
        setInitial({
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            email: user.email || "",
            address: user.address || "",
            country: user.country || "",
            city: user.city || "",
            state: user.state || "",
            phone: user.phone || "",
            postcode: user.postcode || "",
            password: ""
        })
        document.querySelector("#edit_modal").classList.add("show")
    }


    const editAddress = () => {
        setType("address")

        setInitial({
            firstname: user.shippingaddress ? user.shippingaddress.firstname ? user.shippingaddress.firstname : "" : "",
            lastname: user.shippingaddress ? user.shippingaddress.lastname ? user.shippingaddress.lastname : "" : "",
            email: user.shippingaddress ? user.shippingaddress.email ? user.shippingaddress.email : "" : "",
            address: user.shippingaddress ? user.shippingaddress.address ? user.shippingaddress.address : "" : "",
            country: user.shippingaddress ? user.shippingaddress.country ? user.shippingaddress.country : "" : "",
            city: user.shippingaddress ? user.shippingaddress.city ? user.shippingaddress.city : "" : "",
            state: user.shippingaddress ? user.shippingaddress.state ? user.shippingaddress.state : "" : "",
            phone: user.shippingaddress ? user.shippingaddress.phone ? user.shippingaddress.phone : "" : "",
            postcode: user.shippingaddress ? user.shippingaddress.postcode ? user.shippingaddress.postcode : "" : "",
            password: ""
        })

        document.querySelector("#edit_modal").classList.add("show")
    }

    //////////////
    const handleAccordions = (e) => {
        const accordions = document.querySelectorAll(".ec-user-account .ec-shop-rightside")
        accordions.forEach(em => {
            em.style.display = "none"
            if (em.id == e.target.getAttribute("data-id")) {
                em.style.display = "block"
            }
        })
    }

    const closeModel = () => {
        document.querySelector("#edit_modal").classList.remove("show")
    }

    //upload image
    const uploadImage = (e) => {

        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            console.log(img);
            //return
            const formData = new FormData();
            formData.append('image', img);
            formData.append('size', 140);

            console.log(formData.get("image"));

            dispatch(set_single_image(formData, authorization, user._id))

        }
    }




    return (
        // <!-- Start user profile -->

        <Fragment>
            {user && user.firstname &&



                <section className="ec-page-content ec-vendor-uploads ec-user-account section-space-p">

                    {loading && loader()}

                    <div className="modal fade" id="edit_modal" style={{ display: "block" }} aria-modal="true" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="row">


                                        <div className="ec-vendor-block-img space-bottom-30">

                                            <div className="ec-vendor-block-bg cover-upload">

                                                <div className="thumb-upload">

                                                    <div className="thumb-preview ec-preview">
                                                        <div className="image-thumb-preview">
                                                            <img className="image-thumb-preview ec-image-preview v-img" src={ImageLink("ws-banner.jpg")} alt="edit" />
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="ec-vendor-block-detail">

                                                <div className="thumb-upload">
                                                    <div className="thumb-edit">
                                                        <input type="file" id="thumbUpload02" className="ec-image-upload" accept=".png, .jpg, .jpeg" onChange={(e) => { uploadImage(e) }} />
                                                        <label><svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 32 32" width="32px" height="32px" src={ImageLink("ws-edit.svg")} className="svg_img header_svg" alt="edit"><path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"></path></svg></label>
                                                    </div>
                                                    <div className="thumb-preview ec-preview">
                                                        <div className="image-thumb-preview">
                                                            <img className="image-thumb-preview ec-image-preview v-img" src={ImageLink(user.image.imageUrl)} alt="edit" />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>




                                            <div className="ec-vendor-upload-detail">



                                                {
                                                    <Formik
                                                        initialValues={initial}
                                                        onSubmit={onSubmit}
                                                        validationSchema={Validator}
                                                        enableReinitialize >

                                                        {
                                                            ({ touched, errors, isValid }) => (

                                                                <Form className="row g-3">

                                                                    <div className="col-md-6 space-t-15">
                                                                        <label className="form-label" >{t("First Name")}*</label>
                                                                        <Field className="form-control" type="text" name="firstname" placeholder={t("Enter your first name")} required="" />
                                                                        <small className="input-error" style={{ display: errors.firstname ? "block" : "none" }} >{touched.firstname && errors.firstname}</small>
                                                                    </div>

                                                                    <div className="col-md-6 space-t-15">
                                                                        <label className="form-label" >{t("Last Name")}*</label>

                                                                        <Field className="form-control" type="text" name="lastname" placeholder={t("Enter your last name")} required="" />
                                                                        <small className="input-error" style={{ display: errors.lastname ? "block" : "none" }} >{touched.lastname && errors.lastname}</small> </div>

                                                                    <div className={myClassName("space-t-15", { "col-md-12": type == "account", "col-md-6": type == "address" })}>
                                                                        <label className="form-label" >{t("Email")}*</label>
                                                                        <Field className="form-control" type="email" name="email" placeholder={t("Enter your email")} required="" />
                                                                        <small className="input-error" style={{ display: errors.email ? "block" : "none" }} >{touched.email && errors.email}</small>
                                                                    </div>

                                                                    {type == "account" &&
                                                                        <div className="col-md-6 space-t-15">
                                                                            <label className="form-label" >{t("Password")}*</label>
                                                                            <Field className="form-control" type="password" name="password" placeholder={t("Enter your password")} />
                                                                        </div>
                                                                    }

                                                                    <div className="col-md-6 space-t-15">
                                                                        <label className="form-label" >{t("Phone Number")}</label>
                                                                        <Field className="form-control" type="text" name="phone" placeholder={t("Enter your phone number")} />
                                                                    </div>

                                                                    <div className="col-md-12 space-t-15">
                                                                        <label className="form-label" >{t("Address")}*</label>
                                                                        <small className="input-error" style={{ display: errors.address ? "block" : "none" }} >{touched.address && errors.address}</small>
                                                                        <Field className="form-control" type="text" name="address" placeholder={t("Enter your Address")} required="" />
                                                                    </div>


                                                                    <div className="col-md-6 space-t-15">
                                                                        <label className="form-label" >{t("Country")}*</label>
                                                                        <Field className="form-control" type="text" name="country" placeholder={t("Enter your Country")} />
                                                                        <small className="input-error" style={{ display: errors.country ? "block" : "none" }} >{touched.country && errors.country}</small>
                                                                    </div>

                                                                    <div className="col-md-6 space-t-15">
                                                                        <label className="form-label" >{t("City")}*</label>
                                                                        <Field className="form-control" type="text" name="city" placeholder={t("Enter your City")} required="" />
                                                                        <small className="input-error" style={{ display: errors.city ? "block" : "none" }} >{touched.city && errors.city}</small>
                                                                    </div>

                                                                    <div className="col-md-6 space-t-15">
                                                                        <label className="form-label" >{t("Post Code")}</label>
                                                                        <Field className="form-control" type="text" name="postcode" placeholder="Post Code" placeholder={t("Enter your Post Code")} />
                                                                    </div>

                                                                    <div className="col-md-6 space-t-15">
                                                                        <label className="form-label" >{t("Region State")}</label>
                                                                        <Field className="form-control" type="text" name="state" placeholder={t("Enter your state")} required="" />
                                                                    </div>


                                                                    <div className="col-md-12 space-t-15" style={{ textAlign: "center", marginTop: "10px" }}>
                                                                        {errorMsg && <span className="form-error" >{typeof errorMsg == "string" ? t(errorMsg) : t(errorMsg[0])}</span>}
                                                                    </div>



                                                                    <div className="col-md-12 space-t-15 mt-2">
                                                                        <button disabled={(!isValid || loading)} type="submit" className="btn btn-primary ">{("Update")}</button>
                                                                        <button onClick={closeModel} type="button" className="btn btn-lg btn-secondary qty_close m-2" >{t("Close")}</button>
                                                                    </div>



                                                                </Form>



                                                            )

                                                        }</Formik>
                                                }


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>







                    <div className="container">
                        <div className="row">
                            {/* <!-- Sidebar Area Start --> */}
                            <div className="ec-shop-leftside ec-vendor-sidebar col-lg-3 col-md-12">
                                <div className="ec-sidebar-wrap">
                                    {/* <!-- Sidebar Category Block --> */}
                                    <div className="ec-sidebar-block">
                                        <div className="ec-vendor-block">

                                            <div className="ec-vendor-block-bg"></div>
                                            <div className="ec-vendor-block-detail">
                                                <img className="v-img" src={ImageLink(user.image.imageUrl)} alt="vendor image" />
                                                <h5>{`${user.firstname} ${user.lastname}`}</h5>
                                            </div>

                                            <div className="ec-vendor-block-items">
                                                <ul>
                                                    <li><a href="#" onClick={handleAccordions} data-id="profile-account">{t("User Profile")}</a></li>
                                                    <li><a href="#" onClick={handleAccordions} data-id="profile-orders">{t('Orders')}</a></li>
                                                    <li><Link to="/wishlist">{t("Wishlist")}</Link></li>
                                                    <li><Link to="/cart">{t("Cart")}</Link></li>
                                                    <li><Link to="/checkout">{t('Checkout')}</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>













                            <div className="ec-shop-rightside col-lg-9 col-md-12" id="profile-account" >
                                <div className="ec-vendor-dashboard-card ec-vendor-setting-card">
                                    <div className="ec-vendor-card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="ec-vendor-block-profile">

                                                    <div className="ec-vendor-block-img space-bottom-30">

                                                        <div className="ec-vendor-block-bg">
                                                            <button href="#" className="btn btn-lg btn-primary" title="Edit Detail" onClick={editAccount}>{t("Edit Detail")}</button>
                                                        </div>

                                                        <div className="ec-vendor-block-detail">
                                                            <img className="v-img" src={ImageLink(user.image.imageUrl)} alt="vendor image" />
                                                            <h5 className="name">{`${user.firstname} ${user.lastname}`}</h5>
                                                        </div>

                                                        <p>{t("Hello")} <span>{`${user.firstname} ${user.lastname}`}!</span></p>
                                                        <p>{t("From your account you can easily view and track orders. You can manage and change your account information like address, contact information and history of orders.")}</p>

                                                    </div>

                                                    <h5>{t("Account Information")}</h5>




                                                    <div className="row">



                                                        <div className="col-md-6 col-sm-12">
                                                            <div className="ec-vendor-detail-block ec-vendor-block-address mar-b-30">
                                                                <h6>{t("Account Details")} <svg onClick={editAccount} xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 32 32" width="32px" height="32px" src={ImageLink("ws-edit.svg")} className="svg_img pro_svg" alt="edit"><path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"></path></svg></h6>
                                                                <ul>
                                                                    <li><strong>{t("Home")} : </strong>{`${user.address}, ${user.city}, ${user.country}`}.</li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-sm-12">
                                                            <div className="ec-vendor-detail-block ec-vendor-block-address">
                                                                <h6>{t("Shipping Address")} <svg onClick={editAddress} xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 32 32" width="32px" height="32px" src={ImageLink("ws-edit.svg")} className="svg_img pro_svg" alt="edit"><path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"></path></svg></h6>
                                                                <ul>
                                                                    <li><strong>{("Address")} : </strong>
                                                                        {
                                                                            `${user.shippingaddress ? user.shippingaddress.address ? user.shippingaddress.address : "" : ""} ,
                                                            ${user.shippingaddress ? user.shippingaddress.city ? user.shippingaddress.city : "" : ""} ,
                                                            ${user.shippingaddress ? user.shippingaddress.country ? user.shippingaddress.country : "" : ""}
                                                            `
                                                                        }.</li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>























                            <div className="ec-shop-rightside col-lg-9 col-md-12" id="profile-orders" style={{ display: "none" }}>


                                <div className="ec-vendor-dashboard-card">
                                    <div className="ec-vendor-card-header">
                                        <h5>{t("Product History")}</h5>
                                        <div className="ec-header-btn">
                                            <Link to="/" className="btn btn-lg btn-primary">{t("Shop Now")}</Link>
                                        </div>
                                    </div>


                                    {Orders && Orders.length > 0 &&


                                        <div className="ec-vendor-card-body">
                                            <div className="ec-vendor-card-table">
                                                <table className="table ec-table" style={{ width: "100%" }}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">{("Image")}</th>
                                                            <th scope="col">{("Name")}</th>
                                                            <th scope="col">{("Price")}</th>
                                                            <th scope="col">{('Qty')}</th>
                                                            <th scope="col">{("Color")}</th>
                                                            <th scope="col">{("Size")}</th>
                                                            <th scope="col">{("Traking")}</th>
                                                            <th scope="col">{("Track")}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {Orders.map((order, oi) => {
                                                            {
                                                                return order.orders.map((ordr, coi) => {
                                                                    return (
                                                                        <tr key={coi}>
                                                                            <td><Link to={`/product/${ordr.productId.category}/${ordr.productId._id}`}><img className="prod-img" src={ImageLink(ordr.images.imagesUrl[0])} alt="product image" /></Link></td>
                                                                            <td><Link to={`/product/${ordr.productId.category}/${ordr.productId._id}`}><span>{ordr.name}</span></Link></td>
                                                                            <td><span>${ordr.price}</span></td>
                                                                            <td><span>{ordr.quantity}</span></td>
                                                                            <td><span>{ordr.color}</span></td>
                                                                            <td><span>{ordr.size}</span></td>
                                                                            <td><span>{ordr.tracking}</span></td>
                                                                            <td><span className="tbl-btn"><Link className="btn btn-lg btn-primary" to={`/track/${order._id}/${ordr.productId._id}`}>Track</Link></span></td>
                                                                        </tr>

                                                                    )

                                                                })
                                                            }

                                                        })}




                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    }


                                </div>


                            </div>






                        </div>
                    </div>
                </section>

            } 
        </Fragment>
        // <!-- End user profile -->
    );
}

export default Profile;
