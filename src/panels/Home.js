import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => (
    <Panel id={id}>
        <PanelHeader>Example</PanelHeader>
        <Header mode="secondary">User Data Fetched with VK Bridge</Header>
    </Panel>
);

Home.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Home;
