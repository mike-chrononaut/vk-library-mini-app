import {useRouter} from "@happysanta/router";
import {Button, ModalCard} from "@vkontakte/vkui";
import React, {useContext} from "react";
import bridge from '@vkontakte/vk-bridge';
import AppContext from "../AppContext";

const ConfirmExit = ({id}) => {
    const router = useRouter();

    const {setUserIsLogged} = useContext(AppContext);

    const logout = () => {
        bridge.send('VKWebAppStorageSet', {'key': 'token', 'value': ''})
            .catch(e => console.log(e));

        setUserIsLogged(false);
        router.popPage();
    }

    return <ModalCard
        id={id}
        header="Вы уверены, что хотите выйти?"
        actions={[
            <Button key="no" size="l" mode="secondary" onClick={() => router.popPage()}>
                Отмена
            </Button>,
            <Button key="yes" size="l" mode="primary" onClick={() => logout()}>
                Выход
            </Button>,
        ]}>
    </ModalCard>;
}

export default ConfirmExit;