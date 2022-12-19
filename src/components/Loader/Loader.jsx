import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import classes from './Loader.module.css';

export function Loader() {
    return (
        <div className={classes.LoaderContainer}>
            <div>
                <ColorRing />
            </div>
        </div>
    );
}
