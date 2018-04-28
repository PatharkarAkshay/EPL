import React from 'react';
import classes from './EPLImage.css';
import EPLImage from '../../assets/epl-logo.png';

const eplImage = () => (
    <img src={EPLImage} className={classes.EPLImg} alt="EPL-Logo" />
);

export default eplImage;