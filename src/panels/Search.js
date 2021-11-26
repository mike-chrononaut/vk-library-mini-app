import React, {useState} from 'react';

import {Button, Group, Header, Search} from '@vkontakte/vkui';

const SearchPanel = () => {

    const [query, setQuery] = useState();

    const onChange = (e) => {
        setQuery(e.target.value)
    };

    const onClick = () => {
        console.log(query)
    };

    return (
        <Group header={<Header> Поиск </Header>}>
            <div style={{ display: 'flex' }}>
                <Search value={query} onChange={onChange} after={null}/>
                <Button style={{marginRight: '16px', height: '40px'}} onClick={onClick}>Поиск</Button>
            </div>
        </Group>
    )
};

export default SearchPanel;
