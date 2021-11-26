import {useFirstPageCheck, useParams, useRouter} from "@happysanta/router";
import AppContext from "../AppContext";
import {
    Banner,
    Div,
    HorizontalScroll,
    Link,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    PanelHeaderContent,
    Tabs,
    TabsItem,
    Text
} from "@vkontakte/vkui";
import React, {useContext, useEffect, useState} from "react";
import {PAGE_HOME} from "../routers";
import emptyCover from "../common/img.png";
import {BookUtils} from "../utils/BookUtils";
import './Book.css';
import ConnectionError from "../common/ConnectionError";

const Book = ({id}) => {
    const router = useRouter();
    const {
        book, setBook,
        connectionError, setConnectionError
    } = useContext(AppContext);

    const isFirstPage = useFirstPageCheck();
    const {book_id} = useParams();

    const [showBiblioDescription, setShowBiblioDescription] = useState(false);
    const [activeTab, setActiveTab] = useState('libraries');
    const [libraries, setLibraries] = useState(null);
    const [copies, setCopies] = useState(null);

    useEffect(() => {
        const getCopiesSiglas = (book) => {
            return book.copies.map(copy => copy.librarySigla).join();
        }

        async function loadBookInfo() {
            if (!book) {
                let bookInfo = await fetch(process.env.REACT_APP_API_URL + '/catalog/publication?id=' + book_id)
                    .then(result => {
                        return result.json();
                    })
                    .then(result => {
                        return result;
                    })
                    .catch(e => {
                        console.log(e);
                        setConnectionError(true);
                        return null;
                    });

                setBook(bookInfo);
            }
        }

        async function saveBookCopies() {
            if (book && book.copies) {
                let newCopies = new Map();

                book.copies.forEach(copy => newCopies.set(copy.librarySigla, copy));

                setCopies(newCopies);
            }
        }

        async function loadBookLibraries() {
            if (book) {
                let receivedLibraries = await fetch(process.env.REACT_APP_API_URL + '/library/search?siglas=' + getCopiesSiglas(book))
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

                let librariesMap = new Map();
                receivedLibraries.forEach(library => librariesMap.set(library.sigla, library));

                setLibraries(librariesMap);
            }
        }

        loadBookInfo();
        saveBookCopies();
        loadBookLibraries();
    }, [book])

    const onBackClick = () => {
        setBook(null);

        if (isFirstPage) {
            router.replacePage(PAGE_HOME);
        } else {
            router.popPage();
        }
    }

    const getBookDescription = (book) => {
        let allAuthors = BookUtils.getAllAuthors(book.authors ? book.authors : []);
        let subjects = BookUtils.getSubjects(book.subjects ? book.subjects : []);
        let publishers = BookUtils.getPublishers(book.publishers ? book.publishers : []);
        let series = BookUtils.getSeries(book.seriesTitles ? book.seriesTitles : []);

        return <>
            {allAuthors && <span><b>Автор</b>: {allAuthors}<br/></span>}
            {subjects && <span><b>Тематика</b>: {subjects}<br/></span>}
            {publishers && <span><b>Издательство</b>: {publishers}<br/></span>}
            {series && <span><b>Серия</b>: {series}<br/></span>}
            {book.year && <span><b>Год издания</b>: {book.year}<br/></span>}
            {book.pagesInfo.pages && <span><b>Объём</b>: {BookUtils.getPagesInfo(book)}<br/></span>}
            {book.languages.length && <span><b>Язык</b>: {BookUtils.getLanguages(book)}<br/></span>}
            {book.isbn && <span><b>ISBN</b>: {BookUtils.getIsbnList(book)}<br/><br/></span>}
            {book.fullBiblioDescription &&
                <>
                    <Link onClick={() => setShowBiblioDescription(!showBiblioDescription)}>
                        Полное библиографическое описание
                    </Link>
                    {showBiblioDescription && <Div dangerouslySetInnerHTML={{__html: book.fullBiblioDescription}}/>}
                </>
            }
        </>;
    }

    return (<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={onBackClick} style={{
            paddingBottom: "16px",
            paddingRight: "16px"
        }}/>}><PanelHeaderContent>Информация об издании</PanelHeaderContent></PanelHeader>
        {book && <><Banner
            before={<img className='book-cover'
                         src={book.originalCover ? book.originalCover.replace("http:", "https:") : emptyCover}/>}
            header={<><span>{BookUtils.getBookTitle(book)}</span><br/></>}
            subheader={
                getBookDescription(book)
            }
        />
            <Tabs>
                <HorizontalScroll>
                    {libraries && (libraries.size > 0) && <TabsItem onClick={() => setActiveTab('libraries')}
                                                                    selected={activeTab === 'libraries'}>
                        Наличие в библиотеках
                    </TabsItem>}
                    {(book.contents.length > 0) && <TabsItem onClick={() => setActiveTab('content')}
                                                             selected={activeTab === 'content'}>
                        Содержание
                    </TabsItem>}
                    {book.annotation && <TabsItem onClick={() => setActiveTab('annotation')}
                                                  selected={activeTab === 'annotation'}>
                        Аннотация
                    </TabsItem>}
                </HorizontalScroll>
            </Tabs>
            {(activeTab === 'libraries') && libraries && (libraries.size > 0) &&
                <Div>
                    <ul className='district-list'>
                        {
                            Array.from(BookUtils.getCopiesDistricts(book, libraries)).map(([key, value]) => {
                                return <li key={'district-' + key}>
                                    <b>{key}</b>
                                    <ul>
                                        {value.map(library =>
                                            <li key={library.sigla}>
                                                <span>{library.name}</span> ({BookUtils.getCopyLibraryInfo(library)})&nbsp;&nbsp;&nbsp;
                                                {BookUtils.getCopyLabel(copies.get(library.sigla))}
                                            </li>)}
                                    </ul>
                                </li>
                            })
                        }

                    </ul>
                </Div>
            }
            {(activeTab === 'content') &&
                <Div>
                    <ol>
                        {book.contents.map((content, index) => <li
                            key={'content-' + index}>{BookUtils.getBookContentInfo(content)}</li>)}
                    </ol>
                </Div>}
            {(activeTab === 'annotation') && <Div><Text>{book.annotation}</Text></Div>}
        </>}
        {connectionError &&
            <ConnectionError/>
        }
    </Panel>);
}

export default Book;