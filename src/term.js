'use strict';

const term = {
  humanize: days => (Number(days) === 0 ? 'Pay Now' : `Net ${days}`)
};

module.exports = term;
