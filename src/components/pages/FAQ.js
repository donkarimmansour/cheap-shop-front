import React from "react"
import { useTranslation } from 'react-i18next';



const FAQ = () => {
    const { t } = useTranslation();

    const handleFaq = (e) => {

        console.log(e.target.parentElement);
        let em = e.target.parentElement

        if(e.target.parentElement.className.includes("ec-faq-title")){
           em = e.target.parentElement.parentElement
        }else {
           em = e.target.parentElement
        }
        if (em.querySelector(".ec-faq-content.ec-faq-dropdown").style.display == "block")
            em.querySelector(".ec-faq-content.ec-faq-dropdown").style.display = "none"
        else
            em.querySelector(".ec-faq-content.ec-faq-dropdown").style.display = "block"

    }

  return (  
    // <!-- Start faq pag -->
    <section className="ec-page-content section-space-p">
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <div className="section-title">
                        <h2 className="ec-bg-title">{t("FAQ")}</h2>
                        <h2 className="ec-title">{t("FAQ")}</h2>
                        <p className="sub-title mb-3">{t("Customer service management")}</p>
                    </div>
                </div>
                <div className="ec-faq-wrapper">
                    <div className="ec-faq-container">
                        <h2 className="ec-faq-heading">{t("FAQ text")}</h2>
                        <div id="ec-faq">

                            <div className="col-sm-12 ec-faq-block" onClick={(e) =>  {handleFaq(e)} } >
                                <h4 className="ec-faq-title">{t("FAQ text one")} <i className="fas fa-angle-down"></i></h4>
                                <div className="ec-faq-content ec-faq-dropdown">
                                    <p>{t("FAQ description one")} </p>
                                </div>
                            </div>
                            <div className="col-sm-12 ec-faq-block" onClick={(e) =>  {handleFaq(e)} }>
                                <h4 className="ec-faq-title">{t("FAQ text two")} <i className="fas fa-angle-down"></i></h4>
                                <div className="ec-faq-content ec-faq-dropdown">
                                    <p>{t("FAQ description two")} </p>
                                </div>
                            </div>
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    // // <!-- End faq pag -->
    
  );
}  

export default FAQ ;
