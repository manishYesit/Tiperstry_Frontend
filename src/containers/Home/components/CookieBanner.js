import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Cookiebanner() {
  const [show, setShow] = useState(false);
  const [cookies, setCookie] = useCookies(["cookiescreenclosed"]);

  useEffect(() => {
    if ((cookies.cookiescreenclosed == 0 || cookies.cookiescreenclosed === undefined)) {
      setShow(true);
    }
  }, []);

  function handleCookieBannerClick() {
    setCookie("cookiescreenclosed", 1, {
      path: "/",
      expires: new Date(Date.now() + 99999999999),
    });

    setShow(false);
  }

  return (
    <>
      {(cookies.cookiescreenclosed == 0 || cookies.cookiescreenclosed === undefined) ? (
        <div className="cookiebanner" style={{ display: (show ? 'flex' : 'none') }}>
          <div>
            We use cookies to offer you a better browsing experience. Read about how
            we use cookies and how you can control them on our{" "}
            <a
              target="_blank"
              href="https://tipestry.com/privacypolicy"
              className="cmc-link"
            >
              Privacy Policy
            </a>
            . If you continue to use this site, you consent to our use of cookies.
          </div>
          <div
            onClick={handleCookieBannerClick}
            className="cmc-cookie-policy-banner__close"
          >
            ×
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
