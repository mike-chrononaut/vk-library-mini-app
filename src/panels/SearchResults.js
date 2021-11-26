import { useRouter } from "@happysanta/router";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import BookListComponent from "../components/BookListComponent";

const SearchResults = ({ id }) => {
    const router = useRouter();
    const {searchQuery, setSearchQuery} = useContext(AppContext);


    const onBackClick = () => {
        setSearchQuery('');
        router.popPage();
    }

    // useEffect(() => {
    //     console.log(searchQuery)
    // },[])

    return(
        <Panel id={id}>
		    <PanelHeader left={<PanelHeaderBack onClick={onBackClick}/>}>
            Поиск книг по запросу: {searchQuery}</PanelHeader>
            <BookListComponent>

            </BookListComponent>
        </Panel>
    )
}

export default SearchResults;