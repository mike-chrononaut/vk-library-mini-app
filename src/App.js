import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {AdaptivityProvider, AppRoot, ScreenSpinner, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/home/Home';
import AppContext from "./AppContext";
import SearchResults from "./panels/searchresults/SearchResults";

const App = () => {
    const [activePanel, setActivePanel] = useState('home');
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
                        <Home id='home' go={go}/>
                        <SearchResults id='searchresults' go={go}/>
                    </View>
                </AppContext.Provider>
            </AppRoot>
        </AdaptivityProvider>
    );
}

export default App;
