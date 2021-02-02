import { Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useContext } from 'react'
import { AlertContext } from '../Helpers/AlertContext';

export const Alerts = () => {
    const { alertData, setAlert } = useContext(AlertContext);
    const severity = alertData?.isMessage? "info" : "error";
    const OnActionClick = () => {
        setAlert(null);
        const fn = alertData?.action?.onClick;
        if(typeof fn === "function")
            fn();
    };
    const OnClose = () => {
        setAlert(null);
        const fn = alertData?.callback;
        if(typeof fn === "function")
            fn();
    };
    return (
        <Snackbar open={!!alertData} autoHideDuration={4000} onClose={OnClose}>
            <Alert 
                action={alertData?.action? (<Button onClick={OnActionClick} color="inherit" size="small">{alertData?.action?.text}</Button>) : null } 
                onClose={OnClose}
                severity={severity}>
                {alertData?.message}
            </Alert>
        </Snackbar>
    )
}
