import React from "react";
import FormComponent from "./../components/sign-up/FormComponent";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function SignUp() {
    let history = useHistory();
    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="pt-5">
                            <h1 className="container" style={{fontSize:'3rem'}}>
                                <b>Get Started</b>
                            </h1>
                            <FormComponent history={history}/>
                            <div className="container pt-2">
                                <p>Do you have an account? <Link to="/sign-in" className="link">Sign in</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;