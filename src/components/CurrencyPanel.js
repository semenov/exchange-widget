import { h, Component } from 'preact';

const currencySymbols = {
    GBP: '£',
    EUR: '€',
    USD: '$'
};

export default class CurrencyPanel extends Component {
    render({currency, secondCurrency, rate, amount, editable, onAmountChange, onCurrencyChange}) {

        function handleAmountChange(event) {
            if (onAmountChange) {
                onAmountChange(event.target.value);
            }
        }

        const handleCurrencyChange = currencyType => event => {
            onCurrencyChange(currencyType);
        };

        let amountControl;
        if (editable) {
            amountControl = <input type="number" class="CurrencyPanel_amount" value={amount} onInput={handleAmountChange}/>;
        } else {
            amountControl = <div class="CurrencyPanel_amount">{amount.toFixed(2)}</div>;
        }

        let exchangeRate = '';
        if (rate) {
            exchangeRate = `${currencySymbols[currency]} 1 = ${currencySymbols[secondCurrency]} ${rate.toFixed(4)}`;
        }

        return (
            <div class="CurrencyPanel">
                <div class="CurrencyPanel_currency">{currency}</div>
                {amountControl}
                <div class="CurrencyPanel_rate">{exchangeRate}</div>
                <div class="CurrencyPanel_switch">
                    <button class="CurrencyPanel_switchButton" onClick={handleCurrencyChange('GBP')}>GBP</button>
                    <button class="CurrencyPanel_switchButton" onClick={handleCurrencyChange('EUR')}>EUR</button>
                    <button class="CurrencyPanel_switchButton" onClick={handleCurrencyChange('USD')}>USD</button>
                </div>
            </div>
        );
    }
}
