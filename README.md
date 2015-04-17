# Jekll-Store - [Demo](http://jekyll-store.com/front)

Jekyll-Store is a lightweight, backend-free ecommerce solution that is easy to deploy, maintain and customize. It is comprised of three parts:

* [Jekll-Store Front](https://github.com/jekyll-store/front): a front-end made with the [Jekyll](https://github.com/jekyll/jekyll) static-site generator and reusable [React](https://github.com/facebook/react) components.

* [Jekll-Store Engine](https://github.com/jekyll-store/engine): javascript business logic written with the [RefluxJS](https://github.com/spoike/refluxjs) derivative of the [Flux](https://github.com/facebook/flux) architecture.

* [Jekyll-Store Microservice](https://github.com/jekyll-store/microservice): a small app for processing payments and sending transactional emails, currently written in Ruby.

# Engine

[![Build Status](https://travis-ci.org/jekyll-store/engine.svg?branch=master)](https://travis-ci.org/jekyll-store/engine)

Even though Jekyll-Store Engine was written with Jekyll and the Jekyll-Store solution in mind, it is decoupled from most implementation specifics and could just as easily serve the basis of any static-site ecommerce solution. It also has been written such that most of the code is reachable from the main `JekyllStoreEngine` object to enable extensibility.

## Actions

As with all [Flux](https://github.com/facebook/flux) architectures, interaction in Jekyll-Store Engine flows uni-directionally from Actions to Stores and from Stores to any components listening to them. The following is a list of the actions:

* `setItem` - Sets the quantity of an item in the basket.
* `removeItem` - Removes an item from the basket.
* `setAddress` - Sets the address, specifically the country.
* `setDelivery` - Sets the delivery method to be used to deliver the order.
* `setDisplayFilter` - Sets a function to filter the displayed products.
* `removeDisplayFilter` - Removes a display filter.
* `loadProducts` - Loads products.
* `loadCountries` - Loads countries.
* `loadDeliveryMethods` - Loads delivery methods.
* `setPaymentOptions` - Sets the payment options and purchase hook.
* `purchase` - Processes order.
* `completed` - Called when payment has been successully processed.
* `refreshCheckout` - (Used internally).

For more information, consult the [Actions reference page](/docs/actions.md).

## Stores

Stores are to be considered the absolute source of truth for the data they trigger. For the most part, data is immutable, with structures using [Immutable.js](https://github.com/facebook/immutable-js)'s Map and List, and numbers using [Big.js](http://mikemcl.github.io/big.js/). As such, the triggered data cannot be changed by other listeners. The following is a list of the stores and what they publish:

* `AddressStore` - The current address, specifically the country.
* `BasketStore` - The items currently in the basket.
* `CountriesStore` - The list of all countries.
* `DeliveryMethodsStore` - The available delivery methods for the current address.
* `DeliveryStore` - The currently selected delivery method and it's associated cost.
* `DisplayStore` - The products to be displayed after filters have been applied.
* `OrderStore` - The current state of the order with totals, adjustments and errors.
* `PaymentOptionsStore` - The payment options.
* `ProductsStore` - The list of all products.
* `CheckoutStore` - (Used internally).

For more information, consult the [Stores reference page](/docs/stores.md).

## Filters

Filters are simple functions that filter the products in a display. They have an associated precedence to make sure they are run in the correct order. The following is a list of the filters:

* `PageFilter` - Paginates the display at the specified page number.
* `RangesFilter` - Allows products with a field within the supplied ranges.
* `SearchFilter` - Allows products with a field that contains the searched text.
* `SortFilter` - Sorts products on a field in the specified direction.
* `TagsFilter` - Allows products with a field that matches one of the supplied tags.

For more information, consult the [Filters reference page](/docs/stores.md).

## Calculators

Calculators are simple functions that take an order and return a number, usually representing the cost for an adjustment, such as the delivery rate. The following is a list of the calculators:

* `FixedCalculator` - Returns a fixed amount, regardless of the order.
* `PercentCalculator` - Returns a percentage of one of the order's totals.
* `TieredCalculator` - Returns an amount dependent on which tier one of the order's totals falls into.

For more information, consult the [Calculators reference page](/docs/calculators.md).

## Tokenizers

Tokenizers are interfaces with payment gateway providers, that use their API's to swap dangerous card details for a safe token that represents those cards. Not all payment gateways provide these API's. The following is a list of currently implemented tokenizers:

* [Paymill](https://www.paymill.com/)

## Contributing

1. Fork it ( https://github.com/[my-github-username]/engine/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request