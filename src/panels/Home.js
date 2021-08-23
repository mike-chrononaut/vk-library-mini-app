import React, {useContext} from 'react';

import {Panel, PanelHeader} from '@vkontakte/vkui';
import AppContext from "../AppContext";

const Home = ({id, go}) => {
    const [context, setContext] = useContext(AppContext);

    return (<Panel id={id}>
        {context.userInfo &&
        <PanelHeader style={{fontWeight: "bold"}}>Здравствуйте, {context.userInfo.first_name}!</PanelHeader>}
    </Panel>);
}

export default Home;
