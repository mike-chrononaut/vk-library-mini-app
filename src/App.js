import React, {useContext, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {AdaptivityProvider, AppRoot, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import AppContext from "./AppContext";
import {PANEL_BOOK, PANEL_HOME, PANEL_SEARCH_RESULT, VIEW_MAIN} from "./routers";
import {useLocation, useRouter} from "@happysanta/router";
import Book from "./panels/Book";
import SearchResult from "./panels/SearchResult";

const App = () => {
    // const [activePanel, setActivePanel] = useState('home');
    // const [fetchedUser, setUser] = useState(null);
    const location = useLocation();
    const router = useRouter();

    const {setUserInfo} = useContext(AppContext)

    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUserInfo(user);
            /*setUser(user);
            setPopout(null);*/
        }

        fetchData();
    }, []);

    const vkAppId = new URLSearchParams(window.location.search).get('vk_app_id');

    return (
        <AdaptivityProvider>
            <AppRoot>
                <View id={VIEW_MAIN}
                      history={location.getViewHistory(VIEW_MAIN)}
                      activePanel={location.getViewActivePanel(VIEW_MAIN)}>
                    <Home id={PANEL_HOME}/>
                    <Book id={PANEL_BOOK}/>
                    <SearchResult id={PANEL_SEARCH_RESULT}/>
                </View>
            </AppRoot>
        </AdaptivityProvider>
    );
}

export default App;
