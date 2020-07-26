import React, { Component } from "react";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import { API_URL, GRecaptcha } from '../../config';
import qs from 'qs';
import Recaptcha from 'react-google-invisible-recaptcha';

class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_logged: false,
            startStatement: false,
            email: '',
            password: '',
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
            startStatement: true,
            error: '',
        }));

        fetch(`${API_URL}/api/auth/login`,
            {
                method: 'post',
                headers: {
                    'content-type' : 'application/x-www-form-urlencoded'
                },
                body:qs.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(res => res.json())
            .then(
                (data)=>{
                    if(data.status === 200)
                    {
                        localStorage.setItem('user_id', data.data.id);
                        localStorage.setItem('email', data.data.email);
                        localStorage.setItem('firstname', data.data.firstname);
                        localStorage.setItem('lastname', data.data.lastname);
                        localStorage.setItem('token', data.data.token);
                        this.setState(prevState => ({
                            ...prevState,
                            is_logged: true,
                            startStatement: true,
                            error: ''
                        }));
                        (this.props.history).push('/dashboard');
                    }
                    else {
                        this.setState(prevState => ({
                            ...prevState,
                            is_logged: false,
                            startStatement: false,
                            error : data.message
                        }));
                    }
                }
            )
            .catch((err)=>{
                console.error('Sign in error:',err)
            })
    }

    render() {
        const {email, password, error, startStatement} = this.state;
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
                    <TextValidator
                        className="pt-3 pb-3 mt-2 mb-2"
                        value={email}
                        autoFocus={true}
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
                    >Sign in
                    </Button>
                </ValidatorForm>
            </>
        );
    }
}

export default FormComponent;   