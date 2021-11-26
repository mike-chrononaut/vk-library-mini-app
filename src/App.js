import React, { useState, useEffect, useContext } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import AppContext from './AppContext';
import { useLocation, useRouter } from '@happysanta/router';
import { PANEL_BOOK, PANEL_HOME, PANEL_SEARCH, VIEW_MAIN } from './routes';
import SearchResults from './panels/SearchResults';
import Book from './panels/Book';
// import Persik from './panels/Persik';

const App = () => {
	const location = useLocation()
	const router = useRouter()

	const [activePanel, setActivePanel] = useState('home');
	// const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	const {setLaunchParams, setUserInfo} = useContext(AppContext)

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		// async function fetchData() {
		// 	const user = await bridge.send('VKWebAppGetUserInfo');
		// 	setUser(user);
		// }

		async function parseLaunchParams() {
			const urlSearchParams = new URLSearchParams(window.location.search);
			return Object.fromEntries(urlSearchParams.entries());
		}

		async function fetchUserInfo() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			return user
		}
	
		async function populateContext() {
			// setName('init')

			// const lp = await parseLaunchParams()
			// console.log(lp)			
			setLaunchParams(await parseLaunchParams())
			setUserInfo(await fetchUserInfo())

			setPopout(null);
		}

		populateContext();
		// fetchData();
	}, []);

	// const go = e => {
	// 	setActivePanel(e.currentTarget.dataset.to);
	// };

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View id={VIEW_MAIN}
					onSwipeBack={() => router.popPage()}
					history={location.getViewHistory(VIEW_MAIN)}
					activePanel={location.getViewActivePanel(VIEW_MAIN)}
					popout={popout}
				>
					<Home id={PANEL_HOME}></Home>
					<Book id={PANEL_BOOK}></Book>
					<SearchResults id={PANEL_SEARCH}></SearchResults>
				</View>
				{/* <View activePanel={activePanel} popout={popout}> */}
				{/* {name} */}
					{/* <Home /> */}
					{/* <Home id='home' /> */}
					{/* <Home id='home' fetchedUser={fetchedUser} go={go} /> */}
					{/* <Persik id='persik' go={go} /> */}
				{/* </View> */}
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
