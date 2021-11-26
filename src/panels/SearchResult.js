import {Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent} from '@vkontakte/vkui';
import React, {useContext} from "react";
import {PAGE_HOME} from "../routers";
import AppContext from "../AppContext";
import {useFirstPageCheck, useRouter} from "@happysanta/router";

function SearchResult(id) {

    const isFirstPage = useFirstPageCheck();
    const router = useRouter();

    const {
        book, setBook,
        connectionError, setConnectionError
    } = useContext(AppContext);

    const onBackClick = () => {
        if (isFirstPage) {
            router.replacePage(PAGE_HOME);
        } else {
            router.popPage();
        }
    }

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={onBackClick}/>}>
                <PanelHeaderContent>Результат поиска</PanelHeaderContent>
            </PanelHeader>

        </Panel>
    )
}

export default SearchResult