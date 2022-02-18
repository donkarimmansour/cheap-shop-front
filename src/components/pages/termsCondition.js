import React, { Fragment } from "react"
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Breadcrumb from "../stuff/breadcrumb";


const TermsCondition = () => {
    const { t } = useTranslation();


  return (

    // <!-- Start Terms & Condition page -->

    <Fragment>
          <Breadcrumb  name="Terms Condition"/>

    <section className="ec-page-content section-space-p">
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <div className="section-title">
                        <h2 className="ec-bg-title">Terms &amp; Condition</h2>
                        <h2 className="ec-title">Terms &amp; Condition</h2>
                        <p className="sub-title mb-3">Welcome to the ekka multivendor marketplace</p>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="ec-common-wrapper">
                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">Welcome to Ekka Multi Market.</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <b>Lorem
                                        Ipsum is simply dutmmy text</b> ever since the 1500s, when an unknown printer
                                    took a galley of type and scrambled it to make a type specimen book. It has survived
                                    not only five centuries, but also the leap into electronic typesetting, remaining
                                    essentially unchanged. <b>Lorem Ipsum is simply dutmmy text</b></p>
                            </div>
                        </div>
                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">Ekka Websites</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <b>Lorem
                                        Ipsum is simply dutmmy text</b> ever since the 1500s, when an unknown printer
                                    took a galley of type and scrambled it to make a type specimen book. It has survived
                                    not only five centuries, but also the leap into electronic typesetting, remaining
                                    essentially unchanged. <b>Lorem Ipsum is simply dutmmy text</b></p>
                            </div>
                        </div>
                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">How browsing and vendor works?</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <b>Lorem
                                        Ipsum is simply dutmmy text</b> ever since the 1500s, when an unknown printer
                                    took a galley of type and scrambled it to make a type specimen book. It has survived
                                    not only five centuries, but also the leap into electronic typesetting, remaining
                                    essentially unchanged. <b>Lorem Ipsum is simply dutmmy text</b></p>
                            </div>
                        </div>
                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">Becoming an vendor</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <b>Lorem
                                        Ipsum is simply dutmmy text</b> ever since the 1500s, when an unknown printer
                                    took a galley of type and scrambled it to make a type specimen book. It has survived
                                    not only five centuries, but also the leap into electronic typesetting, remaining
                                    essentially unchanged. <b>Lorem Ipsum is simply dutmmy text</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

{/* // <!-- End Terms & Condition page --> */}

</Fragment>



  );
}  

export default TermsCondition;