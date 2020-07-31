import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ErrorPic from './../images/404.png';

function Error() {
    
    return(
        <>
            <Helmet>
                <title>GoldenGate &mdash; Error 404</title>
                <meta name="robots" content="noindex,nofollow"/>
            </Helmet>

            <div className="container pt-5 text-center">
                <img src={ErrorPic} 
                     alt="Error Message"
                     style={{height:'280px'}}
                     className="img-fluid mt-2 mb-2"/>
                <h1>
                    <b>Oops! Page not found</b>
                </h1>
                <h6 className="pt-2 pb-2">The page you are looking for might have been removed <br></br> had its name changed or is temporarily unavailable.</h6>
                <h4>
                    <Link to="/" className="link pt-2 pb-2 pl-1 pr-1">
                        <u>Back to Home</u>
                    </Link>
                </h4>
            </div>
        </>
    )
}

export default Error;