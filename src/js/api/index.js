import { log, getCookie } from '@navikt/digisyfo-npm';

export const hentLoginUrl = () => {
    if (erProd()) {
        return 'https://loginservice.nais.adeo.no/login';
    }
    return 'https://loginservice.nais.preprod.local/login';
};

export const hentRedirectBaseUrl = () => {
    if (erProd()) {
        return 'https://syfomoteoversikt.nais.adeo.no';
    }
    return 'https://syfomoteoversikt.nais.preprod.local';
};

export const lagreRedirectUrlILocalStorage = (href) => {
    localStorage.setItem('redirecturl', href);
};

export function get(url) {
    return fetch(url, {
        credentials: 'include',
    })
        .then((res) => {
            if (res.status === 401) {
                log(res, 'Redirect til login');
                lagreRedirectUrlILocalStorage(window.location.href);
                window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl()}`;
            }
            if (res.status === 404) {
                log(res);
                throw new Error('404');
            }
            if (res.status > 400 && res.status !== 403) {
                throw new Error('Det oppstod en feil');
            }
            return res.json().then((data) => {
                if (res.status === 403) {
                    const tilgang = {
                        harTilgang: data.harTilgang,
                        begrunnelse: data.begrunnelse,
                    };
                    throw new Error403('403', 403, tilgang);
                }
                return data;
            });
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
            'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'),
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
