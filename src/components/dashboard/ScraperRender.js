import React, { Component } from "react";
import { API_URL, GaTag, GaDebug } from '../../config';
import {Button} from "@material-ui/core";
import Loading from './../../images/loading.gif';
import { JsonToTable } from "react-json-to-table";
import Divider from '@material-ui/core/Divider';
import ReactGA from 'react-ga';

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

        ReactGA.initialize(
            [
                {
                    trackingId: GaTag,
                    gaOptions: {
                        name: 'ScrapeRender',
                        userId: (localStorage.getItem("user_id") || '').trim() || null,
                    }
                }
            ],
            { debug: GaDebug, alwaysSendToDefaultTracker: false }
        )

        fetch(`${API_URL}/api/data/results/${this.state.key}`, {
            method: 'get',
            headers: {
                'Authorization' : `Bearer ${this.props.token}`
            },
        })
            .then(res => res.json())
            .then(
                (data)=>{
                    
                    ReactGA.event({
                        category: 'User',
                        action: `searched url => ${(this.props.data).url || null}`
                    })

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

                        ReactGA.exception({
                            description: `Scrape error: ${data.message}`,
                            fatal: true
                        });

                        this.setState(prevState => ({
                            ...prevState,
                            isLoaded: false,
                            error : data.message
                        }));
                    }
                }
            )
            .catch((err)=>{
                ReactGA.exception({
                    description: `Scrape error: ${err}`,
                    fatal: true
                });

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

                                <div className="col-sm-12 col-md-6 mt-2 mb-2" >
                                    <div className="browser p-0"
                                        style={{height:'340px',overflow:'scroll',overflowX:'hidden'}}>
                                        <div className="browser__head">
                                            <div className="browser__buttons">
                                            <div className="browser__button browser__button--close"></div>
                                            <div className="browser__button browser__button--minimize"></div>
                                            <div className="browser__button browser__button--maximize"></div>
                                        </div>
                                            <div className="browser__url-bar"></div>
                                            <div className="browser__options">
                                                <div className="browser__option-bar"></div>
                                                <div className="browser__option-bar"></div>
                                                <div className="browser__option-bar"></div>
                                            </div>
                                        </div>
                                        <div className="browser__viewport">
                                            <img alt={html} src={image}
                                                className="img-fluid"
                                                key="data-explorer-website-snapshot"/>
                                        </div>
                                    </div>
                                    <a rel="noopener noreferrer"
                                            href={html}
                                            target="_blank"
                                            className="link"
                                            style={{color:'#ffffff'}}
                                            key="data-explorer-website-cached-html"
                                        >
                                        <Button
                                            fullWidth
                                            size="large"
                                            className="pt-3 pb-3 mt-2 mb-2 shadow-sm"
                                            variant="contained"
                                            color="primary"
                                            disableElevation
                                        >
                                            View Website   
                                        </Button>        
                                    </a>
                                </div>
                                
                                <div className="col-sm-12 col-md-6 mt-2 mb-2">
                                    <p className="mt-1 mb-1" key="data-explorer-key">#{key}</p>
                                    <div className="pt-4 pb-4">
                                        <h1 className="mt-2 mb-2" style={{
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            display: 'inherit',
                                        }}>
                                            {url}
                                        </h1>
                                        <h6 key="data-explorer-seo-title">
                                            {data?.seo?.title?.meta[0] ? data.seo.title.meta[0] : null}
                                        </h6>
                                        <p key="data-explorer-seo-description">
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
                                            key="data-explorer-seo"
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

ReactGA.pageview(window.location.pathname + window.location.search);
export default ScraperRender;
