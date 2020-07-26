import React, { Component } from "react";
import { API_URL } from '../../config';
import {Button} from "@material-ui/core";
import Loading from './../../images/loading.gif';
import { JsonToTable } from "react-json-to-table";
import Divider from '@material-ui/core/Divider';

class ScraperRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html: (this.props.data).storage.html,
            image: (this.props.data).storage.image,
            url: (this.props.data).url,
            key: (this.props.data).key,
            isLoaded: false,
            data: []
        }
    }
    componentDidMount () {
        fetch(`${API_URL}/api/data/results/${this.state.key}`, {
            method: 'get',
            headers: {
                'Authorization' : `Bearer ${this.props.token}`
            },
        })
            .then(res => res.json())
            .then(
                (data)=>{
                    if(data.status === 200)
                    {
                        this.setState(prevState => ({
                            ...prevState,
                            isLoaded: true,
                            data: data.data
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
                            isLoaded: false,
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
        const { html, image, data, isLoaded, url, key } = this.state;

        return(
            <>
                { isLoaded ?
                    <>
                        <div className="container pt-2 pb-2">
                            <div className="row">
                                <div className="col-sm-12 col-md-6 mt-2 mb-2">
                                    <div className="browser-container w-100">
                                        <img className="w-100 p-0" alt={html} src={image}/>
                                    </div>
                                    <Button
                                        fullWidth
                                        size="large"
                                        className="pt-3 pb-3 mt-2 mb-2 shadow-sm"
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                    >
                                        <a rel="noopener noreferrer"
                                           href={html}
                                           target="_blank"
                                           className="link"
                                           style={{color:'#ffffff'}}
                                        >
                                            View Website
                                        </a>
                                    </Button>
                                </div>
                                <div className="col-sm-12 col-md-6 mt-2 mb-2">
                                    <p className="mt-1 mb-1">#{key}</p>
                                    <div className="pt-4 pb-4">
                                        <h1 className="mt-2 mb-2" style={{
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            display: 'inherit',
                                            width: '200px'
                                        }}>
                                            {url}
                                        </h1>
                                        <h6>
                                            {data?.seo?.title?.meta[0] ? data.seo.title.meta[0] : null}
                                        </h6>
                                        <p>
                                            {data?.seo?.description?.meta[0] ? data.seo.description.meta[0] : null}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-12 mt-2 mb-2">
                                    <h1 style={{fontSize:'3rem'}}>
                                        <b>Data Explorer</b>
                                    </h1>

                                    <Divider style={{marginTop:'10px',marginBottom:'10px'}}/>

                                    <h2 style={{fontSize:'2rem'}}>
                                        <b>Seo Data</b>
                                    </h2>
                                    <div className="table-responsive pt-2 pb-2 mt-2 mb-2">
                                        <JsonToTable 
                                            className="w-100 data-explorer"
                                            key="data-explorer-text"
                                            json={data.seo} 
                                        />
                                    </div>
                                    
                                    <Divider style={{marginTop:'10px',marginBottom:'10px'}}/>

                                    <h2 style={{fontSize:'2rem'}}>
                                        <b>Links on website</b>
                                    </h2>
                                    <div className="table-responsive pt-2 pb-2 mt-2 mb-2">
                                        <JsonToTable 
                                            className="w-100 data-explorer"
                                            key="data-explorer-text"
                                            json={data.url} 
                                        />
                                    </div>
                                    
                                    <Divider style={{marginTop:'10px',marginBottom:'10px'}}/>

                                    <h2 style={{fontSize:'2rem'}}>
                                        <b>Media Data</b>
                                    </h2>
                                    <div className="table-responsive pt-2 pb-2 mt-2 mb-2">
                                        <JsonToTable 
                                            className="w-100 data-explorer"
                                            key="data-explorer-media"
                                            json={data.media} 
                                        />
                                    </div>

                                    <Divider style={{marginTop:'10px',marginBottom:'10px'}}/>

                                    <h2 style={{fontSize:'2rem'}}>
                                        <b>Text Data</b>
                                    </h2>
                                    <div className="table-responsive pt-2 pb-2 mt-2 mb-2">
                                        <JsonToTable 
                                            className="w-100 data-explorer"
                                            key="data-explorer-text"
                                            json={data.text} 
                                        />
                                    </div>

                                    <Divider style={{marginTop:'10px',marginBottom:'10px'}}/>

                                    <h2 style={{fontSize:'2rem'}}>
                                        <b>Table Data</b>
                                    </h2>
                                    <div className="table-responsive pt-2 pb-2 mt-2 mb-2">
                                        <JsonToTable 
                                            className="w-100 data-explorer"
                                            key="data-explorer-table"
                                            json={data.table} 
                                        />
                                    </div>

                                    <Divider style={{marginTop:'10px',marginBottom:'10px'}}/>

                                    <h2 style={{fontSize:'2rem'}}>
                                        <b>Lists on website</b>
                                    </h2>
                                    <div className="table-responsive pt-2 pb-2 mt-2 mb-2">
                                        <JsonToTable 
                                            className="w-100 data-explorer"
                                            key="data-explorer-list"
                                            json={data.list} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="container pt-2 pb-2">
                            <div className="text-center pt-3 mt-3">
                                <h1 className="pt-3 pb-3" style={{fontSize:'3rem'}}>
                                    <b>Fetching data</b>
                                </h1>
                                <img src={Loading} alt="There is no results to show"
                                     className="popper-img img-fluid mt-2 mb-2"/>
                            </div>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default ScraperRender;