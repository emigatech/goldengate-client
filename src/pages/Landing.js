import React from "react";
import { Link } from "react-router-dom";
import Logo from './../images/emiga-logo.png';
import Landing from './../images/landing.PNG';
import {Button} from "@material-ui/core";
import { Helmet } from "react-helmet";
import {GaTag, GaDebug} from './../config';
import ReactGA from 'react-ga';

function SignUp() {
    ReactGA.initialize(
        [
            {
                trackingId: GaTag,
                gaOptions: {
                    name: 'Landing'
                }
            }
        ],
        { debug: GaDebug, alwaysSendToDefaultTracker: false }
    );

    ReactGA.event({
        category: 'Landing',
        action: 'Landing page rendered'
    });
    
    ReactGA.pageview(window.location.pathname + window.location.search);
    
    return(
        <>
            <Helmet>
                <title>GoldenGate &mdash; Scrape The Internet</title>
            </Helmet>

            <div className="container pt-3">
                <div className="text-center">
                    <img src={Logo} alt="goldengate.emiga.tech"
                         className="img-fluid" style={{height:'32px'}}/>
                </div>
                <div className="row pt-2 pb-2">
                    <div className="col-sm-12 col-md-4 pt-3 pb-3 mt-5">
                        <h1 style={{fontSize:'3rem'}}><b>GoldenGate</b></h1>
                        <p>Provides a open-source API for scraping dynamic or static websites.</p>
                        <Link to="/sign-in" className="link">
                            <Button
                                fullWidth
                                size="large"
                                className="pt-3 pb-3 mt-2 mb-2 shadow-sm link"
                                variant="contained"
                                color="primary"
                                disableElevation
                            >Get Started
                            </Button>
                        </Link>
                    </div>
                    <div className="browser col-sm-12 col-md-8 mt-5 p-0"
                         style={{height:'500px',overflow:'scroll',overflowX:'hidden'}}>
                        <div className="browser__head">
                            <div className="browser__buttons">
                            <div className="browser__button browser__button--close"></div>
                            <div className="browser__button browser__button--minimize"></div>
                            <div className="browser__button browser__button--maximize"></div>
                            </div>
                            <div className="browser__url-bar"></div>
                            <div className="browser__options">
                                <div className="browser__option-bar"></div>
                                <div className="browser__option-bar"></div>
                                <div className="browser__option-bar"></div>
                            </div>
                        </div>
                        <div className="browser__viewport">
                            <img src={Landing} alt="Landing goldengate.emiga.tech"
                                className="img-fluid"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;