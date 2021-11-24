import React, {useContext, useEffect, useState} from 'react';

import {
    Avatar,
    Button,
    CellButton,
    Div,
    Group,
    Header,
    HorizontalCell,
    HorizontalScroll,
    Panel,
    PanelHeader,
    PanelHeaderContent,
    Search,
    Text
} from '@vkontakte/vkui';
import AppContext from "../../AppContext";
import './Home.css';
import {useRouter} from "@happysanta/router";
import {
    AUTH_MODAL_CARD,
    CONFIRM_EXIT_MODAL_CARD,
    PAGE_BOOK,
    PAGE_FAVORITES,
    PAGE_SEARCH_RESULTS,
    PAGE_SUBSCRIPTIONS
} from "../../routers";
import {Icon28DoorArrowRightOutline, Icon28HomeOutline, Icon28LikeOutline, Icon28Notifications} from '@vkontakte/icons';
import ConnectionError from "../../common/ConnectionError";


const Home = ({id}) => {
    const router = useRouter();
    const {userInfo} = useContext(AppContext);
    const {setSearchQuery} = useContext(AppContext);
    const {setBook} = useContext(AppContext);

    const [newBooks, setNewBooks] = useState([]);

    const {connectionError, setConnectionError} = useContext(AppContext);
    const {userIsLogged} = useContext(AppContext);

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
                    setConnectionError(true);
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
                                   header={book.title} onClick={() => onBookClick(book)}>
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
            <Div style={{display: 'flex'}}>
                <Search placeholder="Введите часть названия, автора, тему или издательство"
                        id="searchBooks"
                        type="text"
                        className="pt-0"
                        onChange={onSearchChange}/>
                <Button size="l" style={{marginRight: "16px"}}
                        onClick={onSearchClick}>Искать</Button>
            </Div>
        </Group>

        <Group>
            {!userIsLogged &&
            <CellButton centered after={<Icon28HomeOutline/>}
                        onClick={() => router.pushModal(AUTH_MODAL_CARD)}>
                Вход в систему
            </CellButton>
            }
            {userIsLogged &&
            <Group header={<Header style={{justifyContent: "center"}}>Личный кабинет</Header>}>
                <CellButton onClick={() => router.pushPage(PAGE_FAVORITES)} before={<Avatar><Icon28LikeOutline fill="#2d81e0"/></Avatar>}>
                    Избранное
                </CellButton>
                <CellButton onClick={() => router.pushPage(PAGE_SUBSCRIPTIONS)} before={<Avatar><Icon28Notifications fill="#2d81e0"/></Avatar>}>
                    Подписки
                </CellButton>
                <CellButton before={<Avatar><Icon28DoorArrowRightOutline fill="red"/></Avatar>}
                            onClick={() => router.pushModal(CONFIRM_EXIT_MODAL_CARD)}>
                    <Text style={{color: "red"}}>Выйти</Text>
                </CellButton>
            </Group>
            }
        </Group>

        {connectionError &&
        <ConnectionError/>
        }
    </Panel>);
}

export default Home;
