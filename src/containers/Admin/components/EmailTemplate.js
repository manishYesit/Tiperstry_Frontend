const changeColor = (number) => {
  return number < 0 ? "color: red" : "color: green";
};

const displayCryptos = (cryptos) => {
  let html = "";
  cryptos.forEach((crypto) => {
    html += `<div style="padding: 0.5rem; margin: 0.5rem;  display: table-cell;width: ${
      100 / cryptos.length
    }%;">
                      <p
                        style="
                          font-weight: bold;
                        
                          font-size: 1rem;
                          
                          text-align: center ;
                          margin: 0;
                          padding: 0;
                        "
                      >
                        ${crypto.coin.toUpperCase()}
                      </p>
                      <p>$${crypto.price.toFixed(2)} </p>
                      <p><span style="${changeColor(
                        crypto.range
                      )}">(${crypto.range.toFixed(2)}%)</span></p>
                    </div>`;
  });

  return html;
};

const EmailMarketing = (
  header,
  body,
  callToAction,
  caption,
  cryptoHeader,
  image,
  cryptos,
  email
) => {
  console.log("the cryptos", cryptos);
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!--[if IE]><html xmlns="http://www.w3.org/1999/xhtml" class="ie"><![endif]-->
<!--[if !IE]><!--><html
  style="margin: 0; padding: 0"
  xmlns="http://www.w3.org/1999/xhtml"
><!--<![endif]-->
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="viewport" content="width=device-width" />
    <style type="text/css">
      @media only screen and (min-width: 620px) {
        .wrapper {
          min-width: 600px !important;
        }
        .wrapper h1 {
        }
        .wrapper h1 {
          font-size: 26px !important;
          line-height: 34px !important;
        }
        .wrapper h2 {
        }
        .wrapper h2 {
          font-size: 20px !important;
          line-height: 28px !important;
        }
        .wrapper h3 {
        }
        .column {
        }
        .wrapper .size-8 {
          font-size: 8px !important;
          line-height: 14px !important;
        }
        .wrapper .size-9 {
          font-size: 9px !important;
          line-height: 16px !important;
        }
        .wrapper .size-10 {
          font-size: 10px !important;
          line-height: 18px !important;
        }
        .wrapper .size-11 {
          font-size: 11px !important;
          line-height: 19px !important;
        }
        .wrapper .size-12 {
          font-size: 12px !important;
          line-height: 19px !important;
        }
        .wrapper .size-13 {
          font-size: 13px !important;
          line-height: 21px !important;
        }
        .wrapper .size-14 {
          font-size: 14px !important;
          line-height: 21px !important;
        }
        .wrapper .size-15 {
          font-size: 15px !important;
          line-height: 23px !important;
        }
        .wrapper .size-16 {
          font-size: 16px !important;
          line-height: 24px !important;
        }
        .wrapper .size-17 {
          font-size: 17px !important;
          line-height: 26px !important;
        }
        .wrapper .size-18 {
          font-size: 18px !important;
          line-height: 26px !important;
        }
        .wrapper .size-20 {
          font-size: 20px !important;
          line-height: 28px !important;
        }
        .wrapper .size-22 {
          font-size: 22px !important;
          line-height: 31px !important;
        }
        .wrapper .size-24 {
          font-size: 24px !important;
          line-height: 32px !important;
        }
        .wrapper .size-26 {
          font-size: 26px !important;
          line-height: 34px !important;
        }
        .wrapper .size-28 {
          font-size: 28px !important;
          line-height: 36px !important;
        }
        .wrapper .size-30 {
          font-size: 30px !important;
          line-height: 38px !important;
        }
        .wrapper .size-32 {
          font-size: 32px !important;
          line-height: 40px !important;
        }
        .wrapper .size-34 {
          font-size: 34px !important;
          line-height: 43px !important;
        }
        .wrapper .size-36 {
          font-size: 36px !important;
          line-height: 43px !important;
        }
        .wrapper .size-40 {
          font-size: 40px !important;
          line-height: 47px !important;
        }
        .wrapper .size-44 {
          font-size: 44px !important;
          line-height: 50px !important;
        }
        .wrapper .size-48 {
          font-size: 48px !important;
          line-height: 54px !important;
        }
        .wrapper .size-56 {
          font-size: 56px !important;
          line-height: 60px !important;
        }
        .wrapper .size-64 {
          font-size: 64px !important;
          line-height: 63px !important;
        }
      }
    </style>
    <meta name="x-apple-disable-message-reformatting" />
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
      }
      table {
        border-collapse: collapse;
        table-layout: fixed;
      }
      * {
        line-height: inherit;
      }
      [x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
      }
      .wrapper .footer__share-button a:hover,
      .wrapper .footer__share-button a:focus {
        color: #ffffff !important;
      }
      .btn a:hover,
      .btn a:focus,
      .footer__share-button a:hover,
      .footer__share-button a:focus,
      .email-footer__links a:hover,
      .email-footer__links a:focus {
        opacity: 0.8;
      }
      .preheader,
      .header,
      .layout,
      .column {
        transition: width 0.25s ease-in-out, max-width 0.25s ease-in-out;
      }
      .preheader td {
        padding-bottom: 8px;
      }
      .layout,
      div.header {
        max-width: 400px !important;
        -fallback-width: 95% !important;
        width: calc(100% - 20px) !important;
      }
      div.preheader {
        max-width: 360px !important;
        -fallback-width: 90% !important;
        width: calc(100% - 60px) !important;
      }
      .snippet,
      .webversion {
        float: none !important;
      }
      .stack .column {
        max-width: 400px !important;
        width: 100% !important;
      }
      .fixed-width.has-border {
        max-width: 402px !important;
      }
      .fixed-width.has-border .layout__inner {
        box-sizing: border-box;
      }
      .snippet,
      .webversion {
        width: 50% !important;
      }
      .ie .btn {
        width: 100%;
      }
      .ie .stack .column,
      .ie .stack .gutter {
        display: table-cell;
        float: none !important;
      }
      .ie div.preheader,
      .ie .email-footer {
        max-width: 560px !important;
        width: 560px !important;
      }
      .ie .snippet,
      .ie .webversion {
        width: 280px !important;
      }
      .ie div.header,
      .ie .layout {
        max-width: 600px !important;
        width: 600px !important;
      }
      .ie .two-col .column {
        max-width: 300px !important;
        width: 300px !important;
      }
      .ie .three-col .column,
      .ie .narrow {
        max-width: 200px !important;
        width: 200px !important;
      }
      .ie .wide {
        width: 400px !important;
      }
      .ie .stack.fixed-width.has-border,
      .ie .stack.has-gutter.has-border {
        max-width: 602px !important;
        width: 602px !important;
      }
      .ie .stack.two-col.has-gutter .column {
        max-width: 290px !important;
        width: 290px !important;
      }
      .ie .stack.three-col.has-gutter .column,
      .ie .stack.has-gutter .narrow {
        max-width: 188px !important;
        width: 188px !important;
      }
      .ie .stack.has-gutter .wide {
        max-width: 394px !important;
        width: 394px !important;
      }
      .ie .stack.two-col.has-gutter.has-border .column {
        max-width: 292px !important;
        width: 292px !important;
      }
      .ie .stack.three-col.has-gutter.has-border .column,
      .ie .stack.has-gutter.has-border .narrow {
        max-width: 190px !important;
        width: 190px !important;
      }
      .ie .stack.has-gutter.has-border .wide {
        max-width: 396px !important;
        width: 396px !important;
      }
      .ie .fixed-width .layout__inner {
        border-left: 0 none white !important;
        border-right: 0 none white !important;
      }
      .ie .layout__edges {
        display: none;
      }
      .mso .layout__edges {
        font-size: 0;
      }
      .layout-fixed-width,
      .mso .layout-full-width {
        background-color: #ffffff;
      }
      @media only screen and (min-width: 620px) {
        .column,
        .gutter {
          display: table-cell;
          float: none !important;
          vertical-align: top;
        }
        div.preheader,
        .email-footer {
          max-width: 560px !important;
          width: 560px !important;
        }
        .snippet,
        .webversion {
          width: 280px !important;
        }
        div.header,
        .layout,
        .one-col .column {
          max-width: 600px !important;
          width: 600px !important;
        }
        .fixed-width.has-border,
        .fixed-width.x_has-border,
        .has-gutter.has-border,
        .has-gutter.x_has-border {
          max-width: 602px !important;
          width: 602px !important;
        }
        .two-col .column {
          max-width: 300px !important;
          width: 300px !important;
        }
        .three-col .column,
        .column.narrow,
        .column.x_narrow {
          max-width: 200px !important;
          width: 200px !important;
        }
        .column.wide,
        .column.x_wide {
          width: 400px !important;
        }
        .two-col.has-gutter .column,
        .two-col.x_has-gutter .column {
          max-width: 290px !important;
          width: 290px !important;
        }
        .three-col.has-gutter .column,
        .three-col.x_has-gutter .column,
        .has-gutter .narrow {
          max-width: 188px !important;
          width: 188px !important;
        }
        .has-gutter .wide {
          max-width: 394px !important;
          width: 394px !important;
        }
        .two-col.has-gutter.has-border .column,
        .two-col.x_has-gutter.x_has-border .column {
          max-width: 292px !important;
          width: 292px !important;
        }
        .three-col.has-gutter.has-border .column,
        .three-col.x_has-gutter.x_has-border .column,
        .has-gutter.has-border .narrow,
        .has-gutter.x_has-border .narrow {
          max-width: 190px !important;
          width: 190px !important;
        }
        .has-gutter.has-border .wide,
        .has-gutter.x_has-border .wide {
          max-width: 396px !important;
          width: 396px !important;
        }
      }
      @supports (display: flex) {
        @media only screen and (min-width: 620px) {
          .fixed-width.has-border .layout__inner {
            display: flex !important;
          }
        }
      }
      @media only screen and (-webkit-min-device-pixel-ratio: 2),
        only screen and (min--moz-device-pixel-ratio: 2),
        only screen and (-o-min-device-pixel-ratio: 2/1),
        only screen and (min-device-pixel-ratio: 2),
        only screen and (min-resolution: 192dpi),
        only screen and (min-resolution: 2dppx) {
        .fblike {
          background-image: url(https://i7.createsend1.com/static/eb/master/13-the-blueprint-3/images/fblike@2x.png) !important;
        }
        .tweet {
          background-image: url(https://i8.createsend1.com/static/eb/master/13-the-blueprint-3/images/tweet@2x.png) !important;
        }
        .linkedinshare {
          background-image: url(https://i9.createsend1.com/static/eb/master/13-the-blueprint-3/images/lishare@2x.png) !important;
        }
        .forwardtoafriend {
          background-image: url(https://i10.createsend1.com/static/eb/master/13-the-blueprint-3/images/forward@2x.png) !important;
        }
      }
      @media (max-width: 321px) {
        .fixed-width.has-border .layout__inner {
          border-width: 1px 0 !important;
        }
        .layout,
        .stack .column {
          min-width: 320px !important;
          width: 320px !important;
        }
        .border {
          display: none;
        }
        .has-gutter .border {
          display: table-cell;
        }
      }
      .mso div {
        border: 0 none white !important;
      }
      .mso .w560 .divider {
        margin-left: 260px !important;
        margin-right: 260px !important;
      }
      .mso .w360 .divider {
        margin-left: 160px !important;
        margin-right: 160px !important;
      }
      .mso .w260 .divider {
        margin-left: 110px !important;
        margin-right: 110px !important;
      }
      .mso .w160 .divider {
        margin-left: 60px !important;
        margin-right: 60px !important;
      }
      .mso .w354 .divider {
        margin-left: 157px !important;
        margin-right: 157px !important;
      }
      .mso .w250 .divider {
        margin-left: 105px !important;
        margin-right: 105px !important;
      }
      .mso .w148 .divider {
        margin-left: 54px !important;
        margin-right: 54px !important;
      }
      .mso .size-8,
      .ie .size-8 {
        font-size: 8px !important;
        line-height: 14px !important;
      }
      .mso .size-9,
      .ie .size-9 {
        font-size: 9px !important;
        line-height: 16px !important;
      }
      .mso .size-10,
      .ie .size-10 {
        font-size: 10px !important;
        line-height: 18px !important;
      }
      .mso .size-11,
      .ie .size-11 {
        font-size: 11px !important;
        line-height: 19px !important;
      }
      .mso .size-12,
      .ie .size-12 {
        font-size: 12px !important;
        line-height: 19px !important;
      }
      .mso .size-13,
      .ie .size-13 {
        font-size: 13px !important;
        line-height: 21px !important;
      }
      .mso .size-14,
      .ie .size-14 {
        font-size: 14px !important;
        line-height: 21px !important;
      }
      .mso .size-15,
      .ie .size-15 {
        font-size: 15px !important;
        line-height: 23px !important;
      }
      .mso .size-16,
      .ie .size-16 {
        font-size: 16px !important;
        line-height: 24px !important;
      }
      .mso .size-17,
      .ie .size-17 {
        font-size: 17px !important;
        line-height: 26px !important;
      }
      .mso .size-18,
      .ie .size-18 {
        font-size: 18px !important;
        line-height: 26px !important;
      }
      .mso .size-20,
      .ie .size-20 {
        font-size: 20px !important;
        line-height: 28px !important;
      }
      .mso .size-22,
      .ie .size-22 {
        font-size: 22px !important;
        line-height: 31px !important;
      }
      .mso .size-24,
      .ie .size-24 {
        font-size: 24px !important;
        line-height: 32px !important;
      }
      .mso .size-26,
      .ie .size-26 {
        font-size: 26px !important;
        line-height: 34px !important;
      }
      .mso .size-28,
      .ie .size-28 {
        font-size: 28px !important;
        line-height: 36px !important;
      }
      .mso .size-30,
      .ie .size-30 {
        font-size: 30px !important;
        line-height: 38px !important;
      }
      .mso .size-32,
      .ie .size-32 {
        font-size: 32px !important;
        line-height: 40px !important;
      }
      .mso .size-34,
      .ie .size-34 {
        font-size: 34px !important;
        line-height: 43px !important;
      }
      .mso .size-36,
      .ie .size-36 {
        font-size: 36px !important;
        line-height: 43px !important;
      }
      .mso .size-40,
      .ie .size-40 {
        font-size: 40px !important;
        line-height: 47px !important;
      }
      .mso .size-44,
      .ie .size-44 {
        font-size: 44px !important;
        line-height: 50px !important;
      }
      .mso .size-48,
      .ie .size-48 {
        font-size: 48px !important;
        line-height: 54px !important;
      }
      .mso .size-56,
      .ie .size-56 {
        font-size: 56px !important;
        line-height: 60px !important;
      }
      .mso .size-64,
      .ie .size-64 {
        font-size: 64px !important;
        line-height: 63px !important;
      }
    </style>

    <style type="text/css">
      body {
        background-color: #fff;
      }
      .logo a:hover,
      .logo a:focus {
        color: #1e2e3b !important;
      }
      .mso .layout-has-border {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
      }
      .mso .layout-has-bottom-border {
        border-bottom: 1px solid #ccc;
      }
      .mso .border,
      .ie .border {
        background-color: #ccc;
      }
      .mso h1,
      .ie h1 {
      }
      .mso h1,
      .ie h1 {
        font-size: 26px !important;
        line-height: 34px !important;
      }
      .mso h2,
      .ie h2 {
      }
      .mso h2,
      .ie h2 {
        font-size: 20px !important;
        line-height: 28px !important;
      }
      .mso h3,
      .ie h3 {
      }
      .mso .layout__inner,
      .ie .layout__inner {
      }
      .mso .footer__share-button p {
      }
      .mso .footer__share-button p {
        font-family: Georgia, serif;
      }
    </style>
    <meta name="robots" content="noindex,nofollow" />
    <meta property="og:title" content="My First Campaign" />
  </head>
  <!--[if mso]>
<body class="mso">
<![endif]-->
  <!--[if !mso]><!-->
  <body
    class="full-padding"
    style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%"
  >
    <!--<![endif]-->
    <table
      class="wrapper"
      style="
        border-collapse: collapse;
        table-layout: fixed;
        min-width: 320px;
        width: 100%;
        background-color: #fff;
      "
      cellpadding="0"
      cellspacing="0"
      role="presentation"
    >
      <tbody>
        <tr>
          <td>
            <div role="banner">
              <div
                class="preheader"
                style="
                  margin: 0 auto;
                  max-width: 560px;
                  min-width: 280px;
                  width: 280px;
                  width: calc(28000% - 167440px);
                "
              >
                <div
                  style="border-collapse: collapse; display: table; width: 100%"
                >
                  <!--[if (mso)|(IE)]><table align="center" class="preheader" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width: 280px" valign="top"><![endif]-->
                  <div
                    class="snippet"
                    style="
                      display: table-cell;
                      float: left;
                      font-size: 12px;
                      line-height: 19px;
                      max-width: 280px;
                      min-width: 140px;
                      width: 140px;
                      width: calc(14000% - 78120px);
                      padding: 10px 0 5px 0;
                      color: #999;
                      font-family: Georgia, serif;
                    "
                  ></div>
                  <!--[if (mso)|(IE)]></td><td style="width: 280px" valign="top"><![endif]-->
                  <div
                    class="webversion"
                    style="
                      display: table-cell;
                      float: left;
                      font-size: 12px;
                      line-height: 19px;
                      max-width: 280px;
                      min-width: 139px;
                      width: 139px;
                      width: calc(14100% - 78680px);
                      padding: 10px 0 5px 0;
                      text-align: right;
                      color: #999;
                      font-family: Georgia, serif;
                    "
                  >
                    <p style="margin-top: 0; margin-bottom: 0">
                      No images?
                      <webversion style="text-decoration: underline"
                        >Click here</webversion
                      >
                    </p>
                  </div>
                  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </div>
              </div>
              <div
                class="header"
                style="
                  margin: 0 auto;
                  max-width: 600px;
                  min-width: 320px;
                  width: 320px;
                  width: calc(28000% - 167400px);
                "
                id="emb-email-header-container"
              >
                <!--[if (mso)|(IE)]><table align="center" class="header" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width: 600px"><![endif]-->
                <div
                  class="logo emb-logo-margin-box"
                  style="
                    font-size: 26px;
                    line-height: 32px;
                    margin-top: 6px;
                    margin-bottom: 20px;
                    color: #41637e;
                    font-family: Avenir, sans-serif;
                    margin-left: 20px;
                    margin-right: 20px;
                  "
                  align="center"
                >
                  <div class="logo-center" align="center" id="emb-email-header">
                    <a
                      style="
                        text-decoration: none;
                        transition: opacity 0.1s ease-in;
                        color: #41637e;
                      "
                      href="https://tipestry.com/"
                      ><img
                        style="
                          display: block;
                          height: auto;
                          width: 100%;
                          border: 0;
                          max-width: 144px;
                        "
                        src="https://tipestry.com/static/tipcoin.png"
                        alt="Tipestry"
                        width="144"
                    /></a>
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
              </div>
            </div>
            <div>
              <div
                class="layout one-col fixed-width stack"
                style="
                  margin: 0 auto;
                  max-width: 600px;
                  min-width: 320px;
                  width: 320px;
                  width: calc(28000% - 167400px);
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                "
              >
                <div
                  style="
                  width: 100%;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: normal;
                    line-height: 19px;
                    align: center;
                    border: 2px white solid;
                    padding: 1rem;
                  "
                >
                  <a
                    style="
                      text-decoration: underline;
                      transition: opacity 0.1s ease-in;
                      color: #41637e;
                    "
                    href="https://tipestry.com/"
                    ><img
                      style="
                      border: 0;
                        display: block;
                        height: auto;
                        width: 100%;
                        margin: 0 auto;
                        align: center;
                        
                      "
                      alt="Dogecoin"
                      width="130"
                      src="${image}"
                  /></a>
                  <p style="font-style: italics; text-align: center">${caption}</p>
                  <p style="text-align:center; width: 100%; font-size: .8rem; font-weight: bold; margin-top: 1rem">${cryptoHeader}</p>
                <div style="display: table; width: 100%; margin-top: 1rem">
                  <div
                    style="
                    margin: 0 auto;
                   display: table-row;
                        text-align: center;
                        width: 100%;
                    "
                  >
                     ${displayCryptos(cryptos)}
                  </div>
                </div>
                       

                <div
                  class="layout__inner"
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    background-color: #ffffff;
                  "
                >
                  <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-fixed-width" style="background-color: #ffffff;"><td style="width: 600px" class="w560"><![endif]-->
                  <div
                    class="column"
                    style="
                      text-align: left;
                      color: #565656;
                      font-size: 14px;
                      line-height: 21px;
                      font-family: Georgia, serif;
                    "
                  >
                    <div
                      style="
                        margin-left: 20px;
                        margin-right: 20px;
                        margin-top: 24px;
                      "
                    >
                      <div
                        style="
                          mso-line-height-rule: exactly;
                          mso-text-raise: 11px;
                          vertical-align: middle;
                        "
                      >
                        <h2
                          class="size-30"
                          style="
                            margin-top: 0;
                            margin-bottom: 0;
                            font-style: normal;
                            font-weight: normal;
                            color: #555;
                            font-size: 26px;
                            line-height: 34px;
                            font-family: avenir, sans-serif;
                          "
                          lang="x-size-30"
                        >
                          <span class="font-avenir"
                            ><span style="color: #0f000f; font-size: 1.3rem"
                              >${header}</span
                            ></span
                          >
                        </h2>
                        <p
                          class="size-16"
                          style="
                            margin-top: 16px;
                            margin-bottom: 0;
                            font-family: avenir, sans-serif;
                            font-size: 1rem;
                            line-height: 24px;
                          "
                          lang="x-size-16"
                        >
                          <span class="font-avenir"
                            ><span style="color: #0f000f"
                              >${body}</span
                            ></span
                          >
                        </p>
                        <p
                          class="size-16"
                          style="
                            margin-top: 20px;
                            margin-bottom: 20px;
                            font-family: avenir, sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                          "
                          lang="x-size-16"
                        >
                          <!-- <span class="font-avenir"
                            ><a
                              style="
                                text-decoration: underline;
                                transition: opacity 0.1s ease-in;
                                color: #41637e;
                              "
                              href="https://tipestry.com/topics/602720191f7cd250d080ed11/post-of-the-week-contest"
                              ><span style="color: #1f398f"
                                >Post of the Week Thread</span
                              ></a
                            ></span
                          > -->
                        </p>
                      </div>
                    </div>

                    <!-- <div
                      style="
                        margin-left: 20px;
                        margin-right: 20px;
                        margin-top: 20px;
                      "
                    >
                      <div
                        style="
                          mso-line-height-rule: exactly;
                          mso-text-raise: 11px;
                          vertical-align: middle;
                        "
                      >
                        <p
                          class="size-16"
                          style="
                            margin-top: 0;
                            margin-bottom: 0;
                            font-family: avenir, sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                          "
                          lang="x-size-16"
                        >
                          <span class="font-avenir"
                            ><span style="color: #050005"
                              ><b
                                >Some of the new features and upgrades included
                                in Tipestry:</b
                              ></span
                            ></span
                          >
                        </p>
                        <p
                          class="size-16"
                          style="
                            margin-top: 20px;
                            margin-bottom: 0;
                            font-family: avenir, sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                            text-align: left;
                          "
                          lang="x-size-16"
                        >
                          <span class="font-avenir"
                            ><span style="color: #050005"
                              >-Faster loading times.</span
                            ></span
                          >
                        </p>
                        <p
                          class="size-16"
                          style="
                            margin-top: 20px;
                            margin-bottom: 0;
                            font-family: avenir, sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                            text-align: left;
                          "
                          lang="x-size-16"
                        >
                          <span class="font-avenir"
                            ><span style="color: #050005"
                              >-Create posts without entering a URL.</span
                            ></span
                          >
                        </p>
                        <p
                          class="size-16"
                          style="
                            margin-top: 20px;
                            margin-bottom: 0;
                            font-family: avenir, sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                            text-align: left;
                          "
                          lang="x-size-16"
                        >
                          <span class="font-avenir"
                            ><span style="color: #050005"
                              >-Upload images and gifs.</span
                            ></span
                          >
                        </p>
                        <p
                          class="size-16"
                          style="
                            margin-top: 20px;
                            margin-bottom: 0;
                            font-family: avenir, sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                            text-align: left;
                          "
                          lang="x-size-16"
                        >
                          <span class="font-avenir"
                            ><span style="color: #050005"
                              >-Post and comment anonymously without creating an
                              account.</span
                            ></span
                          >
                        </p>
                        <p
                          class="size-16"
                          style="
                            margin-top: 20px;
                            margin-bottom: 0;
                            font-family: avenir, sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                            text-align: left;
                          "
                          lang="x-size-16"
                        >
                          <span class="font-avenir"
                            ><span style="color: #050005"
                              >-More viewing, sorting, and site navigation
                              options.</span
                            ></span
                          >
                        </p>
                        <p
                          class="size-16"
                          style="
                            margin-top: 20px;
                            margin-bottom: 0;
                            font-family: avenir, sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                            text-align: left;
                          "
                          lang="x-size-16"
                        >
                          <span class="font-avenir"
                            ><span style="color: #050005"
                              >-Improved mobile support.</span
                            ></span
                          >
                        </p>
                        <p
                          class="size-16"
                          style="
                            margin-top: 20px;
                            margin-bottom: 20px;
                            font-family: avenir, sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                            text-align: left;
                          "
                          lang="x-size-16"
                        >
                          <span class="font-avenir"
                            ><span style="color: #050005"
                              >-More languages supported.</span
                            ></span
                          >
                        </p>
                      </div>
                    </div> -->

                    <div style="margin-left: 20px; margin-right: 20px">
                      <div
                        style="
                          mso-line-height-rule: exactly;
                          line-height: 20px;
                          font-size: 1px;
                        "
                      >
                        &nbsp;
                      </div>
                    </div>

                    <div style="margin-left: 20px; margin-right: 20px">
                      <div
                        class="btn btn--flat btn--large"
                        style="margin-bottom: 20px; text-align: left"
                      >
                        <![if !mso]><a
                          style="
                            border-radius: 4px;
                            display: inline-block;
                            font-size: 14px;
                            font-weight: bold;
                            line-height: 24px;
                            padding: 12px 24px;
                            text-align: center;
                            text-decoration: none !important;
                            transition: opacity 0.1s ease-in;
                            color: #ffffff !important;
                            background-color: #5493c9;
                            font-family: Georgia, serif;
                          "
                          href="https://tipestry.com/"
                          >Get started</a
                        ><![endif]>
                        <!--[if mso
                          ]><p style="line-height: 0; margin: 0">&nbsp;</p>
                          <v:roundrect
                            xmlns:v="urn:schemas-microsoft-com:vml"
                            href="https://tipestry.com/"
                            style="width: 128px"
                            arcsize="9%"
                            fillcolor="#5493C9"
                            stroke="f"
                            ><v:textbox
                              style="mso-fit-shape-to-text: t"
                              inset="0px,11px,0px,11px"
                              ><center
                                style="
                                  font-size: 14px;
                                  line-height: 24px;
                                  color: #ffffff;
                                  font-family: Georgia, serif;
                                  font-weight: bold;
                                  mso-line-height-rule: exactly;
                                  mso-text-raise: 4px;
                                "
                              >
                                Get started
                              </center></v:textbox
                            ></v:roundrect
                          ><!
                        [endif]-->
                      </div>
                    </div>

                    <div style="margin-left: 20px; margin-right: 20px">
                      <div
                        style="
                          mso-line-height-rule: exactly;
                          line-height: 20px;
                          font-size: 1px;
                        "
                      >
                        &nbsp;
                      </div>
                    </div>

                    <div
                      style="
                        margin-left: 20px;
                        margin-right: 20px;
                        margin-bottom: 24px;
                      "
                    >
                      <div
                        style="
                          mso-line-height-rule: exactly;
                          mso-text-raise: 11px;
                          vertical-align: middle;
                        "
                      >
                        <p style="margin-top: 0; margin-bottom: 0">
                          Thank you for being an important part of Tipestry. Our
                          mission is to make social media fairer, less
                          centralized, more respectful of users' privacy, and to
                          give people around the world the opportunity to earn
                          money for creating and sharing content.
                        </p>
                      </div>
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </div>
              </div>

              <div
                style="
                  mso-line-height-rule: exactly;
                  line-height: 20px;
                  font-size: 20px;
                "
              >
                &nbsp;
              </div>

              <div role="contentinfo">
                <div
                  class="layout email-footer stack"
                  style="
                    margin: 0 auto;
                    max-width: 600px;
                    min-width: 320px;
                    width: 320px;
                    width: calc(28000% - 167400px);
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                  "
                >
                  <div
                    class="layout__inner"
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                    "
                  >
                    <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-email-footer"><td style="width: 400px;" valign="top" class="w360"><![endif]-->
                    <div
                      class="column wide"
                      style="
                        text-align: left;
                        font-size: 12px;
                        line-height: 19px;
                        color: #999;
                        font-family: Georgia, serif;
                        float: left;
                        max-width: 400px;
                        min-width: 320px;
                        width: 320px;
                        width: calc(8000% - 47600px);
                      "
                    >
                      <div
                        style="
                          margin-left: 20px;
                          margin-right: 20px;
                          margin-top: 10px;
                          margin-bottom: 10px;
                        "
                      >
                        <table
                          class="email-footer__links"
                          style="border-collapse: collapse; table-layout: fixed"
                          role="presentation"
                          emb-web-links
                        >
                          <tbody>
                            <tr role="navigation">
                              <td style="padding: 0; width: 26px" emb-web-links>
                                <a
                                  style="
                                    text-decoration: underline;
                                    transition: opacity 0.1s ease-in;
                                    color: #999;
                                  "
                                  href="https://www.facebook.com/tipestry"
                                  ><img
                                    style="border: 0"
                                    src="https://i2.createsend1.com/static/eb/master/13-the-blueprint-3/images/facebook.png"
                                    width="26"
                                    height="26"
                                    alt="Facebook"
                                /></a>
                              </td>
                              <td
                                style="padding: 0 0 0 3px; width: 26px"
                                emb-web-links
                              >
                                <a
                                  style="
                                    text-decoration: underline;
                                    transition: opacity 0.1s ease-in;
                                    color: #999;
                                  "
                                  href="https://twitter.com/tipestry"
                                  ><img
                                    style="border: 0"
                                    src="https://i3.createsend1.com/static/eb/master/13-the-blueprint-3/images/twitter.png"
                                    width="26"
                                    height="26"
                                    alt="Twitter"
                                /></a>
                              </td>
                              <td
                                style="padding: 0 0 0 3px; width: 26px"
                                emb-web-links
                              >
                                <a
                                  style="
                                    text-decoration: underline;
                                    transition: opacity 0.1s ease-in;
                                    color: #999;
                                  "
                                  href="https://www.youtube.com/channel/UC9u8IG9weAezdAzRw8LSyRw"
                                  ><img
                                    style="border: 0"
                                    src="https://i4.createsend1.com/static/eb/master/13-the-blueprint-3/images/youtube.png"
                                    width="26"
                                    height="26"
                                    alt="YouTube"
                                /></a>
                              </td>
                              <td
                                style="padding: 0 0 0 3px; width: 26px"
                                emb-web-links
                              >
                                <a
                                  style="
                                    text-decoration: underline;
                                    transition: opacity 0.1s ease-in;
                                    color: #999;
                                  "
                                  href="https://t.me/tipestry"
                                  ><img
                                    style="border: 0"
                                    src="https://i7.createsend1.com/static/eb/master/13-the-blueprint-3/images/website.png"
                                    width="26"
                                    height="26"
                                    alt="Website"
                                /></a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div
                          style="
                            font-size: 12px;
                            line-height: 19px;
                            margin-top: 20px;
                          "
                        >
                          <div>
                            Tipestry Ltd. &#65279;<br />
                            35-37 Ludgate Hill<br />
                            London, United Kingdom
                          </div>
                        </div>
                        <div
                          style="
                            font-size: 12px;
                            line-height: 19px;
                            margin-top: 18px;
                          "
                        >
                          <div>
                            You are receiving this email because you signed up
                            at tipestry.com.
                          </div>
                        </div>
                        <!--[if mso]>&nbsp;<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><td style="width: 200px;" valign="top" class="w160"><![endif]-->
                    <div
                      class="column narrow"
                      style="
                        text-align: left;
                        font-size: 12px;
                        line-height: 19px;
                        color: #999;
                        font-family: Georgia, serif;
                        float: left;
                        max-width: 320px;
                        min-width: 200px;
                        width: 320px;
                        width: calc(72200px - 12000%);
                      "
                    >
                      <div
                        style="
                          margin-left: 20px;
                          margin-right: 20px;
                          margin-top: 10px;
                          margin-bottom: 10px;
                        "
                      ></div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                  </div>
                </div>
                <div
                  class="layout one-col email-footer"
                  style="
                    margin: 0 auto;
                    max-width: 600px;
                    min-width: 320px;
                    width: 320px;
                    width: calc(28000% - 167400px);
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                  "
                >
                  <div
                    class="layout__inner"
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                    "
                  >
                    <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-email-footer"><td style="width: 600px;" class="w560"><![endif]-->
                    <div
                      class="column"
                      style="
                        text-align: left;
                        font-size: 12px;
                        line-height: 19px;
                        color: #999;
                        font-family: Georgia, serif;
                      "
                    >
                      <div
                        style="
                          margin-left: 20px;
                          margin-right: 20px;
                          margin-top: 10px;
                          margin-bottom: 10px;
                        "
                      >
                        <div style="font-size: 12px; line-height: 19px">
                          <a
                            href="https://tipestry.com/api/email/unsubscribe/${email}"
                            style="text-decoration: underline"
                            >Unsubscribe</a
                          >
                        </div>
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="line-height: 40px; font-size: 40px">&nbsp;</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;
};

export default EmailMarketing;
