import {useRouter} from "@happysanta/router";
import {Button, FormItem, Group, Input, ModalCard, Text} from "@vkontakte/vkui";
import React, {useContext, useState} from "react";
import {Icon20CheckShieldOutline, Icon20User} from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import AppContext from "../AppContext";

const Auth = ({id}) => {
    const router = useRouter();

    const [userLogin, setUserLogin] = useState(null);
    const [userPassword, setUserPassword] = useState(null);

    const [authResult, setAuthResult] = useState('');

    const {setUserIsLogged} = useContext(AppContext);
    const {setToken} = useContext(AppContext);

    const login = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(userLogin + ":" + userPassword, 'utf8').toString('base64')
            }
        };

        fetch(process.env.REACT_APP_API_URL + '/auth/login', requestOptions)
            .then(result => {
                if (!result.ok) {
                    throw new Error("HTTP status " + result.status);
                }

                let userToken = result.headers.get('x-csrf-token');

                if (!userToken) {
                    throw new Error("Couldn't get token from response");
                }

                setToken(userToken);

                return bridge.send('VKWebAppStorageSet', {'key': 'token', 'value': userToken});
            })
            .then(result => {
                if (result) {
                    setAuthResult('success');
                    setUserIsLogged(true);

                    setTimeout(() => router.popPage(), 1100);
                } else {
                    setAuthResult('fail');
                }
            })
            .catch(e => {
                setAuthResult('fail');
                console.log(e);
            });
    }

    const onLoginChange = (event) => {
        setUserLogin(event.target.value);
    };

    const onPasswordChange = (event) => {
        setUserPassword(event.target.value);
    };

    return <ModalCard
        id={id}
        header="Вход в систему"
        actions={[
            <Button key="close" size="l" mode="secondary" onClick={() => router.popPage()}>
                Закрыть
            </Button>,
            <Button key="login" size="l" mode="primary" onClick={() => login()}>
                Вход
            </Button>,
        ]}>
        <Group>
            <FormItem top="Логин">
                <Input type="text" after={<Icon20User aria-hidden="true" />} onChange={onLoginChange}/>
            </FormItem>
            <FormItem top="Пароль">
                <Input type="password" after={<Icon20CheckShieldOutline aria-hidden="true" />} onChange={onPasswordChange}/>
            </FormItem>
            <FormItem>
                {(authResult === 'success') && <Text style={{color: "green", textAlign: "center"}}>Вы успешно авторизовались в системе</Text>}
                {(authResult === 'fail') && <Text style={{color: "red", textAlign: "center"}}>Возникла проблема при входе в систему</Text>}
            </FormItem>
        </Group>
    </ModalCard>;
}

export default Auth;