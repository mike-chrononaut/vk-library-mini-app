import {Banner, Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, Spinner} from "@vkontakte/vkui";
import React, {useContext, useEffect, useState} from "react";
import AppContext from "../../AppContext";
import {Virtuoso} from 'react-virtuoso';
import './SearchResults.css';
import emptyCover from './img.png';

const SearchResults = ({id, go}) => {
    const [context, setContext] = useContext(AppContext);

    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [endReached, setEndReached] = useState(false);

    useEffect(() => {
        async function loadBooks() {
            let newBooks = await fetch(process.env.REACT_APP_API_URL + '/catalog/search?query=' + context.searchQuery)
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

            setBooks(newBooks);
        }

        loadBooks();
    }, [])

    async function loadMoreBooks() {
        if (!endReached) {
            await fetch(process.env.REACT_APP_API_URL + '/catalog/search?query=' + context.searchQuery + '&page=' + (currentPage + 1))
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

    const getBookTitle = (book) => {
        if (book.titleInfo && !book.titleInfo.startsWith("[")) {
            return book.title + ". " + book.titleInfo.charAt(0).toUpperCase() + book.titleInfo.slice(1);
        } else {
            return book.title;
        }
    }

    const getAuthorFullName = (person) => {
        if (!person.surname) {
            return author(person);
        }

        let name = '';

        if (person.surname) {
            name += person.surname;
        }

        if (person.fullInitials) {
            name += " " + person.fullInitials;
        } else if (person.shortInitials) {
            name += " " + person.shortInitials;
        }

        if (person.alias) {
            name += " (" + person.alias + ")";
        }

        return name;
    }

    const author = (person) => {
        if (person.shortName) {
            let name = person.shortName;
            if (person.romanNumerals) {
                name += " " + person.romanNumerals;
            }
            return name;
        }

        if (person.shortInitials) {
            return `${person.surname} ${person.shortInitials}`
        }

        return person.surname;
    }

    const getAllAuthors = (authors) => {
        return authors.map((author) => {
            let person = author.person;
            return getAuthorFullName(person);
        }).join();
    }

    const getSubjects = (subjects) => {
        return subjects.map((subject) => {
            return subject.title;
        }).join();
    }

    const getPublishers = (publishers) => {
        return publishers.map((publisher) => {
            return publisher.title;
        }).join();
    }

    const getSeries = (series) => {
        return series.join();
    }

    return (<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={go} data-to='home' style={{paddingBottom: "16px", paddingRight: "16px"}}/>}><PanelHeaderContent>Результаты поиска</PanelHeaderContent></PanelHeader>
        <Virtuoso
            useWindowScroll
            data={books}
            overscan={20}
            endReached={loadMoreBooks}
            itemContent={(index, book) => {
                let allAuthors = getAllAuthors(book.authors ? book.authors : []);
                let subjects = getSubjects(book.subjects ? book.subjects : []);
                let publishers = getPublishers(book.publishers ? book.publishers : []);
                let series = getSeries(book.seriesTitles ? book.seriesTitles : []);

                return <div>
                    <Banner
                        before={<img style={{width: 120, height: 165}}
                                     src={book.originalCover ? book.originalCover.replace("http:", "https:") : emptyCover}/>}
                        header={getBookTitle(book)}
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