import React from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelHeader} from '@vkontakte/vkui';

const Home = ({ id, fetchedUser, idApp }) => (
	<Panel id={id}>
		<PanelHeader>This is Platonika {fetchedUser?.first_name} {fetchedUser?.last_name}, (id приложения {idApp}) </PanelHeader>

		{/*<Group header={<Header mode="secondary"> id </Header>}>*/}
		{/*	<Div>*/}

		{/*	</Div>*/}
		{/*</Group>*/}
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
