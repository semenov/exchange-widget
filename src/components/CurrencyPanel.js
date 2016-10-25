import { h, Component } from 'preact';
import config from '../config';

export default class CurrencyPanel extends Component {
    handleAmountChange(event) {
        if (this.props.onAmountChange) {
            this.props.onAmountChange(event.target.value);
        }
    }

    handleCurrencyChange(currencyType) {
        return event => {
            this.props.onCurrencyChange(currencyType)
        };
    }

    render({currency, secondCurrency, rate, amount, editable}) {
        let amountControl;
        if (editable) {
            amountControl = <input type="number"
                                   class="CurrencyPanel_amount"
                                   value={amount}
                                   onInput={::this.handleAmountChange}/>;
        } else {
            amountControl = <div class="CurrencyPanel_amount">{amount.toFixed(2)}</div>;
        }

        let exchangeRate = '';
        if (rate) {
            exchangeRate = `${config.currencySymbols[currency]} 1 = ` +
                `${config.currencySymbols[secondCurrency]} ${rate.toFixed(4)}`;
        }

        return (
            <div class="CurrencyPanel">
                <div class="CurrencyPanel_currency">{currency}</div>
                {amountControl}
                <div class="CurrencyPanel_rate">{exchangeRate}</div>
                <div class="CurrencyPanel_switch">
                    {config.currencies.map(currency =>
                        <button class="CurrencyPanel_switchButton" onClick={::this.handleCurrencyChange(currency)}>
                            {currency}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}
