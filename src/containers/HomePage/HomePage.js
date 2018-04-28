import React from 'react';
import EPLImage from '../../components/EPLImage/EPLImage';
import classes from './HomePage.css';
import { Link } from 'react-router-dom';

const homePage = (props) => {
    return(
        
            <div className={classes.HomePage}>
                <EPLImage />
                <h3 style={{color : '#24003c'}}>Year : 2016-17</h3>
                <nav>
                    <ul>
                        <li><Link to="/points-table">POINTS TABLE</Link></li>
                        <li><Link to="/matchs-held">MATCHES HELD</Link></li>
                    </ul>
                </nav>
            </div>
        
    );
}

export default homePage;