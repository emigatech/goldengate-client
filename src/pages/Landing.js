import React from "react";
import { Link } from "react-router-dom";
import Logo from './../images/emiga-logo.png';
import Landing from './../images/landing.PNG';
import {Button} from "@material-ui/core";
import { Helmet } from "react-helmet";

function SignUp() {
    
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
                    <div className="col-sm-12 col-md-8 mt-5"
                         style={{height:'500px',overflow:'scroll',overflowX:'hidden'}}>
                        <img src={Landing} alt="Landing goldengate.emiga.tech"
                             className="img-fluid border"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;