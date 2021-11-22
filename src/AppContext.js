import React, {createContext, useState} from "react";

const AppContext = createContext([{}, () => {
}]);

export const AppInfoProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [launchParams, setLaunchParams] = useState(null);
    const [book, setBook] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <AppContext.Provider value={{
            userInfo, launchParams, book, searchQuery,
            setUserInfo, setLaunchParams, setBook, setSearchQuery
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;