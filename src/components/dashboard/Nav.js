import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import Logo from './../../images/emiga-logo.png';

class Nav extends Component {

    render() {

        return(
            <>
                <div className="container pt-3 pb-3">
                    <div className="d-flex justify-content-between">
                        <div className="logo">
                            <Link to="/">
                                <img src={Logo} alt="goldengate.emiga.tech" style={{height:'40px'}} className="img-fluid"/>
                            </Link>
                        </div>
                        <div>
                            <div className="d-flex justify-content-between">
                                <Avatar className="bg-black">
                                    {(this.props.firstname).charAt(0).toUpperCase()}{(this.props.lastname).charAt(0).toUpperCase()}
                                </Avatar>
                                <Link to="/sign-in" className="mt-2 ml-2 pt-1 pr-2 pl-2 link"
                                      onClick={e=>{
                                          localStorage.removeItem('token');
                                          localStorage.removeItem('user_id');
                                          localStorage.removeItem('email');
                                          localStorage.removeItem('firstname');
                                          localStorage.removeItem('lastname');
                                          (this.props.history).push("/sign-in");
                                      }}
                                >Log out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Nav;