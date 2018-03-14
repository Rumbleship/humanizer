'use strict';

const keys = {
  po: [
    'total_cents',
    'shipping_total_cents',
    'subtotal_cents',
    'line_items_total_cents',
    'terms',
    'hashid',
    'confirmed_at',
    'created_at',
    'line_items'
  ],
  terms: [
    'receivable_day',
    'payable_day',
    'payable_discount_bps',
    'receivable_discount_bps',
    'payment'
  ],
  line_item: ['cost_cents', 'quantity', 'total_cents'],
  shipment: [
    'total_cents',
    'shipping_cents',
    'subtotal_cents',
    'terms',
    'hashid',
    'shipped_at',
    'created_at',
    'payable',
    'receivable'
  ],
  payable: [],
  receivable: [],
  account: []
};

module.exports = keys;
