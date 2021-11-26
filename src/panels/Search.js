import React, {useContext} from 'react';

import {Button, Group, Header, Search} from '@vkontakte/vkui';
import AppContext from "../AppContext";
import {PAGE_SEARCH_RESULT, router} from "../routers";

const styleSearch = {paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0};
const styleButton = {marginRight: '16px', height: '40px', paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0};

const SearchPanel = () => {

    const onChange = (e) => {
        setSearchQuery(e.target.value)
    };

    const {searchQuery, setSearchQuery} = useContext(AppContext)

    const onClick = () => {
        router.pushPage(PAGE_SEARCH_RESULT)
    };

    return (
        <Group header={<Header> Поиск </Header>}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Search style={styleSearch} value={searchQuery} onChange={onChange} after={null}/>
                <Button style={styleButton} onClick={onClick}>Поиск</Button>
            </div>
        </Group>
    )
};

export default SearchPanel;
