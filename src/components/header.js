import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import {Link , useLocation , useNavigate }  from 'react-router-dom';
import myClassName from 'classnames';
import {isAuthentication, Logout} from '../shared/auth';
import { getLocalStorage } from "../shared/localStorage";
import { use } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { get_catigories } from "../redux/actions/products";


const Header = (props) => {
const { t, i18n } = useTranslation();
const navigate = useNavigate();

  const topMessage = "test message mmm"

  const darkLogo = "https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/logo/logo.png"
  const logo = "https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/logo/dark-logo.png"
  const location = useLocation()
  const pathname = location.pathname

  const [cartCount , setcartCount] = useState(0)
  const [watchlistCount , setwatchlistCount] = useState(0)
  const [Categories, setCategories] = useState([])

  const { carts } = useSelector(state => state.carts)
  const { wishlist } = useSelector(state => state.wishlist)
  const { catigories } = useSelector(state => state.products)

  const dispatch = useDispatch()

     useEffect(() => {
      dispatch(get_catigories("category"))
   }, [dispatch])

  useEffect(() => {
     setcartCount(carts.length)

     if(isAuthentication()){ 
        setwatchlistCount(wishlist.length)
     }

  } , [carts , wishlist])


  useEffect(() => {
   setCategories(catigories)

}, [catigories])



   



const openSlider = () => {

   document.querySelector(".ec-side-cart-overlay").style.display =  "block" 
   document.querySelector("#ec-mobile-menu.ec-side-cart").classList.add("ec-open") 

}


const closeSlider = () => {
   
   document.querySelector(".ec-side-cart-overlay").style.display =  "none" 
   document.querySelector("#ec-mobile-menu.ec-side-cart").classList.remove("ec-open") 

}

const openCart = () => {
    document.querySelector(".ec-side-cart-overlay").style.display =  "block" 
   document.querySelector("#ec-side-cart.ec-side-cart").classList.add("ec-open") 
}
 




const menuToggle = (e) => {
 // const li =  e.target.parentElement.parentElement.querySelectorAll("li")
//   li.forEach(element => {
//        element.classList.remove("active")
//   });
  e.target.parentElement.className.includes("active") ? e.target.parentElement.classList.remove("active") : e.target.parentElement.classList.add("active")

 e.target.parentElement.querySelector("ul").style.display == "block" ? e.target.parentElement.querySelector("ul").style.display = "none" : e.target.parentElement.querySelector("ul").style.display = "block"

}





  
return (

<Fragment>
   <header className="ec-header">

      {/* <!--Ec Header Top Start --> */}
      <div className="header-top"> 
         <div className="container">
            <div className="row align-items-center">


               {/* <!-- Header Top social Start --> */}
               <div className="col text-left header-top-left d-none d-lg-block">
                  <div className="header-top-social">
                     <span className="social-text text-upper">{t("Follow us on:")}</span>
                     <ul className="mb-0">
                        <li className="list-inline-item"><a className="hdr-facebook" target="_blank" href="facebook.com"><i
                           className="fab fa-facebook"></i></a></li>
                        <li className="list-inline-item"><a className="hdr-twitter" target="_blank" href="facebook.com"><i
                           className="fab fa-twitter"></i></a></li>
                        <li className="list-inline-item"><a className="hdr-instagram" target="_blank" href="facebook.com"><i
                           className="fab fa-instagram"></i></a></li>
                        <li className="list-inline-item"><a className="hdr-linkedin" target="_blank" href="facebook.com"><i
                           className="fab fa-linkedin"></i></a></li>
                     </ul>
                  </div>
               </div>
               {/* <!-- Header Top social End -->


               <!-- Header Top Message Start --> */}
               <div className="col text-center header-top-center">
                  <div className="header-top-message text-upper">
                     <span>{topMessage}</span>
                  </div>
               </div>


               {
               
               /* <!-- Header Top Message End -->

                
               <!-- Header Top Language Currency --> */}
               <div className="col header-top-right d-none d-lg-block">
                  <div className="header-top-lan-curr d-flex justify-content-end">
                  
                     {/*<!-- Language Start --> */}
                     <div className="header-top-lan dropdown">
                        <button className="dropdown-toggle text-upper" data-bs-toggle="dropdown">{t("Language")} <i className="fas fa-caret-down"></i></button>
                        <ul className="dropdown-menu">
                           <li className={i18n.language == "en" ? "active" : ""}><button className="dropdown-item" onClick={() => {i18n.changeLanguage("en")}}>{t("English")}</button></li>
                           <li className={i18n.language == "ar" ? "active" : ""}><button className="dropdown-item"  onClick={() => {i18n.changeLanguage("ar")}}>{t("Arabic")}</button></li>
                        </ul>
                     </div>
                     {/* <!-- Language End --> */}

                  </div>
               </div>
               {/* <!-- Header Top Language Currency --> 


               <!-- Header Top responsive Action --> */}
               <div className="col d-lg-none "> 
                  <div className="ec-header-bottons">


                     {/* <!-- Header User Start --> */}
                     <div className="ec-header-user dropdown">
                        <button className="dropdown-toggle ec-header-btn" data-bs-toggle="dropdown">
                           <i className="far fa-user"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-right">

                              {isAuthentication() &&
                                 <Fragment>

                                    <li><Link className="dropdown-item" to="/profile">{t("Profile")}</Link></li>

                                    <li><button className="dropdown-item" onClick={() => {
                                       Logout(() => {
                                          navigate("/")
                                       })
                                    }}>{t("Logout")}</button></li>
                                 </Fragment>


                              }

                              {!isAuthentication() &&
                                 <Fragment>
                                    <li><Link className="dropdown-item" to="/register">{t("Register")}</Link></li>
                                    <li><Link className="dropdown-item" to="/login">{t("Login")}</Link></li>

                                 </Fragment>

                              }



                        </ul>
                     </div>
                     {/* <!-- Header User End -->


                     <!-- Header Cart Start --> */}
                     <Link to="/wishlist" className="ec-header-btn ec-header-wishlist">
                        <div className="header-icon">
                           <i className="far fa-heart"></i>
                        </div>
                        <span className="ec-header-count">{watchlistCount}</span>
                     </Link>
                     {/* <!-- Header Cart End -->


                     <!-- Header Cart Start --> */}
                     <button className="ec-header-btn ec-side-toggle" onClick={openCart}>
                        <div className="header-icon" >
                           <i className="fas fa-cart-plus"></i>

                        </div>
                        <span className="ec-header-count cart-count-lable">{cartCount}</span>
                     </button>
                     {/* <!-- Header Cart End -->


                     <!-- Header menu Start --> */}
                     <button  className="ec-header-btn ec-side-toggle d-lg-none" onClick={openSlider}>
                       <i className="fas fa-bars"></i>
                     </button>
                     {/* <!-- Header menu End --> */}


                  </div>
               </div>
               {/* <!-- Header Top responsive Action --> */}
            </div>
         </div>
      </div>
      {/* <!-- Ec Header Top  End --> */}





      {/* <!-- Ec Header Bottom  Start --> */}
      <div className="ec-header-bottom d-none d-lg-block">
         <div className="container position-relative">
            <div className="row">
               <div className="ec-flex">
                  {/* <!-- Ec Header Logo Start --> */}
                  <div className="align-self-center">
                     <div className="header-logo">
                        <Link to="/">
                            <img src={logo} alt="Site Logo" />
                            <img className="dark-logo" src={darkLogo} alt="Site Logo" style={{ display: "none" }} /></Link>
                     </div>
                  </div>
                  {/* <!-- Ec Header Logo End -->

                  <!-- Ec Header Search Start --> */}
                  <div className="align-self-center">
                     <div className="header-search">
                        <form className="ec-btn-group-form" action="get" action="/category/ser/">
                           <input className="form-control" name="inc" placeholder={t("Enter Your Product Name...")} type="text" />
                           <button className="submit" type="submit">
                               <i className="fas fa-search"></i>
                           </button>
                        </form>
                     </div>
                  </div>
                  {/* <!-- Ec Header Search End -->


                  <!-- Ec Header Button Start --> */}
                  <div className="align-self-center">
                     <div className="ec-header-bottons">
                        {/* <!-- Header User Start --> */}
                        <div className="ec-header-user dropdown">
                           <button className="dropdown-toggle ec-header-btn" data-bs-toggle="dropdown">
                              <i className="far fa-user"></i>
                           </button>
                           <ul className="dropdown-menu dropdown-menu-right">
                              {isAuthentication() &&
                                 <Fragment>

                                    <li><Link className="dropdown-item" to="/profile">{t("Profile")}</Link></li>

                                    <li><button className="dropdown-item" onClick={() => {
                                       Logout(() => {
                                          navigate("/")
                                       })
                                    }}>{t("Logout")}</button></li>
                                 </Fragment>


                              }

                              {!isAuthentication() &&
                                 <Fragment>
                                    <li><Link className="dropdown-item" to="/register">{t("Register")}</Link></li>
                                    <li><Link className="dropdown-item" to="/login">{t("Login")}</Link></li>

                                 </Fragment>

                              }
                           </ul>
                        </div>
                        {/* <!-- Header User End -->

                        <!-- Header wishlist Start --> */} 
                        <Link to="/wishlist" className="ec-header-btn ec-header-wishlist">
                           <div className="header-icon">
                             <i className="far fa-heart"></i>
                              
                           </div>
                           <span className="ec-header-count">{watchlistCount}</span>
                        </Link>
                        {/* <!-- Header wishlist End -->
                        <!-- Header Cart Start --> */}
                        <button className="ec-header-btn ec-side-toggle" onClick={openCart}>
                           <div className="header-icon">
                             <i className="fas fa-shopping-bag"></i>

                           </div>
                           <span className="ec-header-count cart-count-lable">{cartCount}</span>
                        </button>
                        {/* <!-- Header Cart End --> */}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      {/* <!-- Ec Header Button End --> */}









      {/* <!-- Header responsive Bottom  Start --> */}
      <div className="ec-header-bottom d-lg-none">
         <div className="container position-relative">
            <div className="row ">
               {/* <!-- Ec Header Logo Start --> */}
               <div className="col">
                  <div className="header-logo">
                     <a href="index">
                     <img
                        src={logo}
                        alt="Site Logo" />
                     <img className="dark-logo"
                     src={darkLogo}
                     alt="Site Logo" style={{ display: "none" }} />
                     </a>
                  </div>
               </div>
               {/* <!-- Ec Header Logo End -->
               <!-- Ec Header Search Start --> */}
               <div className="col">
                  <div className="header-search">
                        <form className="ec-btn-group-form" action="get" action="/category/ser/">
                           <input className="form-control" name="inc" placeholder={t("Enter Your Product Name...")} type="text" />
                             <button className="submit" type="submit">
                            <i className="fas fa-search"></i>
                        </button>
                     </form>
                  </div>
               </div>
               {/* <!-- Ec Header Search End --> */}
            </div>
         </div>
      </div>
      {/* <!-- Header responsive Bottom  End -->




      <!-- EC Main Menu Start --> */}
      <div id="ec-main-menu-desk" className="d-none d-lg-block sticky-nav">
         <div className="container position-relative">
            <div className="row">
               <div className="col-md-12 align-self-center">
                  <div className="ec-main-menu">


                     <ul>
                        <li className={ myClassName("" , {"active" : pathname.includes("/home") })}><Link to="/home">{t("Home")}</Link></li>

                        <li className={ myClassName("dropdown" , {"active" : pathname.includes("/Category") })}><Link to="#">{t('Category')}</Link>
                              <ul className="sub-menu">

                                 {Categories.map((cat, ci) => {

                                    return (
                                       <li key={ci} className={myClassName("", { "active": pathname.includes(`/category/${cat}`) })}><Link to={`/category/${cat}`}>{cat}</Link></li>
                                    )
                                 })

                                 }

                                 {/* <li className={myClassName("dropdown" , "position-static" , {"active" : pathname.includes("/catycory/about-us") })}>
                                    <Link to="/catycory">Product page<i className="fas fa-angle-right"></i></Link>
                                    <ul className="sub-menu sub-menu-child">
                                        <li className={ myClassName("" , {"active" : pathname.includes("/catycory/sidebar") }) }><Link to="product-left-sidebar">sidebar</Link></li>
                                        <li className={ myClassName("" , {"active" : pathname.includes("/catycory/product") }) }><Link to="product-right-sidebar">Product</Link></li>
                                    </ul>
                                </li>*/}


                              </ul>
                        
                        </li>
                                    
                        <li className={ myClassName("dropdown" , {"active" : pathname.includes("/pages") })}><a>{t('pages')}</a> 
                           <ul className="sub-menu">
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/about-us") })}><Link to="/pages/about-us">{t('About Us')}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/contact-us") })}><Link to="/pages/contact-us">{t("Contact Us")}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/maintenance") })}><Link to="/pages/maintenance">{t("Maintenance")}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/faq") })}><Link to="/pages/faq">{t("FAQ")}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/error404") })}><Link to="/pages/error404">{t("Error 404")}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/backsoon") })}><Link to="/pages/backsoon">{t("Backsoon")}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/privacy") })}><Link to="/pages/privacy">{t("Privacy Policy")}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/terms") })}><Link to="/pages/terms">{t("Terms Condition")}</Link></li>
                           </ul>
 
                        </li> 
                        
                     </ul>




                  </div>
               </div>
            </div>
         </div>
      </div>
      {/* <!-- Ec Main Menu End -->




      <!-- ekka Mobile Menu Start --> */}
      <div id="ec-mobile-menu" className="ec-side-cart ec-mobile-menu">
         <div className="ec-menu-title">
            <span className="menu_title">{t("My Menu")}</span>
            <button className="ec-close" onClick={closeSlider}>×</button>
         </div>
         <div className="ec-menu-inner">
            <div className="ec-menu-content">
               <ul>

       
                  <li className={ myClassName("" , {"active" : pathname.includes("/home") })}><Link to="/home">{t("Home")}</Link></li>

                    <li className={ myClassName("dropdown" , {"active" : pathname.includes("/category") })}>
                    <span className="menu-toggle" onClick={(e) => {menuToggle(e)}}></span><Link to="#">{t('category')}</Link>

                      
                        <ul className="sub-menu">

                           {Categories.map((cat, ci) => {

                              return (
                                 <li key={ci} className={myClassName("", { "active": pathname.includes(`/category/${cat}`) })}><Link to={`/category/${cat}`}>{cat}</Link></li>
                              )
                           })

                           }

                            {/* <li className={myClassName("dropdown" , "position-static" , {"active" : pathname.includes("/catycory/about-us") })}>
                                <span className="menu-toggle"  onClick={(e) => {menuToggle(e)}}></span><Link to="/catycory">{t("Product page")} </Link>
                                <ul className="sub-menu sub-menu-child">
                                    <li className={ myClassName("" , {"active" : pathname.includes("/catycory/sidebar") }) }><Link to="product-left-sidebar">sidebar</Link></li>
                                    <li className={ myClassName("" , {"active" : pathname.includes("/catycory/product") }) }><Link to="product-right-sidebar">Product</Link></li>
                                </ul>
                            </li> */}


                        </ul> 
                    </li>


                  <li className={ myClassName("" , {"active" : pathname.includes("/caty") })}>
                       <span className="menu-toggle" onClick={(e) => {menuToggle(e)}}></span><a>{t('pages')}</a>
                        <ul className="sub-menu">
                               <li className={myClassName("" , {"active" : pathname.includes("/pages/about-us") })}><Link to="/pages/about-us">{t('About Us')}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/contact-us") })}><Link to="/pages/contact-us">{t("Contact Us")}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/maintenance") })}><Link to="/pages/maintenance">{t("Maintenance")}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/faq") })}><Link to="/pages/faq">{t("FAQ")}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/error404") })}><Link to="/pages/error404">{t("Error 404")}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/backsoon") })}><Link to="/pages/backsoon">{t("Backsoon")}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/privacy") })}><Link to="/pages/privacy">{t("Privacy Policy")}</Link></li>
                              <li className={myClassName("" , {"active" : pathname.includes("/pages/terms") })}><Link to="/pages/terms">{t("Terms Condition")}</Link></li>
                        </ul>
                    </li>
            
               </ul>
            </div>



            <div className="header-res-lan-curr">
               <div className="header-top-lan-curr">


                  {/* <!-- Language Start --> */}
                  <div className="header-top-lan dropdown">
                     <button className="dropdown-toggle text-upper" data-bs-toggle="dropdown">{("Language")} <i className="fas fa-caret-down"></i></button>
                     <ul className="dropdown-menu">
                        <li className={i18n.language == "en" ? "active" : ""}><button className="dropdown-item" onClick={() => {i18n.changeLanguage("en")}}>{t("English")}</button></li>
                           <li className={i18n.language == "ar" ? "active" : ""}><button className="dropdown-item"  onClick={() => {i18n.changeLanguage("ar")}}>{t("Arabic")}</button></li>
                     </ul>
                  </div>
                  {/* <!-- Language End -*/}

               </div>

               <div className="header-res-social">
                  <div className="header-top-social">
                     <ul className="mb-0">
                     <li className="list-inline-item"><a className="hdr-facebook" target="_blank" href="facebook.com"><i
                           className="fab fa-facebook"></i></a></li>
                        <li className="list-inline-item"><a className="hdr-twitter" target="_blank" href="facebook.com"><i
                           className="fab fa-twitter"></i></a></li>
                        <li className="list-inline-item"><a className="hdr-instagram" target="_blank" href="facebook.com"><i
                           className="fab fa-instagram"></i></a></li>
                        <li className="list-inline-item"><a className="hdr-linkedin" target="_blank" href="facebook.com"><i
                           className="fab fa-linkedin"></i></a></li>
                     </ul>
                  </div>
               </div>
               {/* <!-- Social End --> */}


            </div>
         </div>
      </div>
      {/* <!-- ekka mobile Menu End --> */}
   </header>









   {/* <!-- Footer navigation panel for responsive display --> */}
   <div className="ec-nav-toolbar">
      <div className="container">
         <div className="ec-nav-panel">
            <div className="ec-nav-panel-icons">
               <a href="#ec-mobile-menu" className="navbar-toggler-btn ec-header-btn ec-side-toggle" onClick={openSlider}>
                  <i className="fas fa-bars"></i>
                  
               </a>
            </div>
            <div className="ec-nav-panel-icons">
               <a href="#ec-side-cart" className="toggle-cart ec-header-btn ec-side-toggle">
                 <i className="fas fa-cart-plus"></i>
                  <span className="ec-cart-noti ec-header-count cart-count-lable">{cartCount}</span>
               </a>
            </div>
            <div className="ec-nav-panel-icons">
               <Link to="/" className="ec-header-btn">
                 <i className="fas fa-home"></i>
               </Link>
            </div>
            <div className="ec-nav-panel-icons">
               <a href="wishlist" className="ec-header-btn">
            
                  <i className="far fa-heart"></i>
                  <span className="ec-cart-noti">{watchlistCount}</span>
               </a>
            </div>
            <div className="ec-nav-panel-icons">
               <Link to="/login" className="ec-header-btn"><i className="fas fa-user"></i></Link>
            </div>
         </div>
      </div>
   </div>
   {/* <!-- Footer navigation panel for responsive display end --> */}
</Fragment>
);
}
export default Header;