import React, {createContext, useState} from "react";

const AppContext = createContext([{}, () => {
}]);

export const AppInfoProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [launchParams, setLaunchParams] = useState(null);

    const [connectionError, setConnectionError] = useState(false);

    return (
        <AppContext.Provider value={{
            userInfo, launchParams, connectionError,
            setUserInfo, setLaunchParams, setConnectionError
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;