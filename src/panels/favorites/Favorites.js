import {Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent} from "@vkontakte/vkui";
import React from "react";
import {useRouter} from "@happysanta/router";
import BookList from "../../common/BookList";

const Favorites = ({id}) => {
    const router = useRouter();

    const onBackClick = () => {
        router.popPage();
    }

    return (<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={onBackClick}
                                            style={{paddingBottom: "16px", paddingRight: "16px"}}/>}>
            <PanelHeaderContent>Избранное</PanelHeaderContent>
        </PanelHeader>
        <BookList url={'/auth/cabinet/favorites'}
                  noBooksMessage='Отсутствуют книги в списке избранного'/>
    </Panel>);
}

export default Favorites;