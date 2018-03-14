'use strict';

const currency = {
  humanize: (cents, hideSymbol) =>
    Number(cents / 100).toLocaleString('en-US', {
      style: !hideSymbol ? 'currency' : 'decimal',
      currency: 'USD',
      minimumFractionDigits: 2
    }),
  discount: {
    calculate: (subtotal_cents, bps) =>
      bps ? Math.floor(parseInt(subtotal_cents, 10) * (bps / 10000)) : 0,
    format: (subtotal_cents, bps, hideSymbol) =>
      currency.humanize(
        currency.discount.calculate(subtotal_cents, bps),
        hideSymbol
      )
  }
};

module.exports = currency;
