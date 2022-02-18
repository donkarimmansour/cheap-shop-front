import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { ImageLink } from '../../shared/funs';
import { get_main } from "../../redux/actions/main";
import { useDispatch, useSelector } from "react-redux";
import myClassNames from 'classnames';


const MainSlider = (props) => {
    const dispatch = useDispatch()
    const [Main, setMain] = useState([])
    const [offset, setOffset] = useState(0)
    const [SlideWidth, setSlideWidth] = useState("1349px")

    const limit = props.limit
    const skip = props.skip
    const sort = props.sort
    const { main } = useSelector(state => state.main)

    useEffect(() => {
        setSlideWidth(document.getElementsByTagName("body")[0].offsetWidth + "px")
    }, [window.innerWidth])

    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide()
        }, 10000);
        return () => {
            clearInterval(autoSlide)
        }
    }, [])

    useEffect(() => {
        dispatch(get_main({ limit, skip, sort, expend: "image" }))
    }, [dispatch])

    useEffect(() => {
        setMain(main)
    }, [main])



    const nextSlide = () => {

        const sildes = Array.from(document.querySelectorAll(".sticky-header-next-sec.ec-main-slider .swiper-wrapper .swiper-slide"))
        const bullets = Array.from(document.querySelectorAll(".sticky-header-next-sec.ec-main-slider .swiper-pagination-bullet"))

        

        let len = sildes.length
        const index = sildes.findIndex(e => e.className.includes("swiper-slide-active"))
        let move = sildes[index].offsetWidth;

        if (index == (len - 1)) {

            sildes[index].classList.remove("swiper-slide-active")
            sildes[0].classList.add("swiper-slide-active")
            bullets[index].classList.remove("swiper-pagination-bullet-active")
            bullets[0].classList.add("swiper-pagination-bullet-active")


            setOffset(0)
            return false;

        } else {

            sildes[index].classList.remove("swiper-slide-active")
            bullets[index].classList.remove("swiper-pagination-bullet-active")
            sildes[index + 1].classList.add("swiper-slide-active")
            bullets[index + 1].classList.add("swiper-pagination-bullet-active")

            setOffset(((index + 1) * move))
            return false

        }

    }
    const prevSlide = () => {

        const sildes = Array.from(document.querySelectorAll(".sticky-header-next-sec.ec-main-slider .swiper-wrapper .swiper-slide"))
        const bullets = Array.from(document.querySelectorAll(".sticky-header-next-sec.ec-main-slider .swiper-pagination-bullet"))

        let len = sildes.length
        const index = sildes.findIndex(e => e.className.includes("swiper-slide-active"))
        let move = sildes[index].offsetWidth;

        if (index == 0) {

            sildes[index].classList.remove("swiper-slide-active")
            sildes[len - 1].classList.add("swiper-slide-active")
            bullets[index].classList.remove("swiper-pagination-bullet-active")
            bullets[len - 1].classList.add("swiper-pagination-bullet-active")

            setOffset(((len - 1) * move))
            return false;

        } else {

            sildes[index].classList.remove("swiper-slide-active")
            sildes[index - 1].classList.add("swiper-slide-active")
            bullets[index].classList.remove("swiper-pagination-bullet-active")
            bullets[index - 1].classList.add("swiper-pagination-bullet-active")

            setOffset(((index - 1) * move))

            return false

        }
    }

    const paginationBullets = (currentindex) => {
        const sildes = Array.from(document.querySelectorAll(".sticky-header-next-sec.ec-main-slider .swiper-wrapper .swiper-slide"))
        const bullets = Array.from(document.querySelectorAll(".sticky-header-next-sec.ec-main-slider .swiper-pagination-bullet"))

        const index = sildes.findIndex(e => e.className.includes("swiper-slide-active"))
        let move = sildes[index].offsetWidth;

        sildes[index].classList.remove("swiper-slide-active")
        bullets[index].classList.remove("swiper-pagination-bullet-active")
        sildes[currentindex].classList.add("swiper-slide-active")
        bullets[currentindex].classList.add("swiper-pagination-bullet-active")

        setOffset(((currentindex) * move))

    }

    return (
        // <!-- Main Slider Start -->  
        <Fragment> {Main && Main.length > 0 &&

            <div className="sticky-header-next-sec ec-main-slider section section-space-pb">
                <div className="ec-slider swiper-container main-slider-nav main-slider-dot swiper-container-initialized swiper-container-horizontal">
                    {/* <!-- Main slider --> */}

                    <div className="swiper-wrapper h-auto" 
                        style={{ transition: "all 0ms ease 0s", transform: `translate3d(-${offset}px, 0px, 0px)` }}>

                        {Main.map((main, mi) => {
                            return (  

                                <div key={mi} className={myClassNames("ec-slide-item swiper-slide d-flex ", { "swiper-slide-active": mi == 0 })} style={{ width : SlideWidth , minWidth : SlideWidth  , overflowY : "hidden", 
                                backgroundImage: `url(${ImageLink(main.image.imageUrl)})` , backgroundSize : "cover" , backgroundPosition : "center" , backgroundRepeat : "no-repeat" }} 
                                role="group" aria-label="3 / 4">

                                    <div className="container align-self-center">
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 align-self-center">
                                                <div className="ec-slide-content slider-animation">
                                                    <h1 className="ec-slide-title">{main.name}</h1>
                                                    <h2 className="ec-slide-stitle">{main.description}</h2>
                                                    <p>{main.extra}</p>
                                                    <a href={main.link} className="btn btn-lg btn-secondary">{main.btn}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            )

                        })}



                    </div>


                    <div className="swiper-pagination swiper-pagination-white swiper-pagination-clickable swiper-pagination-bullets">
                        {Main.map((main, mi) => {
                            return (
                                <span key={mi} onClick={(e) => { paginationBullets(mi) }} className={myClassNames("swiper-pagination-bullet", { "swiper-pagination-bullet-active": mi == 0 })} tabIndex="0" role="button" aria-label="Go to slide 1"></span>
                            )
                        })}
                    </div>


                    <div className="swiper-buttons">
                        <div className="swiper-button-next" onClick={(e) => { nextSlide() }} tabIndex="0" role="button" aria-label="Next slide" ><i className="fa-solid fa-angle-left"></i></div>
                        <div className="swiper-button-prev" onClick={(e) => { prevSlide() }} tabIndex="0" role="button" aria-label="Previous slide" ><i className="fa-solid fa-angle-right"></i></div>
                    </div>
                    <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
            </div>
            // <!-- Main Slider end --> 
        }
        </Fragment>
    );
}

export default MainSlider;