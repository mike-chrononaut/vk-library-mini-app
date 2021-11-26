import { createContext, useState } from "react";

const AppContext = createContext([{}, () => {}])

export const AppInfoProvider = ({children}) => {
    const [name, setName] = useState('')
    const [launchParams, setLaunchParams] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    return(
        <AppContext.Provider value={{
            name,       launchParams,       userInfo,
            setName,    setLaunchParams,    setUserInfo}}>
            {children}
        </AppContext.Provider>
    )
    
}

export default AppContext;