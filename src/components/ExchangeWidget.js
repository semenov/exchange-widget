import { h, Component } from 'preact';
import CurrencyPanel from './CurrencyPanel';

const config = {
    api: {
        appId: 'da3a0568242846f99460614c0482fa22',
        url: 'https://openexchangerates.org/api/latest.json'
    }
};

const currencies = ['GBP', 'EUR', 'USD'];

const ratesUrl = `${config.api.url}?&app_id=${config.api.appId}`;

function getRates() {
    // return fetch(ratesUrl).then(response => {
    //     return response.json();
    // }).then(result => {
    //     return calculateRates(result.rates);
    // });

    return Promise.resolve({"GBP":{"GBP":1,"EUR":1.1238673057116992,"USD":1.2217276940011947},"EUR":{"GBP":0.889784759212958,"EUR":1,"USD":1.0870746820306554},"USD":{"GBP":0.818513,"EUR":0.9199,"USD":1}});

}

function calculateRates(usdRates) {
    const rates = {};
    for (let currency of currencies) {
        rates[currency] = {};
        const currencyRate = usdRates[currency];
        for (let nestedCurrency of currencies) {
            const nestedCurrencyRate = usdRates[nestedCurrency];
            rates[currency][nestedCurrency] =  nestedCurrencyRate / currencyRate;
        }
    }

    return rates;
}

function updateResultingAmount(state) {
    if (state.rates) {
        const rate = state.rates[state.from.currency][state.to.currency];
        state.to.amount = state.from.amount * rate;
    }

    return state;
}

export default class ExchangeWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: {
                currency: 'GBP',
                amount: 0
            },
            to: {
                currency: 'EUR',
                amount: 0
            }
        };
    }

    componentDidMount() {
        this.updateRates();

        //this.timer = setInterval(this.updateRates, 3000);
    }

    componentWillUnmount() {
        //clearInterval(this.timer);
    }

    changeFromCurrency(newCurrency) {
        const state = this.state;
        state.from.currency = newCurrency;
        updateResultingAmount(state);
        this.setState(state);
    }

    changeToCurrency(newCurrency) {
        const state = this.state;
        state.to.currency = newCurrency;
        updateResultingAmount(state);
        this.setState(state);
    }

    changeAmount(amount) {
        const state = this.state;
        state.from.amount = amount;
        updateResultingAmount(state);
        this.setState(state);
    }

    updateRates() {
        getRates().then(rates => {
            console.log(rates);
            const state = this.state;
            state.rates = rates;
            updateResultingAmount(state);
            this.setState(state);
        })

    }

    render(props, {from, to, rates}) {
        let fromRate;
        let toRate;

        if (rates) {
            fromRate = rates[from.currency][to.currency];
            toRate = rates[to.currency][from.currency];
        }

        return (
            <div class="ExchangeWidget">
                <div class="ExchangeWidget_from">
                    <CurrencyPanel
                        currency={from.currency}
                        secondCurrency={to.currency}
                        amount={from.amount}
                        rate={fromRate}
                        editable={true}
                        onAmountChange={::this.changeAmount}
                        onCurrencyChange={::this.changeFromCurrency} />
                </div>
                <div class="ExchangeWidget_to">
                    <CurrencyPanel
                        currency={to.currency}
                        secondCurrency={from.currency}
                        amount={to.amount}
                        rate={toRate}
                        editable={false}
                        onCurrencyChange={::this.changeToCurrency} />
                </div>

            </div>
        );
    }
}
