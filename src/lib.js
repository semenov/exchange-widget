import config from './config';

const ratesUrl = `${config.api.url}?&app_id=${config.api.appId}`;

export function getRates() {
    return fetch(ratesUrl).then(response => {
        return response.json();
    }).then(result => {
        return calculateRates(result.rates);
    });
}

function calculateRates(usdRates) {
    const rates = {};
    for (let currency of config.currencies) {
        rates[currency] = {};
        const currencyRate = usdRates[currency];
        for (let nestedCurrency of config.currencies) {
            const nestedCurrencyRate = usdRates[nestedCurrency];
            rates[currency][nestedCurrency] =  nestedCurrencyRate / currencyRate;
        }
    }

    return rates;
}

export function updateResultingAmount(state) {
    if (state.rates) {
        const rate = state.rates[state.from.currency][state.to.currency];
        state.to.amount = state.from.amount * rate;
    }

    return state;
}
