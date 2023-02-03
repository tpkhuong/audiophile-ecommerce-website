import React from "react";
import Link from "next/link";
import LogoNavStyles from "../../styles/Components/shared/LogoNavContainer.module.css";
import FullMenuNav from "./FullMenuNav";
import CartBtnModal from "./CartBtnAndModal";
import { useSession } from "next-auth/react";
import { showMobileNav, targetLastMobileNavElement } from "../../utils/helpers";
import { logoutHandler } from "../../utils/authHelpers";

function LogoNavContainer({ children, ...props }) {
  return (
    <div
      onKeyDown={targetLastMobileNavElement}
      className={LogoNavStyles[`logo-nav-container`]}
    >
      {/* hamburger/close btn */}
      <div
        onClick={showMobileNav}
        className={LogoNavStyles[`button-container`]}
      >
        {/* hamburger btn*/}
        <button
          className={LogoNavStyles[`open-menu`]}
          aria-label="open mobile navigation"
          data-ismenuopen="false"
        >
          <svg width="24" height="17" xmlns="http://www.w3.org/2000/svg">
            <g fill="#FFF" fillRule="evenodd">
              <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
            </g>
          </svg>
        </button>
        {/* close btn */}
        <button
          className={LogoNavStyles[`close-menu`]}
          aria-label="close mobile navigation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21">
            <path
              fill="#1B1D23"
              fillRule="evenodd"
              d="M17.425.954l2.12 2.121-7.424 7.425 7.425 7.425-2.121 2.12L10 12.622l-7.425 7.425-2.12-2.121L7.878 10.5.454 3.075 2.575.955 10 8.378 17.425.954z"
            />
          </svg>
        </button>
      </div>
      {/* logo */}
      <Link href="/">
        <a className={LogoNavStyles[`logo`]}>
          <svg width="143" height="25" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.363 20.385c1.63 0 3.087-.537 4.237-1.47l.414.994h3.739V5.853h-3.605l-.495 1.087c-1.16-.958-2.637-1.51-4.29-1.51C3.069 5.43 0 8.527 0 12.88c0 4.37 3.07 7.505 7.363 7.505zm.646-4.287c-1.811 0-3.143-1.37-3.143-3.206 0-1.824 1.32-3.195 3.143-3.195 1.812 0 3.144 1.37 3.144 3.195 0 1.836-1.332 3.206-3.144 3.206zm17.535 4.287c4.148 0 6.91-2.562 6.91-6.495V5.868h-4.836v7.811c0 1.47-.782 2.357-2.074 2.357-1.292 0-2.09-.873-2.09-2.357V5.868h-4.836v8.022c0 3.933 2.778 6.495 6.926 6.495zm16.328.015c1.636 0 3.093-.557 4.235-1.52l.456 1.044h3.58V.792H45.36v5.591a6.551 6.551 0 00-3.489-.976c-4.309 0-7.378 3.12-7.378 7.489 0 4.368 3.07 7.504 7.378 7.504zm.647-4.287c-1.812 0-3.143-1.381-3.143-3.217 0-1.835 1.331-3.216 3.143-3.216 1.812 0 3.143 1.38 3.143 3.216 0 1.836-1.331 3.217-3.143 3.217zM57.976 4.109V0h-4.763v4.109h4.763zm.037 15.815V5.868h-4.837v14.056h4.837zm10.097.46c4.563 0 7.872-3.146 7.872-7.488 0-4.357-3.31-7.489-7.872-7.489-4.579 0-7.873 3.132-7.873 7.489 0 4.342 3.294 7.489 7.873 7.489zm0-4.348c-1.764 0-3.029-1.281-3.029-3.14 0-1.858 1.265-3.139 3.029-3.139 1.763 0 3.028 1.292 3.028 3.14 0 1.858-1.265 3.139-3.028 3.139zM82.998 25v-5.534a6.56 6.56 0 003.423.934c4.293 0 7.362-3.125 7.362-7.504 0-4.38-3.069-7.489-7.362-7.489-1.669 0-3.155.578-4.31 1.578l-.605-1.117h-3.29V25h4.782zm2.776-8.887c-1.812 0-3.143-1.37-3.143-3.217s1.331-3.217 3.143-3.217c1.811 0 3.143 1.37 3.143 3.217 0 1.846-1.343 3.217-3.143 3.217zm15.065 3.811v-7.506c0-1.804.912-2.843 2.376-2.843 1.262 0 1.83.826 1.83 2.447v7.902h4.837V11.46c0-3.644-2.071-6.008-5.295-6.008-1.4 0-2.714.507-3.748 1.34v-6h-4.837v19.132h4.837zM117.574 4.11V0h-4.763v4.109h4.763zm.037 15.815V5.868h-4.837v14.056h4.837zm7.878 0V.792h-4.836v19.132h4.836zm9.851.461c3.523 0 6.364-2.004 7.352-5.212h-4.813c-.465.823-1.409 1.318-2.539 1.318-1.527 0-2.55-.834-2.866-2.446H142.9c.063-.435.1-.858.1-1.282 0-4.123-3.134-7.356-7.66-7.356-4.407 0-7.626 3.17-7.626 7.478 0 4.295 3.245 7.5 7.626 7.5zm2.896-9.021h-5.677c.391-1.396 1.372-2.163 2.781-2.163 1.46 0 2.471.758 2.896 2.163z"
              fill="#FFF"
              fillRule="nonzero"
            />
          </svg>
        </a>
      </Link>
      {/* full menu */}
      <FullMenuNav current={props.page} headerNav="true" navLabel="primary" />
      <div
        id="logonavspacer"
        data-loginbtnrender="false"
        className={LogoNavStyles[`spacer-container`]}
      >
        <LoginRegisterContainer />
      </div>
      {/* cart button */}
      <CartBtnModal />
    </div>
  );
}

export default LogoNavContainer;

function LoginRegisterContainer({ children, ...props }) {
  const [hasMounted, setHasMounted] = React.useState(false);
  const { data: session, loading } = useSession();

  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  {
    /* login,register buttons */
  }
  return (
    <div className={LogoNavStyles[`register-login-container`]}>
      {hasMounted ? (
        <React.Fragment>
          {!session && !loading && (
            <React.Fragment>
              <Link href="/login">
                <a
                  className={LogoNavStyles[`login-btn`]}
                  aria-label="login with your user account"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    //   width="42"
                    //   height="42"
                    viewBox="0 0 25 25"
                  >
                    <path d="M10 2v2h12v16h-12v2h14v-20h-14zm0 7.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7z" />
                  </svg>
                </a>
              </Link>
              <Link href="/register">
                <a
                  className={LogoNavStyles[`register-btn`]}
                  aria-label="regiser new user"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    //   width="24"
                    //   height="24"
                    viewBox="0 0 25 25"
                  >
                    <path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
                  </svg>
                </a>
              </Link>
            </React.Fragment>
          )}
          {session && (
            <React.Fragment>
              <Link href="/">
                <a
                  onClick={logoutHandler}
                  className={LogoNavStyles[`register-btn`]}
                  aria-label="regiser new user"
                >
                  <svg
                    fill="none"
                    // height="24"
                    viewBox="0 0 23 23"
                    // width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M3 13H15V11H3V13Z"
                      fill="black"
                      fillRule="evenodd"
                    />
                    <path
                      clipRule="evenodd"
                      d="M5.79282 7.79291L2.29282 11.2929C1.90229 11.6834 1.90229 12.3166 2.29282 12.7071L5.79282 16.2071L7.20703 14.7929L4.41414 12L7.20703 9.20712L5.79282 7.79291Z"
                      fill="black"
                      fillRule="evenodd"
                    />
                    <path
                      clipRule="evenodd"
                      d="M8 4C8 3.44772 8.44772 3 9 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H9C8.44772 21 8 20.5523 8 20V17H10V19H20V5H10V7H8V4Z"
                      fill="black"
                      fillRule="evenodd"
                    />
                  </svg>
                </a>
              </Link>
            </React.Fragment>
          )}
        </React.Fragment>
      ) : null}
    </div>
  );
}
