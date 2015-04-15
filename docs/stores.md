# Stores

## AddressStore

The current address, specifically the country.

Example output:

```javascript
{
  country: Immutable.Map({
    iso: 'AD',
    name: 'Andorra',
    zones: Immutable.Set([International, Europe])
  })
}
```

## BasketStore

The items currently in the basket.

Example output:

```javascript
{
  basket: Immutable.Map({
    'bag': Immutable.Map({ name: 'bag', price: Big(2.45), quantity: Big(3) }),
    'shoe': Immutable.Map({ name: 'shoe', price: Big(14.89), quantity: Big(1) })
  })
}
```

## CountriesStore

The list of all countries.

Example output:

```javascript
{
  countries: Immutable.Map({

    'KH': Immutable.Map({
      iso: 'KH',
      name: 'Cambodia',
      zones: Immutable.Set(['Shipping'])
    }),

    'AT': Immutable.Map({
      iso: 'AT',
      name: 'Austria',
      zones: Immutable.Set(['Shipping'])
    }),

    'GU': Immutable.Map({
      iso: 'GU',
      name: 'Guam',
      zones: Immutable.Set(['Domestic']
     })

  })
}
```

## DeliveryMethodsStore

The available delivery methods for the current address.

Example output:

```javascript
{
  methods: Immutable.Map({

    'Express': Immutable.Map({
      name: 'Express',
      zones: Immutable.Set(['Domestic']),
      calculator: [function]
    }),

    'Tracked': Immutable.Map({
      name: 'Tracked',
      zones: Immutable.Set(['Domestic', 'Shipping']),
      calculator: [function]
    })

  })
}
```

## DeliveryStore

The currently selected delivery method and it's associated cost.

Example output:

```javascript
{
  delivery: Immutable.Map({ name: 'Express', amount: Big(5.48) })
}
```

## DisplayStore

The products to be displayed after filters have been applied. Optionally has page information if page filter is applied.

Example output:

```javascript
{
  display: Immutable.Map({
    products: Immutable.List([
      Immutable.Map({ name: 'Slippers', price: Big(45.50) }),
      Immutable.Map({ name: 'Crocs', price: Big(88.00) }),
      Immutable.Map({ name: 'Sandals', price: Big(5.25) })
    ]),

    page: Immutable.Map({
      current: 2,
      numbers: Immutable.List([1, 2, 3, 4, 5, 6, 7]),
      prev: 1,
      next: 3
    })
  })
}
```

## OrderStore

The current state of the order with totals, adjustments and errors.

Example output:

```javascript
{
  order: Immutable.Map({
    totals: Immutable.Map({
      price: Big(5.30),
      weight: Big(1500),
      order: Big(7.80)
    }),
    delivery: 'Second Class',
    errors: Immutable.List(['Card is no longer valid or has expired']),
    adjustments: Immutable.List([
      Immutable.Map({ label: 'Second Class', amount: B(2.50) })
    ])
  })
}
```

## PaymentOptionsStore

The payment options.

Example output:

```javascript
{
  paymentOptions: I.Map({
    tokenizer: [function],
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
  products: Immutable.List([
    Immutable.Map({ name: 'Crocs', price: Big(88.00) }),
    Immutable.Map({ name: 'Sandals', price: Big(5.25) }),
    Immutable.Map({ name: 'Slippers', price: Big(45.50) })
  ])
}
```

## CheckoutStore

(Used internally).
