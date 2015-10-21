# Stores

## AddressStore

The current address, specifically the country.

Example output:

```javascript
{
  country: Immutable({
    iso: 'AD',
    name: 'Andorra',
    zones: ['International', 'Europe']
  })
}
```

## BasketStore

The items currently in the basket.

Example output:

```javascript
{
  basket: Immutable({
    'bag': { name: 'bag', price: 2.45, quantity: 3, subtotal: 7.35 },
    'shoe': { name: 'shoe', price: 14.89, quantity: 1, subtotal: 14.89 }
  })
}
```

## CountriesStore

The list of all countries.

Example output:

```javascript
{
  countries: Immutable({
    'KH': { iso: 'KH', name: 'Cambodia', zones: ['Shipping'] },
    'AT': { iso: 'AT', name: 'Austria', zones: ['Shipping'] },
    'GU': { iso: 'GU', name: 'Guam', zones: ['Domestic'] }
  })
}
```

## DeliveryMethodsStore

The available delivery methods for the current address.

Example output:

```javascript
{
  methods: Immutable({
    'Express': { name: 'Express', zones: ['Domestic'], calculator: [function] },
    'Tracked': { name: 'Tracked', zones: ['Domestic', 'Shipping'], calculator: [function] }
  })
}
```

## DeliveryStore

The currently selected delivery method and it's associated cost.

Example output:

```javascript
{
  delivery: Immutable({ name: 'Express', amount: 5.48 })
}
```

## OrderStore

The current state of the order with totals, adjustments and errors.

Example output:

```javascript
{
  order: Immutable({
    totals: { price: 5.30, weight: 1500, order: 7.80 },
    delivery: 'Second Class',
    errors: ['Card is no longer valid or has expired'],
    adjustments: [{ label: 'Second Class', amount: 2.50 }]
  })
}
```

## PaymentOptionsStore

The payment options.

Example output:

```javascript
{
  paymentOptions: Immutable({
    currency: 'USD',
    hook: 'http://my-payments-server.com/purchase'
  })
}

```

## ProductsStore

The list of all products.

Example output:

```javascript
{
  products: Immutable({
    'Crocs': { name: 'Crocs', price: 88.00 },
    'Sandals': { name: 'Sandals', price: 5.25 },
    'Slippers': { name: 'Slippers', price: 45.50 }
  })
}
```

## CheckoutStore

(Used internally).
