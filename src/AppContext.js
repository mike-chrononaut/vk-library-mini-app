import React, {createContext, useState} from "react";

const AppContext = createContext([{}, () => {
}]);

export const AppInfoProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [launchParams, setLaunchParams] = useState(null);
    const [book, setBook] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [token, setToken] = useState('');

    const [connectionError, setConnectionError] = useState(false);
    const [userIsLogged, setUserIsLogged] = useState(false);

    return (
        <AppContext.Provider value={{
            userInfo, launchParams, book, searchQuery, token, connectionError, userIsLogged,
            setUserInfo, setLaunchParams, setBook, setSearchQuery, setToken, setConnectionError, setUserIsLogged
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;