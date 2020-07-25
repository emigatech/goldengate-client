import React from "react";
import { useHistory } from "react-router-dom";
import Main from '../components/dashboard/Main';
import Nav from '../components/dashboard/Nav';
import {Paper} from "@material-ui/core";

function Dashboard() {
    let history      = useHistory();
    const token      =  (localStorage.getItem("token") || '').trim();
    const user_id    =  (localStorage.getItem("user_id") || '').trim();
    const email      =  (localStorage.getItem("email") || '').trim();
    const firstname  =  (localStorage.getItem("firstname") || '').trim();
    const lastname   =  (localStorage.getItem("lastname") || '').trim();

    return(
        <>
            { token === '' ? (history).push("/sign-in") : ''}
            { user_id === '' ? (history).push("/sign-in") : ''}
            { email === '' ? (history).push("/sign-in") : ''}
            { firstname === '' ? (history).push("/sign-in") : ''}
            { lastname === '' ? (history).push("/sign-in") : ''}

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