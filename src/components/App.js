import React, { Fragment, useEffect, useState } from "react"
import Header from "./header"
import "../styles/slide.css"
import "../styles/App.css"
import "../styles/res.css"
import Footer from "./footer";
import Panel from "./stuff/panel";
import CartBox from "./cart/cartBox";
import Model from "./stuff/model";
import Aboutus from "./pages/aboutus";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contactus from "./pages/contactus";
import Maintenance from "./pages/maintenance";
import Error404 from "./pages/error404";
import Backsoon from "./pages/backsoon";
import FAQ from "./pages/FAQ";
import Page from "./pages/page";
import Signup from "./user/signup";
import Login from "./user/login";
import Products from "./products/products";
import SingleProduct from "./products/singleProduct";
import AreaProducts from "./products/areaProducts";
import Cartgory from "./caty/catygory";
import Profile from "./user/profile";
import Forgot from "./user/forgot";
import CatySlideOne from "./caty/catySliderOne";
import CatySlideTwo from "./caty/catySliderTwo";
import Cart from "./cart/cart";
import Checkout from "./cart/checkout";
import Wishlist from "./stuff/wishlist";
import MainSlider from "./stuff/mainSlider";
import FeatureAndLimit from "./stuff/featureAndLimit";
import Services from "./stuff/services";
import Review from "./stuff/review";
import {getCookie, setCookie} from "../shared/cookie"
import TermsCondition from "./pages/termsCondition"
import PrivacyPolicy from "./pages/privacyPolicy"
import Track from "./stuff/track"




const App = () => {
  const [ style, setStyle ] = useState(0);



  useEffect(() => {

    const dark = getCookie("dark") ? getCookie("dark") : "false" 
    const rtl = getCookie("rtl") ? getCookie("rtl") :  "false" 

    if (dark) {
      const head = document.head;
      const link = document.createElement("link");

      if (dark != "false") {
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = `https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/css/dark.css`;

        head.appendChild(link);
      } else {
           if(head.querySelector('link[href="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/css/dark.css"]'))
              head.querySelector('link[href="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/css/dark.css"]').remove()
      }

    }

    if (rtl) {
      const head = document.head;
      const link = document.createElement("link");

      if (rtl  != "false") {
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = `https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/css/rtl.css`;

        head.appendChild(link);
      } else {
           if(head.querySelector('link[href="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/css/rtl.css"]'))
              head.querySelector('link[href="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/css/rtl.css"]').remove()
      }

    }


    return () => {
      setCookie("fullscreen" , "false")
    }

  }, [style]);



  return (

    <div className="app">
      <BrowserRouter>

        <Header />


        <Routes>


          <Route path="/" element={
            <Fragment>

              <MainSlider skip="0" limit="4" sort='{"updatedAt" : 1}' />

              {/* <FeatureAndLimit skip="0" limit="4" sort='{"updatedAt" : 1}' /> */}

              <AreaProducts caty='["men" ,  "women" , "child"]' skip="0" limit="4" sort='{"updatedAt" : 1}' />

              <Products caty="child" skip="0" limit="4" sort='{"updatedAt" : 1}' />
              <Products caty="men" skip="0" limit="4" sort='{"updatedAt" : 1}' />
              <Products caty="women" skip="0" limit="4" sort='{"updatedAt" : 1}' />


              <CatySlideTwo caty="home" skip="0" limit="10" sort='{"updatedAt" : 1}' />
              <CatySlideOne caty="home" skip="0" limit="10" sort='{"updatedAt" : 1}' />

              <Services />
              {/* <Review /> */}

            </Fragment>
          } />



          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:id" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/track/:orderid/:productid" element={<Track />} />

          <Route path="/product/:caty/:id" element={<SingleProduct />} />

          <Route  path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/Category" element={<Cartgory limit="9" />} />
          <Route path="/Category/:caty" element={<Cartgory limit="9" />} />
          <Route path="/Category/ser" element={<Cartgory limit="9" />} />
          {/* <Route path="/catigory/ser/:caty/:inc" element={<Cartgory limit="3" />} />  */}


          <Route path="/pages/*" element={<Page />}>
            <Route path="about-us" element={<Aboutus />} />
            <Route path="contact-us" element={<Contactus />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="backsoon" element={<Backsoon />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsCondition />} />
            <Route index element={<Error404 />} />
          </Route>

          <Route path="/*" index element={<Error404 />} />

        </Routes>


        <CartBox />
        <Model />
        <Panel style={style} setStyle={setStyle}/>
        <Footer />
      </BrowserRouter>
    </div>

  );
}

export default App;
