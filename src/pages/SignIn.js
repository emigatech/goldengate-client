import React from "react";
import FormComponent from "./../components/sign-in/FormComponent";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function SignIn() {
    let history = useHistory();

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="pt-5">
                            <h1 className="container" style={{fontSize:'3rem'}}>
                                <b>Sign in</b>
                            </h1>
                            <FormComponent history={history}/>
                            <div className="container pt-2">
                                <p>Don't have an account? <Link to="/sign-up" className="link">Sign up</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignIn;       