import { log } from 'digisyfo-npm';

export function get(url) {
    return fetch(url, {
        credentials: 'include',
    })
    .then((res) => {
        if (res.status === 404) {
            log(res);
            throw new Error('404');
        }
        if (res.status > 400) {
            throw new Error('Det oppstod en feil');
        }
        return res.json();
    })
    .catch((err) => {
        log(err);
        throw err;
    });
}

export function post(url, body) {
    return fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => {
        if (res.status > 400) {
            log(res);
            throw new Error('Forespørsel feilet');
        } else {
            return res;
        }
    })
    .catch((err) => {
        log(err);
        throw err;
    });
}
