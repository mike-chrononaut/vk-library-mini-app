import React, {useContext, useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {AdaptivityProvider, AppRoot, ModalRoot, ScreenSpinner, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/home/Home';
import AppContext from "./AppContext";
import SearchResults from "./panels/searchresults/SearchResults";
import {useLocation, useRouter} from "@happysanta/router";
import {
    AUTH_MODAL_CARD,
    CONFIRM_EXIT_MODAL_CARD,
    PANEL_BOOK,
    PANEL_FAVORITES,
    PANEL_HOME,
    PANEL_SEARCH_RESULTS,
    PANEL_SUBSCRIPTIONS,
    VIEW_MAIN
} from "./routers";
import Book from "./panels/book/Book";
import Auth from "./modals/Auth";
import ConfirmExit from "./modals/ConfirmExit";
import Favorites from "./panels/favorites/Favorites";
import Subscriptions from "./panels/subscriptions/Subscriptions";

const App = () => {
    const location = useLocation();
    const router = useRouter();

    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);

    const {
        setUserInfo,
        setLaunchParams,
        setToken,
        setUserIsLogged
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

        async function checkLoginToken() {
            await bridge.send("VKWebAppStorageGet", {"keys": ["token"]})
                .then(result => {
                    if (result && result.keys && (result.keys.length > 0)) {
                        let userToken = result.keys.find(pair => (pair.key === 'token'));

                        if (userToken && userToken.value) {
                            setToken(userToken.value);
                            setUserIsLogged(true);
                        }
                    }
                });
        }

        populateContext();
        checkLoginToken();
    }, []);

    const modal = <ModalRoot activeModal={location.getModalId()}
                             onClose={() => router.popPage()}>
        <Auth id={AUTH_MODAL_CARD} onClose={() => router.popPage()}/>
        <ConfirmExit id={CONFIRM_EXIT_MODAL_CARD} onClose={() => router.popPage()}/>
    </ModalRoot>;

    return (
        <AdaptivityProvider>
            <AppRoot>
                <View id={VIEW_MAIN}
                      onSwipeBack={() => router.popPage()}
                      history={location.getViewHistory(VIEW_MAIN)}
                      activePanel={location.getViewActivePanel(VIEW_MAIN)}
                      modal={modal}
                      popout={popout}>
                    <Home id={PANEL_HOME}/>
                    <SearchResults id={PANEL_SEARCH_RESULTS}/>
                    <Book id={PANEL_BOOK}/>
                    <Favorites id={PANEL_FAVORITES}/>
                    <Subscriptions id={PANEL_SUBSCRIPTIONS}/>
                </View>
            </AppRoot>
        </AdaptivityProvider>
    );
}

export default App;
