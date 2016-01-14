# Angular Simple Pagination

---

## About
...
Tested with angular 1.4.8

## Installation
```
npm install angular-simple-pagination
```

## Usage
Module:
```javascript
angular.module('YOUR_MODULE', ['angularSimplePagination']);
```

Controller:
```javascript
angular.module('YOUR_MODULE').controller(function($scope) {
  $scope.settings = {
    itemsPerPage: 1,
    offset: 0,
    totalItems: 3,
    maxPages: ['1', '2', '3']
  };

  $scope.items = [
    {id: 1},
    {id: 2},
    {id: 3}
  ];
});
```

HTML:
```html
<simple-pagination
  items-per-page="settings.itemsPerPage"
  offset="settings.offset"
  total-items="settings.totalItems"
  max-pages="settings.maxPages">
</simple-pagination>

<div ng-repeat="item in (items | limitTo:settings.itemsPerPage:settings.offset)">
...
</div>
```

## Demos
...

## Tasks
```bash
gulp build
gulp test
```
