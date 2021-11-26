import React, {createContext, useState} from "react";

const AppContext = createContext([{}, () => {
}]);

export const AppInfoProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [launchParams, setLaunchParams] = useState(null);

    return (
        <AppContext.Provider value={{
            userInfo, launchParams,
            setUserInfo, setLaunchParams
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;