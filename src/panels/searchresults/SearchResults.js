import {
    Banner,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    PanelHeaderContent,
    Spinner,
    Placeholder
} from "@vkontakte/vkui";
import { Icon56ErrorOutline } from '@vkontakte/icons';
import React, {useContext, useEffect, useState} from "react";
import AppContext from "../../AppContext";
import {Virtuoso} from 'react-virtuoso';
import './SearchResults.css';
import emptyCover from './img.png';
import {useRouter} from "@happysanta/router";
import {PAGE_BOOK} from "../../routers";
import {BookUtils} from "../../utils/BookUtils";

const SearchResults = ({id}) => {
    const router = useRouter();
    const {searchQuery, setSearchQuery} = useContext(AppContext);
    const {setBook} = useContext(AppContext);

    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [endReached, setEndReached] = useState(false);

    useEffect(() => {
        async function loadBooks() {
            let newBooks = await fetch(process.env.REACT_APP_API_URL + '/catalog/search?query=' + searchQuery)
                .then(result => {
                    return result.json();
                })
                .then(result => {
                    if (!result.length) {
                        setEndReached(true);
                    }

                    return result;
                })
                .catch(e => {
                    console.log(e);
                    return [];
                });

            setBooks(newBooks);
        }

        loadBooks();
    }, []);

    async function loadMoreBooks() {
        if (!endReached) {
            await fetch(process.env.REACT_APP_API_URL + '/catalog/search?query=' + searchQuery + '&page=' + (currentPage + 1))
                .then(result => {
                    return result.json();
                })
                .then(result => {
                    setBooks([...books, ...result]);
                    setCurrentPage(currentPage + 1);

                    if (!result.length) {
                        setEndReached(true);
                    }

                    return result;
                })
                .catch(e => {
                    console.log(e);
                    return [];
                });
        }
    }

    const onBookClick = (book) => {
        setBook(book);
        router.pushPage(PAGE_BOOK, {
            book_id: book.id
        });
    }

    const onBackClick = () => {
        setSearchQuery('');
        router.popPage();
    }

    return (<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={onBackClick} style={{paddingBottom: "16px", paddingRight: "16px"}}/>}><PanelHeaderContent>Результаты поиска</PanelHeaderContent></PanelHeader>
        {!books.length && endReached && <Placeholder icon={<Icon56ErrorOutline/>}>К сожалению, не удалось найти издания по данному запросу</Placeholder>}
        <Virtuoso
            useWindowScroll
            data={books}
            overscan={20}
            endReached={loadMoreBooks}
            itemContent={(index, book) => {
                let allAuthors = BookUtils.getAllAuthors(book.authors ? book.authors : []);
                let subjects = BookUtils.getSubjects(book.subjects ? book.subjects : []);
                let publishers = BookUtils.getPublishers(book.publishers ? book.publishers : []);
                let series = BookUtils.getSeries(book.seriesTitles ? book.seriesTitles : []);

                return <div onClick={() => onBookClick(book)}>
                    <Banner
                        before={<img style={{width: 120, height: 180}}
                                     src={book.originalCover ? book.originalCover.replace("http:", "https:") : emptyCover}/>}
                        header={<><span>{BookUtils.getBookTitle(book)}</span><br/>{BookUtils.getBookLabel(book)}</>}
                        subheader={
                            <React.Fragment>
                                {allAuthors && <span><b>Автор</b>: {allAuthors}<br/></span>}
                                {subjects && <span><b>Тематика</b>: {subjects}<br/></span>}
                                {publishers && <span><b>Издательство</b>: {publishers}<br/></span>}
                                {series && <span><b>Серия</b>: {series}<br/></span>}
                                {book.year && <span><b>Год издания</b>: {book.year}<br/></span>}
                            </React.Fragment>
                        }
                    />
                </div>
            }}
            components={{
                Footer: () => {
                    return !endReached &&
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Spinner size="medium" style={{ margin: '20px 0' }} />
                        </div>
                }
            }}
        />
    </Panel>);
}

export default SearchResults;