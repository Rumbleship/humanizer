'use strict';

const date = {
  humanize: str =>
    new Date(str).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
};

module.exports = date;
