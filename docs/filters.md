# Filters

## PageFilter

Paginates the display at the specified page number.

Example:

```javascript
JekyllStoreEngine.Actions.setDisplayFilter({
  name: 'page',
  filter: JekyllStoreEngine.Filters.Page(6, 2)
});
```

## RangesFilter

Allows products with a field within the supplied ranges.

Example:

```javascript
JekyllStoreEngine.Actions.setDisplayFilter({
	name: 'weight-range',
	filter: JekyllStoreEngine.Filters.Ranges('weight', [[0, 1.5], [3.5, 5]])
});
```

## SearchFilter

Allows products with a field that contains the searched text.

Example:

```javascript
JekyllStoreEngine.Actions.setDisplayFilter({
	name: 'search',
	filter: JekyllStoreEngine.Filters.Search('name', 'bo')
});
```

## SortFilter

Sorts products on a field in the specified direction.

Example:

```javascript
var sortFilter = JekyllStoreEngine.Filters.Sort;

JekyllStoreEngine.Actions.setDisplayFilter({
	name: 'sort',
	filter: sortFilter('vintage', sortFilter.ASC)
});
```

## TagsFilter

Allows products with a field that matches one of the supplied tags.

Example:

```javascript
JekyllStoreEngine.Actions.setDisplayFilter({
	name: 'colour-tag',
	filter: JekyllStoreEngine.Filters.Tags('colour', ['red', 'blue'])
});
```

