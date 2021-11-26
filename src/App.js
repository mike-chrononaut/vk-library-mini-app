import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, AdaptivityProvider, AppRoot} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import {StateProvider} from "./context/context";



const App = () => {
    const [activePanel, setActivePanel] = useState('home');
    const [popout, setPopout] = useState(null);

    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });
    }, []);


    return (
        <AdaptivityProvider>

                <AppRoot>
                    <StateProvider>
                    <View activePanel={activePanel} popout={popout}>
                        <Home id='home'/>
                    </View>
                    </StateProvider>
                </AppRoot>

        </AdaptivityProvider>
    );
}

export default App;
