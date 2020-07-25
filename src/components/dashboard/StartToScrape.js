import React, { Component } from "react";
import FireData from './../../images/fireData.png';
import Loading from './../../images/loading.gif';

class StartToScrape extends Component {

    render() {
        if(this.props.startStatement)
        {
            return(
                <>
                    <div className="container pt-2 pb-2">
                        <div className="text-center pt-3 mt-3">
                            <h1 className="pt-3 pb-3" style={{fontSize:'3rem'}}>
                                <b>Scraping has been started</b>
                            </h1>
                            <img src={Loading} alt="There is no results to show"
                                 className="popper-img img-fluid mt-2 mb-2"/>
                        </div>
                    </div>
                </>
            )
        }
        else {
            return(
                <>
                    <div className="container pt-2 pb-2">
                        <div className="text-center pt-3 mt-3">
                            <h1 className="pt-3 pb-3" style={{fontSize:'3rem'}}>
                                <b>Let's start to scrape</b>
                            </h1>
                            <img src={FireData} alt="There is no results to show"
                                 className="popper-img img-fluid mt-2 mb-2"/>
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default StartToScrape;