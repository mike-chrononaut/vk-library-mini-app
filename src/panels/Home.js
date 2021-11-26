import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import AppContext from '../AppContext';

const Home = ({ id }) => {

	const {userInfo, launchParams} = useContext(AppContext)



	return (
	<Panel>
		<PanelHeader>{ userInfo && launchParams && <span>Привет, {userInfo.first_name} ( {launchParams.vk_app_id} ) </span>}</PanelHeader>
		{/* 
		{fetchedUser &&
		<Group header={<Header mode="secondary">Пользователь</Header>}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

		<button onClick={() => console.log(fetchedUser)}>123</button> */}
{/* 
		<Group header={<Header mode="secondary">Navigation Example</Header>}>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
		</Group> */}
	</Panel>
)};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	// go: PropTypes.func.isRequired,
	// fetchedUser: PropTypes.shape({
	// 	photo_200: PropTypes.string,
	// 	first_name: PropTypes.string,
	// 	last_name: PropTypes.string,
	// 	city: PropTypes.shape({
	// 		title: PropTypes.string,
	// 	}),
	// }),
};

export default Home;
