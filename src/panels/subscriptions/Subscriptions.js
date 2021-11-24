import {Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent} from "@vkontakte/vkui";
import React from "react";
import {useRouter} from "@happysanta/router";
import BookList from "../../common/BookList";

const Subscriptions = ({id}) => {
    const router = useRouter();

    const onBackClick = () => {
        router.popPage();
    }

    return (<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={onBackClick}
                                            style={{paddingBottom: "16px", paddingRight: "16px"}}/>}>
            <PanelHeaderContent>Подписки</PanelHeaderContent>
        </PanelHeader>
        <BookList url={'/auth/cabinet/subscriptions'}
                  noBooksMessage='Отсутствуют книги в списке подписок'/>
    </Panel>);
}

export default Subscriptions;