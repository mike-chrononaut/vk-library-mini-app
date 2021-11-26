import React, {useState} from 'react';

import {Button, Group, Header, Search} from '@vkontakte/vkui';

const styleSearch = {paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0};
const styleButton = {marginRight: '16px', height: '40px', paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0};

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
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Search style={styleSearch} value={query} onChange={onChange} after={null}/>
                <Button style={styleButton} onClick={onClick}>Поиск</Button>
            </div>
        </Group>
    )
};

export default SearchPanel;
