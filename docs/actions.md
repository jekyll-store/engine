# Actions

## setItem

Sets the quantity of an item in the basket. If the item is not in the basket, it is added.

If quantity is negative, it is ignored.

Args:

* `name` - Unique name of product.
* `quantity` - The quantity that it should be set to.

Example:

```javascript
JekyllStoreEngine.Actions.setItem({ name: 'Ironic T-Shirt', quantity: 2 });
```

## removeItem

Removes an item from the basket.

Args:

* `name` - Unique name of product.

Example:

```javascript
JekyllStoreEngine.Actions.removeItem({ name: 'Ironic T-Shirt' });
```

## setAddress

Sets the address. If the country cannot be found, it is set to the first country in the list.

Args:

* `country` - ISO code for country.

Example:

```javascript
JekyllStoreEngine.Actions.setAddress({ country: 'GF' });
```

## setDelivery

Sets the delivery method to be used to deliver the order. If the method is unavailable for the current address, it is set to the first method available. If the method is not applicable for the current order, it cannot be purchased.

Args:

* `name` - Unique name for the delivery method.

Example:

```javascript
JekyllStoreEngine.Actions.setDelivery({ name: 'Express 24' });
```

## loadProducts

Loads products. If any products are missing a name, or if any name is not unique, the action is ignored with a warning.

Args:

* `products`

Example:

```javascript
JekyllStoreEngine.Actions.loadProducts({
  products: [
    { name: 'Basil', price: 1.25 },
    { name: 'Cinnamon', price: 1.78 },
    { name: 'Ginger', price: 0.95 },
    { name: 'Nutmeg', price: 1.30 }
  ]
});
```

## loadCountries

Loads countries. If any countries are missing an iso, or if any iso is not unique, the action is ignored with a warning.

Args:

* `countries`

Example:

```javascript
JekyllStoreEngine.Actions.loadCountries({
  countries: [
    { iso: 'KH', name: 'Cambodia', zones: ['Shipping']  },
    { iso: 'AT', name: 'Austria', zones: ['Shipping'] },
    { iso: 'GU', name: 'Guam', zones: ['Domestic'] }
  ]
});
```

## loadDeliveryMethods

Loads delivery methods. If any methods are missing a name, or if any name is not unique, the action is ignored with a warning.

Args:

* `methods`

Example:

```javascript
JekyllStoreEngine.Actions.loadDeliveryMethods({
  methods: [
    {
      name: 'Express',
      zones: ['Domestic'],
      calculator: 'Percent',
      args: { field: 'total', percent: 25 }
    },
    {
      name: 'Tracked',
      zones: ['Domestic', 'Shipping'],
      calculator: 'Fixed',
      args: { amount: 13.50 }
    }
  ]
});
```

## setPaymentOptions

Sets the payment options.

Args:

* `currency` - [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code.
* `hook` - url for service to process order with card token

Example:

```javascript
JekyllStoreEngine.Actions.setPaymentOptions({
  currency: 'USD',
  hook: 'http://my-payments-microserver.com/purchase'
});
```

## purchase

Processes order. All arguments are sent as part of the payload to the payment
URL hook, along with a summary of the baskets contents, the delivery method,
the cuurency and the order total.

Example:

```javascript
JekyllStoreEngine.Actions.purchase({
  token: 'BE4653EB4EJJH97',
  cutomer: {
    name: 'Frank Abagnale',
    email: 'frankieSaysChilax@example.com'
  },
  address: {
    address1: '45 Bloomsfield Crescent',
    city: 'Agloe',
    state: 'New York',
    country: 'US',
    zipcode: 'MN 55416'
  }
});
```

## completed

Called when payment has been successully processed. Triggers BasketStore to clear the session.

## refreshCheckout

Used internally to allow adjustors to call for checkout adjustments to be recalculated.

## setErrors

Can be used to set errors manually.

Args:

* `errors`
* `mutate` - Set to true to keep the errors until manually removed.

Example:

```javascript
JekyllStoreEngine.Actions.setErrors({
  errors: ['Card code is not recognized'],
  mutate: false
});
```
