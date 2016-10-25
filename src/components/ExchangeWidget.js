import { h, Component } from 'preact';
import CurrencyPanel from './CurrencyPanel';
import config from '../config';
import { getRates, updateResultingAmount } from '../lib';

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
        this.timer = setInterval(::this.updateRates, config.updateInterval);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    changeFromCurrency(newCurrency) {
        this.state.from.currency = newCurrency;
        this.updateState();
    }

    changeToCurrency(newCurrency) {
        this.state.to.currency = newCurrency;
        this.updateState();
    }

    changeAmount(amount) {
        this.state.from.amount = amount;
        this.updateState();
    }

    updateRates() {
        getRates().then(rates => {
            this.state.rates = rates;
            this.updateState();
        });
    }

    updateState() {
        updateResultingAmount(this.state);
        this.setState(this.state);
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
