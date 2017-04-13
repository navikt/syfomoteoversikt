const getPort = () => {
    if (window.location.port === '') {
        return '';
    }
    return ':8090';
};

const ContextholderConnection = () => {
    return new WebSocket(`${window.APP_SETTINGS.WEBSOCKET_PROTOCOL}://${window.location.hostname}${getPort()}/modiaeventdistribution/websocket`);
};

export const opprettWebsocketConnection = (callback) => {
    const connection = new ContextholderConnection();
    connection.onmessage = (e) => {
        if (e.data === 'Connection Established') {
            return;
        }
        callback(e);
    };
    connection.onerror = () => {
        setTimeout(() => {
            opprettWebsocketConnection();
        }, 1000);
    };
    connection.onclose = () => {
        setTimeout(() => {
            opprettWebsocketConnection();
        }, 1000);
    };
};
