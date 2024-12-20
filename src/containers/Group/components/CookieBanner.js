import React, { useState } from "react";
import { useCookies } from 'react-cookie';


export default function Cookiebanner() {
    const [cookies, setCookie] = useCookies(['cookiescreenclosed']);
    console.log("cookiescreenclosed:" + cookies.cookiescreenclosed);

    function handleCookieBannerClick(){ 
        setCookie('cookiescreenclosed', 1, { path: '/',expires:new Date(Date.now()+99999999999)});  
    }
    return (
        (cookies.cookiescreenclosed == 0 || cookies.cookiescreenclosed === undefined) ? (
            <div className="cookiebanner">
                <div>
                    We use cookies to offer you a better browsing experience. 
                    Read about how we use cookies and how you can control them on our <a target="_blank" href="https://tipestry.com/privacypolicy" className="cmc-link">Privacy Policy</a>.  If you continue to use this site, you consent to our use of cookies.
                </div>
                <div onClick={handleCookieBannerClick} className="cmc-cookie-policy-banner__close">×</div>
            </div>
        ):("")
    )
}
