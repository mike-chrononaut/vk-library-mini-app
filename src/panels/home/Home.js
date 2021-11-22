import React, {useContext, useEffect, useState} from 'react';

import {
    Button,
    Group,
    Header,
    HorizontalCell,
    HorizontalScroll,
    Panel,
    PanelHeader,
    PanelHeaderContent,
    Search
} from '@vkontakte/vkui';
import AppContext from "../../AppContext";
import './Home.css';
import {useRouter} from "@happysanta/router";
import {PAGE_BOOK, PAGE_SEARCH_RESULTS} from "../../routers";

const Home = ({id}) => {
    const router = useRouter();
    const {userInfo} = useContext(AppContext);
    const {setSearchQuery} = useContext(AppContext);
    const {setBook} = useContext(AppContext);

    const [newBooks, setNewBooks] = useState([]);

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
    }, []);

    const onBookClick = (book) => {
        setBook(book);
        router.pushPage(PAGE_BOOK, {
            book_id: book.id
        });
    }

    const newBooksList = () => {
        return newBooks.map((book) => {
            let imageLink = book.originalCover.replace("http:", "https:");
            return <HorizontalCell key={book.id} id={book.id} size='l'
                                   header={book.title} onClick={() => onBookClick(book)} >
                <img style={{width: 120, height: 180}} src={imageLink}/>
            </HorizontalCell>
        });
    }

    const onSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const onSearchClick = () => {
        router.pushPage(PAGE_SEARCH_RESULTS);
    };

    return (<Panel id={id}>
        {userInfo &&
        <PanelHeader><PanelHeaderContent>Здравствуйте, {userInfo.first_name}!</PanelHeaderContent></PanelHeader>}
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
