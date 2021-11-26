import React, {useContext} from 'react';

import {Panel, PanelHeader} from '@vkontakte/vkui';
import NewBooks from "./NewBooks";
import SearchPanel from "./Search";
import AppContext from "../AppContext";

const Home = ({id, idApp}) => {
    const {userInfo} = useContext(AppContext)

    return (
        <Panel id={id}>
            <PanelHeader>This is Platonika {userInfo?.first_name} {userInfo?.last_name}</PanelHeader>
            <NewBooks/>
            <SearchPanel/>
        </Panel>
    )
};

export default Home;
