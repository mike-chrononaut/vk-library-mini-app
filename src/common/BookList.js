import AppContext from "../AppContext";
import {Banner, Div, Placeholder, Spinner} from "@vkontakte/vkui";
import {Icon56ErrorOutline} from "@vkontakte/icons";
import {useRouter} from "@happysanta/router";
import {PAGE_BOOK} from "../routers";
import {Virtuoso} from "react-virtuoso";
import {BookUtils} from "../utils/BookUtils";
import emptyCover from "../panels/searchresults/img.png";
import ConnectionError from "./ConnectionError";
import React, {useContext, useEffect, useState} from "react";

const BookList = ({url, noBooksMessage, queryParams}) => {
    const router = useRouter();
    const {setBook} = useContext(AppContext);

    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [endReached, setEndReached] = useState(false);

    const {connectionError, setConnectionError} = useContext(AppContext);
    const {token} = useContext(AppContext);

    useEffect(() => {
        async function loadBooks() {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-csrf-token': token
                }
            };

            let newBooks = await fetch(process.env.REACT_APP_API_URL + url + "?" + queryParams, requestOptions)
                .then(result => {
                    return result.json();
                })
                .then(result => {
                    if (!result.length || (result.length < 10)) {
                        setEndReached(true);
                    }

                    return result;
                })
                .catch(e => {
                    console.log(e);

                    setEndReached(true);
                    setConnectionError(true);

                    return [];
                });

            setBooks(newBooks);
        }

        loadBooks();
    }, []);

    async function loadMoreBooks() {
        if (!endReached) {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-csrf-token': token
                }
            };

            await fetch(process.env.REACT_APP_API_URL + url + '?' + queryParams +
                (queryParams ? '&' : '') + 'page=' + (currentPage + 1), requestOptions)
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

    return (<>
            {!books.length && endReached && <Placeholder icon={<Icon56ErrorOutline/>}>{noBooksMessage}</Placeholder>}
            {books &&
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
                                <>
                                    {allAuthors && <span><b>Автор</b>: {allAuthors}<br/></span>}
                                    {subjects && <span><b>Тематика</b>: {subjects}<br/></span>}
                                    {publishers && <span><b>Издательство</b>: {publishers}<br/></span>}
                                    {series && <span><b>Серия</b>: {series}<br/></span>}
                                    {book.year && <span><b>Год издания</b>: {book.year}<br/></span>}
                                </>
                            }
                        />
                    </div>
                }}
                components={{
                    Footer: () => {
                        return !endReached &&
                            <Div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                <Spinner size="medium" style={{margin: '20px 0'}}/>
                            </Div>
                    }
                }}
            />
            }
        {connectionError &&
        <ConnectionError/>
        }
        </>
    );
}

export default BookList;