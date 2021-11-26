import React, {useContext} from 'react';

import {Panel, PanelHeader} from '@vkontakte/vkui';
import AppContext from "../AppContext";

const Home = ({id}) => {
    const {userInfo, launchParams} = useContext(AppContext);

    return (<Panel id={id}>
        {userInfo && launchParams &&
        <PanelHeader>Здравствуйте, {userInfo.first_name}! (id приложения - {launchParams.vk_app_id})</PanelHeader>}
    </Panel>);
}

export default Home;
