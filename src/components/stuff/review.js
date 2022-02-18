import React, { Fragment, useState } from "react"
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


const Review = () => {
    const { t } = useTranslation();
    const [offset, setOffset] = useState(0)


      const handleReview = (e) => {

        if (e.target !== e.currentTarget) {
            console.log(e.target.parentNode.index);
        }
        e.stopPropagation();
        // const slides = Array.from(document.querySelectorAll(".ec-test-outer .slick-dots > li")) 
        // const index = slides.findIndex(s => s.className.includes("slick-active"))

        //   slides.forEach((em , i) =>{
            
        //     if(index == i){ em.classList.add("slick-active"); console.log(index);}
        //     else {
        //         em.classList.remove("slick-active")
        //     }
        //  })

        // let move = 1140;

       

    //     console.log(index);
    //     $(this).siblings().removeClass()
    //     $(this).addClass("slick-active")



    //     $("#ec-testimonial-slider .slick-list .slick-track").css("transform", `translate3d(-${(index * move)}px , 0px , 0px)`);
    //     $("#ec-testimonial-slider .slick-list .slick-track .slick-slide").removeClass("slick-current").removeClass("slick-center")
    //     $("#ec-testimonial-slider .slick-list .slick-track .slick-slide").eq(index).addClass("slick-current").addClass("slick-center")
      } 



  return (
    // <!-- ec testmonial Start -->
    <section className="section ec-test-section section-space-ptb-100 section-space-m">
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <div className="section-title mb-0">
                        <h2 className="ec-bg-title">{t("Testimonial")}</h2>
                        <h2 className="ec-title">{t("Client Review")}</h2>
                        <p className="sub-title mb-3">{t("What say client about us")}</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="ec-test-outer">
                    <ul id="ec-testimonial-slider" className="slick-initialized slick-slider slick-dotted">
                        <div className="slick-list draggable" style={{padding: "0px"}}>
                            <div className="slick-track"
                                style={{opacity: 1 , width: "3420px" , transform: 'translate3d(0px, 0px, 0px)'}}>
                                <div className="slick-slide slick-current" data-slick-index="0"
                                    aria-hidden="true" style={{width: "1140px"}} role="tabpanel" id="slick-slide40">
                                    <div>
                                        <li className="ec-test-item" style={{width: "100%", display: "inline-block"}}>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 version="1.1" id="Capa_1"
                                                x="0px" y="0px" width="508.044px" height="508.044px"
                                                viewBox="0 0 508.044 508.044"
                                                style={{enableBackground:"new 0 0 508.044 508.044"}} 
                                                src="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/testimonial/top-quotes.svg"
                                                className="svg_img test_svg top" alt="">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M0.108,352.536c0,66.794,54.144,120.938,120.937,120.938c66.794,0,120.938-54.144,120.938-120.938    s-54.144-120.937-120.938-120.937c-13.727,0-26.867,2.393-39.168,6.61C109.093,82.118,230.814-18.543,117.979,64.303    C-7.138,156.17-0.026,348.84,0.114,352.371C0.114,352.426,0.108,352.475,0.108,352.536z">
                                                        </path>
                                                        <path
                                                            d="M266.169,352.536c0,66.794,54.144,120.938,120.938,120.938s120.938-54.144,120.938-120.938S453.9,231.599,387.106,231.599    c-13.728,0-26.867,2.393-39.168,6.61C375.154,82.118,496.875-18.543,384.04,64.303C258.923,156.17,266.034,348.84,266.175,352.371    C266.175,352.426,266.169,352.475,266.169,352.536z">
                                                        </path>
                                                    </g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                            </svg>
                                            <div className="ec-test-inner">
                                                <div className="ec-test-img"><img alt="testimonial" title="testimonial"
                                                        src="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/testimonial/1.jpg" />
                                                </div>
                                                <div className="ec-test-content">
                                                    <div className="ec-test-desc">Lorem Ipsum is simply dummy text of the
                                                        printing andjjjjjj8787
                                                        typesetting industry. Lorem Ipsum has been the industry's
                                                        standard dummy text
                                                        ever since the 1500s, when an unknown printer took a galley of
                                                        type and
                                                        scrambled it to make a type specimen</div>
                                                    <div className="ec-test-name">John Doe</div>
                                                    <div className="ec-test-designation">General Manager</div>
                                                    <div className="ec-test-rating">
                                                        <i className="ecicon eci-star fill"></i>
                                                        <i className="ecicon eci-star fill"></i>
                                                        <i className="ecicon eci-star fill"></i>
                                                        <i className="ecicon eci-star fill"></i>
                                                        <i className="ecicon eci-star fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 version="1.1" id="Capa_1"
                                                x="0px" y="0px" width="508.044px" height="508.044px"
                                                viewBox="0 0 508.044 508.044"
                                                style={{enableBackground:"new 0 0 508.044 508.044"}} 
                                                src="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/testimonial/bottom-quotes.svg"
                                                className="svg_img test_svg bottom" alt="">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M507.93,155.673c0-0.055,0.006-0.11,0.006-0.165c0-66.793-54.145-120.938-120.938-120.938S266.061,88.714,266.061,155.508    c0,66.794,54.15,120.938,120.938,120.938c13.727,0,26.867-2.393,39.162-6.609c-27.209,156.09-148.93,256.752-36.096,173.905    C515.182,351.874,508.07,159.198,507.93,155.673z">
                                                        </path>
                                                        <path
                                                            d="M120.938,276.445c13.727,0,26.867-2.393,39.168-6.609c-27.216,156.09-148.937,256.752-36.102,173.905    c125.117-91.867,118.006-284.543,117.865-288.068c0-0.055,0.006-0.11,0.006-0.165c0-66.793-54.144-120.938-120.937-120.938    C54.144,34.57,0,88.714,0,155.508C0,222.302,54.15,276.445,120.938,276.445z">
                                                        </path>
                                                    </g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                            </svg>
                                        </li>
                                    </div>
                                </div>
                                <div className="slick-slide" data-slick-index="1" aria-hidden="true" style={{width: "1140px"}}
                                    tabIndex="-1" role="tabpanel" id="slick-slide41">
                                    <div>
                                        <li className="ec-test-item " style={{width: "100%", display: "inline-block"}}>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 version="1.1" id="Capa_1"
                                                x="0px" y="0px" width="508.044px" height="508.044px"
                                                viewBox="0 0 508.044 508.044"
                                                style={{enableBackground:"new 0 0 508.044 508.044"}} 
                                                src="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/testimonial/top-quotes.svg"
                                                className="svg_img test_svg top" alt="">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M0.108,352.536c0,66.794,54.144,120.938,120.937,120.938c66.794,0,120.938-54.144,120.938-120.938    s-54.144-120.937-120.938-120.937c-13.727,0-26.867,2.393-39.168,6.61C109.093,82.118,230.814-18.543,117.979,64.303    C-7.138,156.17-0.026,348.84,0.114,352.371C0.114,352.426,0.108,352.475,0.108,352.536z">
                                                        </path>
                                                        <path
                                                            d="M266.169,352.536c0,66.794,54.144,120.938,120.938,120.938s120.938-54.144,120.938-120.938S453.9,231.599,387.106,231.599    c-13.728,0-26.867,2.393-39.168,6.61C375.154,82.118,496.875-18.543,384.04,64.303C258.923,156.17,266.034,348.84,266.175,352.371    C266.175,352.426,266.169,352.475,266.169,352.536z">
                                                        </path>
                                                    </g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                            </svg>
                                            <div className="ec-test-inner">
                                                <div className="ec-test-img"><img alt="testimonial" title="testimonial"
                                                        src="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/testimonial/2.jpg" />
                                                </div>
                                                <div className="ec-test-content">
                                                    <div className="ec-test-desc">Lorem Ipsum is simply dummy text of the 111
                                                        printing and
                                                        typesetting industry. Lorem Ipsum has been the industry's
                                                        standard dummy text
                                                        ever since the 1500s, when an unknown printer took a galley of
                                                        type and
                                                        scrambled it to make a type specimen</div>
                                                    <div className="ec-test-name">John Doe</div>
                                                    <div className="ec-test-designation">General Manager</div>
                                                    <div className="ec-test-rating">
                                                        <i className="ecicon eci-star fill"></i>
                                                        <i className="ecicon eci-star fill"></i>
                                                        <i className="ecicon eci-star fill"></i>
                                                        <i className="ecicon eci-star fill"></i>
                                                        <i className="ecicon eci-star fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 version="1.1" id="Capa_1"
                                                x="0px" y="0px" width="508.044px" height="508.044px"
                                                viewBox="0 0 508.044 508.044"
                                                style={{enableBackground:"new 0 0 508.044 508.044"}} 
                                                src="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/testimonial/bottom-quotes.svg"
                                                className="svg_img test_svg bottom" alt="">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M507.93,155.673c0-0.055,0.006-0.11,0.006-0.165c0-66.793-54.145-120.938-120.938-120.938S266.061,88.714,266.061,155.508    c0,66.794,54.15,120.938,120.938,120.938c13.727,0,26.867-2.393,39.162-6.609c-27.209,156.09-148.93,256.752-36.096,173.905    C515.182,351.874,508.07,159.198,507.93,155.673z">
                                                        </path>
                                                        <path
                                                            d="M120.938,276.445c13.727,0,26.867-2.393,39.168-6.609c-27.216,156.09-148.937,256.752-36.102,173.905    c125.117-91.867,118.006-284.543,117.865-288.068c0-0.055,0.006-0.11,0.006-0.165c0-66.793-54.144-120.938-120.937-120.938    C54.144,34.57,0,88.714,0,155.508C0,222.302,54.15,276.445,120.938,276.445z">
                                                        </path>
                                                    </g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                                <g>
                                                </g>
                                            </svg>
                                        </li>
                                    </div>
                                </div>
                              
                            </div>
                        </div>

                        <ul className="slick-dots" role="tablist">
                            <li onClick={(e) => {handleReview(e)}} className="slick-active" role="presentation"><img alt="testimonial" title="testimonial"
                                    src="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/testimonial/1.jpg" />
                            </li>
                            <li onClick={(e) => {handleReview(e)}} role="presentation"><img alt="testimonial" title="testimonial"
                                    src="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/testimonial/2.jpg" />
                            </li>
                          
                        </ul>

                    </ul>
                </div>
            </div>
        </div>
    </section>
    // {/* <!-- ec testmonial end --> */}
  );
}  

export default Review;