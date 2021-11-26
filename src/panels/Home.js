import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, CardScroll, Card, FormItem, Input } from '@vkontakte/vkui';
import AppContext from '../AppContext';

const Home = ({ id }) => {
	const {userInfo, launchParams} = useContext(AppContext)
	const [page, setPage] = useState(1)
	const [books, setBooks] = useState([])

	useEffect(() => {
		async function loadBookList() {
			const url = new URL(`${process.env.REACT_APP_API_URL}/catalog/latest`);
			const params = {page: 1}
				Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
			
			const resp = await fetch(url)
			const books = await resp.json()
			setBooks(books)
		}

		loadBookList()
	}, [])

	const onSearchChange = (event) => {
		console.log(event.target.value)
	}

	return (
	<Panel>
		<PanelHeader>{ userInfo && launchParams && <span>Привет, {userInfo.first_name}</span>}</PanelHeader>
		<Group description="Последние книги">
			<CardScroll size="s">
				{books && books.map(b => { return(
					<Card style={{width: '150px'}} key={b.id}>
						<div style={{ paddingBottom: '200px', background: `url(${b.smallCover})`, objectFit: 'cover', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }} />
					</Card>
				)})}
			</CardScroll>
			<FormItem>
				<Input onChange={onSearchChange} type="text" placeholder='Поиск' defaultValue="" align="center" />
			</FormItem>
		</Group>
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
