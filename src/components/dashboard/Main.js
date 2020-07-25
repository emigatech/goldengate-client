import React, { Component } from "react";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Divider from '@material-ui/core/Divider';
import Alert from "@material-ui/lab/Alert/Alert";
import {Button} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { API_URL } from '../../config';
import qs from 'qs';
import ScraperRender from './ScraperRender';
import StartToScrape from './StartToScrape';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            url: '',
            device:'desktop',
            isLoaded: false,
            startStatement: false,
            data: []
        }
    }

    handleChange(v) {
        this.setState(v);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState(prevState => ({
            ...prevState,
            startStatement: true,
            isLoaded: false,
            error: '',
            data: []
        }));

        fetch(`${API_URL}/api/worker/start`,
            {
                method: 'post',
                headers: {
                    'content-type' : 'application/x-www-form-urlencoded'
                },
                body:qs.stringify({
                    token: this.props.token,
                    device: this.state.device,
                    url: this.state.url
                })
            })
            .then(res => res.json())
            .then(
                (data)=>{
                    if(data.status === 201)
                    {
                        this.setState(prevState => ({
                            ...prevState,
                            isLoaded: true,
                            startStatement: false,
                            data: data
                        }));
                    }
                    else if(data.status === 401)
                    {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user_id');
                        localStorage.removeItem('email');
                        localStorage.removeItem('firstname');
                        localStorage.removeItem('lastname');
                        (this.props.history).push("/sign-in");
                    }
                    else {
                        this.setState(prevState => ({
                            ...prevState,
                            startStatement: false,
                            error : data.message
                        }));
                    }
                }
            )
            .catch((err)=>{
                console.error('Scrape error:',err)
            })
    }

    render() {
        const { error, url, device, data, isLoaded, startStatement } = this.state;

        return(
            <>
                <ValidatorForm
                    ref="form"
                    onSubmit={(e) => { this.handleSubmit(e) }}
                    onError={(err) => { console.error(err) }}
                    noValidate
                    className="container"
                    autoComplete="off"
                    method="POST"
                >
                    { error !== '' ? <Alert severity="error" className="mt-3 mb-3">{error}</Alert> : ''}
                    <div className="row">
                        <div className="col-sm-12 col-md-2">
                            <Select fullWidth
                                    value={device}
                                    label="Device"
                                    variant="outlined"
                                    name="device"
                                    className="mt-4 mb-2"
                                    onChange={e=> this.handleChange({
                                        device: e.target.value
                                    })}
                            >
                                <MenuItem value="desktop">Desktop</MenuItem>
                                <MenuItem value="mobile">Mobile</MenuItem>
                            </Select>
                        </div>
                        <div className="col-sm-12 col-md-8">
                            <TextValidator
                                className="pt-3 pb-3 mt-2 mb-2"
                                value={url}
                                autoFocus={true}
                                onChange={e=> this.handleChange({
                                    url: e.target.value
                                })}
                                name="url"
                                type="url"
                                fullWidth
                                variant="outlined"
                                placeholder="https://example.com"
                                InputLabelProps={{
                                    shrink: true,
                                    'aria-label': 'Email'
                                }}
                                validators={[
                                    'required'
                                ]}
                                errorMessages={[
                                    'url field is required'
                                ]}
                            />
                        </div>
                        <div className="col-sm-12 col-md-2">
                            <Button
                                type="submit"
                                fullWidth
                                size="large"
                                className="pt-3 pb-3 shadow-sm"
                                name="submit"
                                variant="contained"
                                color="primary"
                                disableElevation
                                style={{marginTop:'20px', marginBottom:'20px'}}
                            >Scrape
                            </Button>
                        </div>
                    </div>
                </ValidatorForm>
                <Divider style={{height:'20px'}}/>
                { isLoaded ?
                    <ScraperRender token={this.props.token}
                                   history={this.props.history}
                                   data={data}
                    />
                    :
                    <StartToScrape startStatement={startStatement}/>
                }
            </>
        )
    }
}

export default Main;