import {createContext, useState} from "react";

const AppContext = createContext([{}, () => {
}]);

export const AppInfoProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [book, setBook] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [connectionError, setConnectionError] = useState('');

    return (
        <AppContext.Provider value={{
            userInfo, book, searchQuery, connectionError,
            setUserInfo, setBook, setSearchQuery, setConnectionError
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;