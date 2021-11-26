import { createContext, useState } from "react";

const AppContext = createContext([{}, () => {}])

export const AppInfoProvider = ({children}) => {
    const [name, setName] = useState('')
    const [launchParams, setLaunchParams] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [book, setBook] = useState(null)

    return(
        <AppContext.Provider value={{
            name,       launchParams,       userInfo,       searchQuery,    book,
            setName,    setLaunchParams,    setUserInfo,    setSearchQuery, setBook}}>
            {children}
        </AppContext.Provider>
    )
    
}

export default AppContext;