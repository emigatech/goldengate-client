import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Error from "./pages/Error";

import "./style/global.scss";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function Routes(){

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    primary: {
                        // light: will be calculated from palette.primary.main,
                        main: '#000000',
                        // dark: will be calculated from palette.primary.main,
                        // contrastText: will be calculated to contrast with palette.primary.main
                    },
                    // Used by `getContrastText()` to maximize the contrast between
                    // the background and the text.
                    contrastThreshold: 3,
                    // Used by the functions below to shift a color's luminance by approximately
                    // two indexes within its tonal palette.
                    // E.g., shift from Red 500 to Red 300 or Red 700.
                    tonalOffset: 0.2,
                },
            }),
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Landing/>
                    </Route>
                    <Route exact path="/sign-in">
                        <SignIn/>
                    </Route>
                    <Route exact path="/sign-up">
                        <SignUp/>
                    </Route>
                    <Route exact path="/dashboard">
                        <Dashboard/>
                    </Route>
                    <Route path="*">
                        <Error/>
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default Routes;      