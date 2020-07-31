import React from "react";
import FormComponent from "./../components/sign-in/FormComponent";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Helmet} from "react-helmet";

function SignIn() {
    let history = useHistory();
    
    const token     = (localStorage.getItem("token") || '').trim();
    const user_id   = (localStorage.getItem("user_id") || '').trim();
    const email     = (localStorage.getItem("email") || '').trim();
    const firstname = (localStorage.getItem("firstname") || '').trim();
    const lastname  = (localStorage.getItem("lastname") || '').trim();

    return(
        <>
            {token !== '' ? (history).push("/dashboard") : ''}
            {user_id !== '' ? (history).push("/dashboard") : ''}
            {email !== '' ? (history).push("/dashboard") : ''}
            {firstname !== '' ? (history).push("/dashboard") : ''}
            {lastname !== '' ? (history).push("/dashboard") : ''}

            <Helmet>
                <title>GoldenGate &mdash; Sign In</title>
            </Helmet>
            
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="pt-5">
                            <h1 className="container" style={{fontSize:'3rem'}}>
                                <Link to="/" className="link">
                                    <ArrowBackIcon fontSize="large"/>
                                </Link>
                                <b className="pr-2 pl-2">Sign in</b>
                            </h1>
                            <FormComponent history={history}/>
                            <div className="container pt-2">
                                <p>Don't have an account? <Link to="/sign-up" className="link">Sign up</Link></p>                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignIn;       