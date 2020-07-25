import React, { Component } from "react";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import {API_URL, GRecaptcha} from '../../config';
import qs from 'qs';
import Recaptcha from "react-google-invisible-recaptcha";

class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_registered: false,
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

    handleSubmit(e) {
        
        this.setState(prevState => ({
            ...prevState,
            error: '',
        }));

        fetch(`${API_URL}/api/auth/register`,
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
                            error: ''
                        }));
                        (this.props.history).push('/sign-in');
                    }
                    else {
                        this.setState(prevState => ({
                            ...prevState,
                            is_registered: false,
                            error : data.message
                        }));
                    }
                }
            )
            .catch((err)=>{
                console.error('Sign up error:',err)
            })
    }

    render() {
        const {email, password, firstname, lastname, error} = this.state;
        return (
            <>
                <ValidatorForm
                    ref="form"
                    onSubmit={(e)=>{this.recaptcha.execute();}}
                    onError={(err) => { console.error(err) }}
                    noValidate
                    className="container"
                    autoComplete="off"
                    method="POST"
                >
                    { error !== '' ? <Alert severity="error" className="mt-3 mb-3">{error}</Alert> : ''}
                    <Recaptcha
                        ref={ ref => {this.recaptcha = ref;}}
                        onResolved={(e)=>{this.handleSubmit(e);}}
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
                        className="pt-3 pb-3 mt-2 mb-2 shadow-sm"
                        name="submit"
                        variant="contained"
                        color="primary"
                        disableElevation
                    >Sign Up
                    </Button>
                </ValidatorForm>
            </>
        );
    }
}

export default FormComponent;