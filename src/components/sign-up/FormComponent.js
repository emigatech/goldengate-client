import React, { Component } from "react";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import {API_URL, GRecaptcha, GaTag, GaDebug} from '../../config';
import qs from 'qs';
import Recaptcha from "react-google-invisible-recaptcha";
import ReactGA from 'react-ga';

class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_registered: false,
            startStatement: false,
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(v) {
        this.setState(v);
    }

    handleSubmit(e, recaptcha) {

        ReactGA.initialize(
            [
                {
                    trackingId: GaTag,
                    gaOptions: {
                        name: 'SignUpFormComponent',
                    }
                }
            ],
            { debug: GaDebug, alwaysSendToDefaultTracker: false }
        )

        this.setState(prevState => ({
            ...prevState,
            startStatement: true,
            error: '',
        }));

        fetch(`${API_URL}/api/auth/register?verify=${recaptcha.getResponse()}`,
            {
                method: 'post',
                headers: {
                    'content-type' : 'application/x-www-form-urlencoded'
                },
                body:qs.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname
                })
            })
            .then(res => res.json())
            .then(
                (data)=>{
                    if(data.status === 200)
                    {
                        this.setState(prevState => ({
                            ...prevState,
                            is_registered: true,
                            startStatement: true,
                            error: ''
                        }));
                        (this.props.history).push('/sign-in');
                    }
                    else {      
                        recaptcha.reset();
                                          
                        ReactGA.exception({
                            description: `Sign up error: ${data.message}`,
                            fatal: true
                        });

                        this.setState(prevState => ({
                            ...prevState,
                            is_registered: false,
                            startStatement: false,
                            email: '',
                            password: '',
                            error : data.message
                        }));
                    }
                }
            )
            .catch((err)=>{
                recaptcha.reset();

                ReactGA.exception({
                    description: `Sign up error: ${err}`,
                    fatal: true
                });

                this.setState(prevState => ({
                    ...prevState,
                    is_registered: false,
                    startStatement: false,
                    email: '',
                    password: '',
                    error : err
                }));

                console.error('Sign up error:',err)
            })
    }

    render() {
        const {email, password, firstname, lastname, error, startStatement} = this.state;
        return (
            <>
                <ValidatorForm
                    ref="form"
                    onSubmit={(e)=>{this.recaptcha.execute();}}
                    onError={(err) => {this.recaptcha.reset(); console.error(err);}}
                    noValidate
                    className="container"
                    autoComplete="off"
                    method="POST"
                >
                    { error !== '' ? <Alert severity="error" className="mt-3 mb-3">{error}</Alert> : ''}
                    <Recaptcha
                        ref={ ref => {this.recaptcha = ref;}}
                        onResolved={(e)=>{this.handleSubmit(e,this.recaptcha);}}
                        sitekey={GRecaptcha}
                    />
                    <div className="row">
                        <div className="col-6">
                            <TextValidator
                                className="pt-3 pb-3 mt-2 mb-2"
                                value={firstname}
                                autoFocus={true}
                                onChange={e=> this.handleChange({
                                    firstname: e.target.value
                                })}
                                name="firstname"
                                type="text"
                                fullWidth
                                label="Firstname"
                                variant="outlined"
                                placeholder="John"
                                disabled={startStatement}
                                InputLabelProps={{
                                    shrink: true,
                                    'aria-label': 'Firstname'
                                }}
                                validators={[
                                    'required'
                                ]}
                                errorMessages={[
                                    'firstname field is required'
                                ]}
                            />
                        </div>
                        <div className="col-6">
                            <TextValidator
                                className="pt-3 pb-3 mt-2 mb-2"
                                value={lastname}
                                onChange={e=> this.handleChange({
                                    lastname: e.target.value
                                })}
                                name="lastname"
                                type="text"
                                fullWidth
                                label="Lastname"
                                variant="outlined"
                                placeholder="Doe"
                                disabled={startStatement}
                                InputLabelProps={{
                                    shrink: true,
                                    'aria-label': 'Lastname'
                                }}
                                validators={[
                                    'required'
                                ]}
                                errorMessages={[
                                    'lastname field is required'
                                ]}
                            />
                        </div>
                    </div>

                    <TextValidator
                        className="pt-3 pb-3 mt-2 mb-2"
                        value={email}
                        onChange={e=> this.handleChange({
                            email: e.target.value
                        })}
                        name="email"
                        type="email"
                        fullWidth
                        label="Email"
                        variant="outlined"
                        placeholder="john@doe.com"
                        disabled={startStatement}
                        InputLabelProps={{
                            shrink: true,
                            'aria-label': 'Email'
                        }}
                        validators={[
                            'required'
                        ]}
                        errorMessages={[
                            'email address field is required'
                        ]}
                    />
                    <TextValidator
                        className="pt-3 pb-3 mt-2 mb-2"
                        value={password}
                        onChange={e=> this.handleChange({
                            password: e.target.value
                        })}
                        name="password"
                        type="password"
                        fullWidth
                        label="Password"
                        variant="outlined"
                        disabled={startStatement}
                        InputLabelProps={{
                            shrink: true,
                            'aria-label': 'Password'
                        }}
                        validators={[
                            'required'
                        ]}
                        errorMessages={[
                            'password field is required'
                        ]}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        className="text-lowercase text-capitalize pt-3 pb-3 mt-2 mb-2 shadow-sm"
                        name="submit"
                        variant="contained"
                        color="primary"
                        disableElevation
                        disabled={startStatement}
                    >Sign Up
                    </Button>
                </ValidatorForm>
            </>
        );
    }
}

ReactGA.pageview(window.location.pathname + window.location.search);
export default FormComponent;