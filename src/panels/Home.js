import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import { Group, Header, HorizontalCell, HorizontalScroll, Panel, PanelHeader, Search} from '@vkontakte/vkui';
import {useCustomState} from "../context/context";
import {StartupVariable} from "../startup-variable";
import bridge from "@vkontakte/vk-bridge";


const Home = ({id}) => {
    const {state: globalState, dispatch} = useCustomState()
    const [bookList, setbookList] = useState(null);
    const [search, setSearch] = useState('');

    async function bookListfn() {
        const list = await fetch(process.env.REACT_APP_API_URL + '/catalog/latest?page=1&size=10').then(resp => resp.json())
        await setbookList(list);
    }

    useEffect(() => {
        bridge.send("VKWebAppGetUserInfo").then((e) => dispatch({type: 'init', payload: {...e, ...StartupVariable}}));
        bookListfn()
    }, [])


    function onClick (e) {
        setSearch(e.target.value)
        console.log('search', search);
    }
    return (
        <>
            <Panel id={id}>
                {globalState.state &&
                <PanelHeader> Hello {globalState.state.last_name} your app_id {globalState.state.app_id}</PanelHeader>}
                {
                    bookList &&
                    <Group header={<Header>Список книг</Header>}>
                        <HorizontalScroll showArrows getScrollToLeft={i => i - 60} getScrollToRight={i => i + 60}>
                            <div style={{display: 'flex'}}>
                                {bookList.map((book) => {
                                        return (
                                            <HorizontalCell key={book.smallCover} size='l' header={book.title} >
                                                <img src={book.smallCover} alt={'smallCover'}/>
                                            </HorizontalCell>
                                        )
                                    }
                                )}
                            </div>
                        </HorizontalScroll>
                    </Group>
                }
                {
                    <Group>
                        <Search value={search} onChange={(e) =>onClick(e)} after={null}/>
                    </Group>
                }
            </Panel>


        </>


    );
}


Home.propTypes = {
    id: PropTypes.string.isRequired
};

export default Home;
