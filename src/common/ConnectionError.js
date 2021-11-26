import {Icon16ErrorCircleFill} from "@vkontakte/icons";
import {Snackbar} from "@vkontakte/vkui";
import React, {useContext} from "react";
import AppContext from "../AppContext";

const ConnectionError = () => {
    const {setConnectionError} = useContext(AppContext);

    return <Snackbar
        onClose={() => setConnectionError(false)}
        before={<Icon16ErrorCircleFill/>}
        duration={5000}>
        Возникла проблема при загрузке данных
    </Snackbar>
}

export default ConnectionError;