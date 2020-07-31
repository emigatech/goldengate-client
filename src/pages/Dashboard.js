import React from "react";
import { useHistory } from "react-router-dom";
import Main from '../components/dashboard/Main';
import Nav from '../components/dashboard/Nav';
import { Paper } from "@material-ui/core";
import { Helmet } from "react-helmet";
import ReactGA from 'react-ga';
import {GaTag} from './../config';

function Dashboard() {
    let history = useHistory();
    
    const token     = (localStorage.getItem("token") || '').trim();
    const user_id   = (localStorage.getItem("user_id") || '').trim();
    const email     = (localStorage.getItem("email") || '').trim();
    const firstname = (localStorage.getItem("firstname") || '').trim();
    const lastname  = (localStorage.getItem("lastname") || '').trim();

    ReactGA.initialize(
        [
            {
                trackingId: GaTag,
                gaOptions: {
                    name: 'Dashboard',
                    userId: user_id,
                }
            }
        ],
        { debug: true, alwaysSendToDefaultTracker: false }
    );

    ReactGA.event({
        category: 'User',
        action: 'Entered to dashboard'
    });
    
    ReactGA.pageview(window.location.pathname + window.location.search);

    return (
        <>
            {token === '' ? (history).push("/sign-in") : ''}
            {user_id === '' ? (history).push("/sign-in") : ''}
            {email === '' ? (history).push("/sign-in") : ''}
            {firstname === '' ? (history).push("/sign-in") : ''}
            {lastname === '' ? (history).push("/sign-in") : ''}

            <Helmet>
                <title>GoldenGate &mdash; {firstname}'s Dashboard</title>
            </Helmet>

            <Nav history={history}
                firstname={firstname}
                lastname={lastname}
            />
            <div className="container">
                <Paper elevation={0} className="pt-2 pb-2 mt-3 mb-3 min-vh-100">
                    <Main history={history}
                        token={token}
                        user_id={user_id}
                        email={email}
                        firstname={firstname}
                        lastname={lastname}
                    />
                </Paper>
            </div>
        </>
    )
}

export default Dashboard;