import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelHeader} from '@vkontakte/vkui';
import {useCustomState} from "../context/context";
import {StartupVariable} from "../startup-variable";
import bridge from "@vkontakte/vk-bridge";


const Home = ({id}) => {
    const {state: globalState, dispatch} = useCustomState()
    useEffect(() => {
        bridge.send("VKWebAppGetUserInfo").then((e) => dispatch({type: 'init', payload: {...e, ...StartupVariable}}));
    }, [])

    return (
        <Panel id={id}>
            {globalState.state &&  <PanelHeader> Hello {globalState.state.last_name}  your app_id {globalState.state.app_id}</PanelHeader>}
        </Panel>
    );
}


Home.propTypes = {
    id: PropTypes.string.isRequired
};

export default Home;
