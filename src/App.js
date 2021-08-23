import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {AdaptivityProvider, AppRoot, ScreenSpinner, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import AppContext from "./AppContext";

const App = () => {
    const [activePanel, setActivePanel] = useState('home');
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);

    const [context, setContext] = useState({});

    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function fetchUserInfo() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
            return user;
        }

        async function parseSearchParams() {
            const urlSearchParams = new URLSearchParams(window.location.search);
            return Object.fromEntries(urlSearchParams.entries());
        }

        async function createContext() {
            let userInfo = await fetchUserInfo();
            let searchParams = await parseSearchParams();

            setContext({"userInfo": userInfo, "searchParams": searchParams});
        }

        createContext();
    }, []);

    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
    };

    return (
        <AdaptivityProvider>
            <AppRoot>
                <AppContext.Provider value={[context, setContext]}>
                    <View activePanel={activePanel} popout={popout}>
                        <Home id='home' fetchedUser={fetchedUser} go={go}/>
                        <Persik id='persik' go={go}/>
                    </View>
                </AppContext.Provider>
            </AppRoot>
        </AdaptivityProvider>
    );
}

export default App;
