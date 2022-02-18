import React, { Fragment } from "react"
import { useTranslation } from 'react-i18next';
import { getCookie, setCookie } from "../../shared/cookie";
import myClassname from "classnames";



const Panel = (props) => {
    const { t, i18n } = useTranslation();

    const panelSwitch = (e) => {
        document.querySelector(".ec-tools-sidebar-overlay").style.display = "block"
        document.querySelector(".ec-tools-sidebar").style.right = "0px"
        document.querySelector(".ec-tools-sidebar-overlay").classList.remove("in-out")
    }

    const clearCach = (e) => {
        setCookie("dark" , "false")
        setCookie("rtl" , "false")
        setCookie("fullscreen" , "false")
        hidePanel()
        props.setStyle(props.style + 1)

    }

    const hidePanel = (e) => {
        document.querySelector(".ec-tools-sidebar-overlay").style.display = "none"
        document.querySelector(".ec-tools-sidebar").style.right = "-200px"
        document.querySelector(".ec-tools-sidebar-overlay").classList.add("in-out")
    }

    const modeSwitch = (e) => {

        if (e.target.className.includes("ec-mode-switch")) {
            e.target.parentElement.classList.toggle("active")
        } else {
            e.target.parentElement.parentElement.classList.toggle("active")
        }
        document.querySelector("body").classList.toggle("dark")

        setCookie("dark", getCookie("dark") === "true" ? "false" : "true")
        props.setStyle(props.style + 1)

    }


    const rtlSwitch = (e) => {

        if (e.target.className.includes("ec-rtl-switch")) {
            e.target.parentElement.classList.toggle("active")
        } else {
            e.target.parentElement.parentElement.classList.toggle("active")
        }
        setCookie("rtl", getCookie("rtl")  === "true" ? "false" : "true")
        props.setStyle(props.style + 1)
    }


    const fullscreenSwitch = (e) => {

        if (e.target.className.includes("ec-fullscreen-switch")) {
            e.target.parentElement.classList.toggle("active")
        } else {
            e.target.parentElement.parentElement.classList.toggle("active")
        }


        const body = document.querySelector("body")


        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            const rfs = body.requestFullscreen || body.webkitRequestFullScreen || body.mozRequestFullScreen || body.msRequestFullscreen
            rfs.call(body)
        } else {

            const rfs = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen
            rfs.call(document)

        }

        setCookie("fullscreen", getCookie("fullscreen")  === "true" ? "false" : "true")
        props.setStyle(props.style + 1)

    }




    return (
        <Fragment>

            {/* <!-- Feature tools --> */}
            <div className="ec-tools-sidebar-overlay" onClick={(e) => { hidePanel(e) }}></div>
            <div className="ec-tools-sidebar">

                <div className="tool-title">
                    <h3>Features</h3>
                </div>

                <a href="#" className="ec-tools-sidebar-toggle in-out" onClick={(e) => { panelSwitch(e) }}>
                    <img alt="icon"
                        src="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/common/settings.png" />
                </a>

                <div className="ec-tools-detail">


                    <div className="ec-tools-sidebar-content">
                        <h3>{t("Full Screen mode")}</h3>
                        <div className={myClassname("ec-fullscreen-mode", { "active": getCookie("fullscreen") === "true" })} >
                            <div className="ec-fullscreen-switch" onClick={(e) => { fullscreenSwitch(e) }}>
                                <div className="ec-fullscreen-btn">{t("Mode")}</div>
                                <div className="ec-fullscreen-on">{t("On")}</div>
                                <div className="ec-fullscreen-off">{t("Off")}</div>
                            </div>
                        </div>
                    </div>

                    <div className="ec-tools-sidebar-content">
                        <h3>{t("Dark mode")}</h3>
                        <div className={myClassname("ec-change-mode", { "active": getCookie("dark")  === "true" })}>
                            <div className="ec-mode-switch" onClick={(e) => { modeSwitch(e) }}>
                                <div className="ec-mode-btn">{t("Mode")}</div>
                                <div className="ec-mode-on">{t("On")}</div>
                                <div className="ec-mode-off">{t("Off")}</div>
                            </div>
                        </div>
                    </div>

                    <div className="ec-tools-sidebar-content">
                        <h3>{t("RTL mode")}</h3>
                        <div className="ec-change-rtl" className={myClassname("ec-change-rtl", { "active": getCookie("rtl")  === "true" })}>
                            <div className="ec-rtl-switch" onClick={(e) => { rtlSwitch(e) }}>
                                <div className="ec-rtl-btn">Rtl</div>
                                <div className="ec-rtl-on">On</div>
                                <div className="ec-rtl-off">Off</div>
                            </div>
                        </div>
                    </div>

                    <div className="ec-tools-sidebar-content">
                        <h3>{t("Language")}</h3>
                        <div className="ec-change-lang">
                            <span id="google_translate_element">
                                <div className="skiptranslate goog-te-gadget" dir="ltr">
                                    <div id=":0.targetLanguage">
                                        <select className="goog-te-combo" aria-label="Language Translate Widget" value={i18n.language} onChange={() => {}}>
                                            <option value="">{t("Select Language")}</option>
                                            <option value="ar" onClick={() => {i18n.changeLanguage("en")}}>{t("English")}</option>
                                            <option value="en" onClick={() => {i18n.changeLanguage("ar")}}>{t("Arabic")}</option>

                                        </select>

                                    </div>Powered by
                                </div>


                            </span>
                        </div>
                    </div>
                    <div className="ec-tools-sidebar-content">
                        <a className="clear-cach" href="#" onClick={(e) => { clearCach(e) }}>{t("Clear Cache")}</a>
                    </div>
                </div>
            </div>
            {/* <!-- Feature tools end --> */}

        </Fragment>
    );
}

export default Panel;
