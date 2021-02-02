import React from "react";
var alertData = null;
export const alertContext = {
    alertData,
    /** @type {(v: Object) => void} */
    setAlert: v => (alertData = v)
};
export const AlertContext = React.createContext(alertContext);
