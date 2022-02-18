import React, {  useEffect, useState , Fragment } from "react"
import { useNavigate , Link , useParams } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import * as yup from 'yup'
import { Field, Formik, Form } from "formik"
import { isAuthentication} from "../../shared/auth"
import { loader } from "../../shared/elements"
import { useDispatch, useSelector } from "react-redux";
import { ConfirmEmailAuths, LoginAuths } from "../../redux/actions/user";
import { CLEAR_MESSAGE } from "../../redux/constans/message"

const Login = (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch() 

    useEffect(() => {
        dispatch({ type: CLEAR_MESSAGE })

        if (isAuthentication()) {
            navigate("/profile")
        }

         if(params.id){
            dispatch(ConfirmEmailAuths(params.id))
         }

         dispatch({ type: CLEAR_MESSAGE })

    }, [])

    const { t } = useTranslation();
    const { loading } = useSelector(state => state.loading)
    const { errorMsg , successMsg } = useSelector(state => state.message)


    useEffect(() => {
        if (successMsg === "okey") {
           navigate("/")
        }
    }, [successMsg])




    const initialValues = {
        email: "",
        password: "",
    }

    const onSubmit = values => {
        dispatch(LoginAuths(values))
    }

    const  LoginValidator = yup.object().shape({
        email: yup.string().required(t("email field is required")).email("email must be email"),
        password: yup.string().required(t("password field is required")),
    })

    
    const Done = () => <Fragment>
    <div className="confirmed" style={{display:"block" }}id="confirmed">
        <h5>{t("Done")}!</h5>
        <p>{t("Confirmation succeeded, you can login now")}</p>
        <button onClick={ () => {
             dispatch({ type: CLEAR_MESSAGE })

         } }>{t("OK")}</button>
    </div></Fragment>



    return (
        // <!-- Start login page-->
        <section className="ec-page-content section-space-p">
        
            <div className="container">

            {loading && loader()}
            {successMsg === "confirmed" && Done()}

                <div className="row">
                    <div className="col-md-12 text-center">
                        <div className="section-title">
                            <h2 className="ec-bg-title">{t("Log In")}</h2>
                            <h2 className="ec-title">{t("Log In")}</h2>
                            <p className="sub-title mb-3">{t("Best place to buy products")}</p>
                        </div>
                    </div>
                    <div className="ec-login-wrapper">
                        <div className="ec-login-container">
                            <div className="ec-login-form">


                                {
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={onSubmit}
                                        validationSchema={LoginValidator}>

                                        {
                                            ({ touched, errors, isValid, dirty }) => (

                                                <Form action="#" method="post">

                                                     <span className="ec-login-wrap">
                                                        <label>{t("Email Address")}*</label>
                                                        <small className="input-error" style={{ display: errors.email ? "block" : "none" }} >{touched.email && errors.email}</small>
                                                        <Field type="text" name="email" placeholder={t("Enter your email")} required="" />
                                                    </span>

                                                    <span className="ec-login-wrap">
                                                        <label>{t("Password")}*</label>
                                                        <small className="input-error" style={{ display: errors.password ? "block" : "none" }} >{touched.password && errors.password}</small>
                                                        <Field type="password" name="password" placeholder={t("Enter your password")} required="" />
                                                    </span>


                                                    {errorMsg && <span className="ec-login-wrap form-error">{ typeof errorMsg == "string" ? t(errorMsg) : t(errorMsg[0])}</span>}

                                                    <span className="ec-login-wrap ec-login-fp">
                                                        <label><Link to="/forgot">{t("Forgot Password?")}</Link></label>
                                                    </span>

                                                    <span className="ec-login-wrap ec-login-btn">
                                                        <button disabled={( !dirty || !isValid || loading)} className="btn btn-primary" type="submit">{t("Login")}</button>
                                                        <Link to="/register" className="btn btn-secondary">{t("Register")}</Link>
                                                    </span>

                                                </Form>


                                            )

                                        }</Formik>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        // {/* <!-- End login page--> */}
    );
}

export default Login;
