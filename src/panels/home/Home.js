import React, {useContext, useEffect, useState} from 'react';

import {Button, Group, Header, HorizontalCell, HorizontalScroll, Panel, PanelHeader, Search} from '@vkontakte/vkui';
import AppContext from "../../AppContext";
import './Home.css';

const Home = ({id, go}) => {
    const [context, setContext] = useContext(AppContext);

    const [newBooks, setNewBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function loadNewBooks() {
            let newBooks = await fetch(process.env.REACT_APP_API_URL + '/catalog/latest')
                .then(result => {
                    return result.json();
                })
                .then(result => {
                    return result;
                })
                .catch(e => {
                    console.log(e);
                    return [];
                });

            setNewBooks(newBooks);
        }

        loadNewBooks();
    }, [])

    const newBooksList = () => {
        return newBooks.map((book) => {
            let imageLink = book.originalCover.replace("http:", "https:");
            return <HorizontalCell key={book.id} size='l'
                                                      header={book.title}>
            <img style={{width: 120, height: 165}} src={imageLink}/>
        </HorizontalCell>});
    }

    const onSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const onSearchClick = () => {
        console.log(searchQuery);
    };

    return (<Panel id={id}>
        {context.userInfo &&
        <PanelHeader style={{fontWeight: "bold"}}>Здравствуйте, {context.userInfo.first_name}!</PanelHeader>}
        <Group header={<Header>Новинки</Header>}>
            <HorizontalScroll showArrows getScrollToLeft={i => i - 120} getScrollToRight={i => i + 120}>
                <div style={{display: 'flex'}}>
                    {newBooksList()}
                </div>
            </HorizontalScroll>
        </Group>

        <Group>
            <div style={{display: 'flex'}}>
                <Search placeholder="Введите часть названия, автора, тему или издательство"
                        id="searchBooks"
                        type="text"
                        className="pt-0"
                        onChange={onSearchChange}/>
                <Button size="l" style={{marginRight: "16px"}}
                        onClick={onSearchClick}>Искать</Button>
            </div>
        </Group>
    </Panel>);
}

export default Home;
