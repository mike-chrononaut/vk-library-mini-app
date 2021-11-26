import { useRouter } from "@happysanta/router";
import { Banner, Banner as div, Div } from "@vkontakte/vkui"
import { useContext, useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import AppContext from "../AppContext";
import { BookUtils } from "../utils/BookUtils";

import imagePlaceholder from "../img/empty.png"


const BookListComponent = () => {
    const router = useRouter()

    const {searchQuery} = useContext(AppContext)

    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);

    async function fetchBooks() {
        const url = new URL(`${process.env.REACT_APP_API_URL}/catalog/search`);
        const params = {
            page: page,
            query: searchQuery,            
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        
        const resp = await fetch(url)
        const books = await resp.json()
        setBooks(books)
    }
    
    useEffect(() => {
        fetchBooks()
    }, [])

    function loadMoreBooks() {
        setPage(page + 1);
        // fetchBooks()
    }

    return (
        <Div>
            {books && books.length > 0 && 
            <Virtuoso
                useWindowScroll
                data={books}
                // endReached={loadMoreBooks()}
                itemContent={(index, book) => {
                    let allAuthors = BookUtils.getAllAuthors(book.authors ? book.authors : []);
                    let subjects = BookUtils.getSubjects(book.subjects ? book.subjects : []);
                    let publishers = BookUtils.getPublishers(book.publishers ? book.publishers : []);
                    let series = BookUtils.getSeries(book.seriesTitles ? book.seriesTitles : []);

                    return (
                        <div>
                            <Banner before={<img style={{width: '80px', height: '120px'}} src={book.originalCover ? book.originalCover : imagePlaceholder}></img>}
                                    header={book.title}
                                    subheader={allAuthors}
                            >
                                {/* {book.title} */}
                            </Banner>
                        </div>
                    )
                }}
                
                >
            </Virtuoso>
            }
            {/* {books && books.map(b =>
                <div>{b.id}</div>
            )} */}
        </Div>
    )
}


export default BookListComponent;