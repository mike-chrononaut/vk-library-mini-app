import React, {useContext, useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {AdaptivityProvider, AppRoot, ScreenSpinner, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import AppContext from "./AppContext";

const App = () => {
    const [activePanel, setActivePanel] = useState('home');
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);

    const {
        setUserInfo,
        setLaunchParams
    } = useContext(AppContext);

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

        async function parseLaunchParams() {
            const urlSearchParams = new URLSearchParams(window.location.search);
            return Object.fromEntries(urlSearchParams.entries());
        }

        async function populateContext() {
            let userInfo = await fetchUserInfo();
            let launchParams = await parseLaunchParams();

            setUserInfo(userInfo);
            setLaunchParams(launchParams);
        }

        populateContext();
    }, []);

    return (
        <AdaptivityProvider>
            <AppRoot>
                <View activePanel={activePanel} popout={popout}>
                    <Home id='home'/>
                </View>
            </AppRoot>
        </AdaptivityProvider>
    );
}

export default App;
