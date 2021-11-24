import {Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent} from "@vkontakte/vkui";
import React, {useContext} from "react";
import AppContext from "../../AppContext";
import './SearchResults.css';
import {useRouter} from "@happysanta/router";
import BookList from "../../common/BookList";

const SearchResults = ({id}) => {
    const router = useRouter();
    const {searchQuery, setSearchQuery} = useContext(AppContext);

    const onBackClick = () => {
        setSearchQuery('');
        router.popPage();
    }

    return (<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={onBackClick}
                                            style={{paddingBottom: "16px", paddingRight: "16px"}}/>}>
            <PanelHeaderContent>Результаты поиска</PanelHeaderContent>
        </PanelHeader>
        <BookList url={'/catalog/search'}
                  noBooksMessage='К сожалению, не удалось найти издания по данному запросу'
                  queryParams={'query=' + searchQuery}/>
    </Panel>);
}

export default SearchResults;