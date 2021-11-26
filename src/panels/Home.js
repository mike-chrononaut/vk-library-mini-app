import React from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelHeader} from '@vkontakte/vkui';
import Books from "./Books";
import SearchPanel from "./Search";

const Home = ({id, fetchedUser, idApp}) => (
    <Panel id={id}>
        <PanelHeader>This is Platonika {fetchedUser?.first_name} {fetchedUser?.last_name}</PanelHeader>
        <Books/>
        <SearchPanel/>
    </Panel>
);

Home.propTypes = {
    id: PropTypes.string.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;
