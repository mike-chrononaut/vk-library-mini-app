import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {Group, Header, HorizontalCell, HorizontalScroll} from '@vkontakte/vkui';

const Books = () => {

    const [books, setBooks] = useState([]);

    const getBooks = useCallback(async () => {
        let val = await fetch(process.env.REACT_APP_LIB_API + 'catalog/latest')
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                return result;
            }).
            catch((error) => {
                console.log(error);
            });

        setBooks(val);
    }, []);

    useEffect(() => {
        getBooks();
    }, []);

    const items = useMemo(() => {
        return books.map((book) => {
            return (
                <HorizontalCell key={book.id} size='l' header={book.title}>
                    <img style={{width: 120, height: 180}} src={book.originalCover}/>
                </HorizontalCell>
            );
        })
    }, [books]);

    console.log(books)

    return (
        <Group header={<Header> Книги </Header>}>
            <HorizontalScroll showArrows getScrollToLeft={i => i - 120} getScrollToRight={i => i + 120}>
                <div style={{ display: 'flex' }}>
                    {items}
                </div>
            </HorizontalScroll>
        </Group>
    )
};

export default Books;
