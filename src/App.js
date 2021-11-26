import React, {useContext, useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {AdaptivityProvider, AppRoot, ScreenSpinner, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/home/Home';
import AppContext from "./AppContext";
import {useLocation, useRouter} from "@happysanta/router";
import {PANEL_BOOK, PANEL_HOME, PANEL_SEARCH_RESULTS, VIEW_MAIN} from "./routers";
import SearchResults from "./panels/searchresults/SearchResults";
import Book from "./panels/book/Book";

const App = () => {
    const location = useLocation();
    const router = useRouter();

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
                <View id={VIEW_MAIN}
                      onSwipeBack={() => router.popPage()}
                      history={location.getViewHistory(VIEW_MAIN)}
                      activePanel={location.getViewActivePanel(VIEW_MAIN)}
                      popout={popout}>
                    <Home id={PANEL_HOME}/>
                    <SearchResults id={PANEL_SEARCH_RESULTS}/>
                    <Book id={PANEL_BOOK}/>
                </View>
            </AppRoot>
        </AdaptivityProvider>
    );
}

export default App;
