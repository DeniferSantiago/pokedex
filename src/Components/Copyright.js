import React from 'react'
import { Typography } from '@material-ui/core';
export const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Denifer Santiago Copyright © "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
