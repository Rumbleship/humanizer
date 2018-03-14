'use strict';

const currency = require('./currency');
const date = require('./date');
const term = require('./term');

const reps = require('./keys');

class Humanizer {
  constructor(rep) {
    // let topLevelKeys = [];
    // for (const rep in reps) {
    //   topLevelKeys = topLevelKeys.concat(reps[rep]);
    // }
    // Array.from(new Set(topLevelKeys)).forEach(key => (this[key] = {}));

    this.input = {};
    this.looksLike = '';
    this.identified = false;
    this.output = {};
    this.transform = {
      currency: cents => currency.humanize(cents),
      date: str => date.humanize(str),
      bps: bps => bps,
      term: days => term.humanize(days),
      default: val => val
    };
    this._expectedKeys = reps;

    Object.freeze(this._expectedKeys);

    if (rep) {
      this._store(rep);
    }
  }

  _store(rep) {
    if (typeof rep === 'object') {
      for (const prop in rep) {
        this.input[prop] = rep[prop];
      }
      this._identify(this.input);
      return Object.freeze(this.input);
    }
    throw new Error('`input` argument must be an object');
  }

  _identify(input) {
    for (const rep in this._expectedKeys) {
      if (this._expectedKeys[rep].every(v => !!input[v])) {
        this.looksLike = `${rep}`;
        this.identified = true;
        for (const key in this.input) {
          this.output[key] = {
            input: this.input[key],
            type: '',
            humanized: undefined
          };
        }
        this._setTypes(this.output);
        break;
      }
    }
  }

  _setTypes(output) {
    for (const key in output) {
      output[key].type = this._keyType(key);
      output[key].humanized = this.transform[output[key].type]
        ? this.transform[output[key].type](this.input[key])
        : this.transform.default(this.input[key]);
    }
  }

  _keyType(key) {
    const mappings = {
      cents: 'currency',
      at: 'date',
      bps: 'bps',
      day: 'term',
      default: key
    };
    return mappings[key.split('_').pop()] || mappings.default;
  }
}

module.exports = Humanizer;
