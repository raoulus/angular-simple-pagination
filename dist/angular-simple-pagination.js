'use strict';

angular.module('angularSimplePagination', []).directive('simplePagination', SimplePagination);

function SimplePagination() {
  return {
    restrict: 'E',
    scope: {
      offset: '=',
      itemsPerPage: '=',
      totalItems: '=',
      maxPages: '='
    },
    bindToController: true,
    controller: SimplePaginationController,
    controllerAs: 'pagination',
    template: '\n      <div class="simple-pagination">\n        <p class="simple-pagination__items">Showing {{pagination.itemsPerPage}} out of {{pagination.totalItems}}</p>\n        <p>\n          <button ng-click="pagination.previousPage()" ng-disabled="pagination.currentPage <= 0" class="simple-pagination__button simple-pagination__button--prev">\n            &#10094;\n          </button>\n          <span class="simple-pagination__pages">{{pagination.currentPage + 1}} of {{pagination.getTotalPages()}}</span>\n          <button ng-click="pagination.nextPage()" ng-disabled="pagination.currentPage === (pagination.getTotalPages() - 1)" class="simple-pagination__button simple-pagination__button--next">\n            &#10095;\n          </button>\n        </p>\n        <p class="simple-pagination__max">\n          <span class="simple-pagination__max__page" ng-repeat="page in pagination.maxPages" ng-if="page < pagination.totalItems">\n            <a href="" ng-click="pagination.setItemsPerPages(page)" ng-class="{\'active\': pagination.isActive(page)}">{{page}}</a>\n          </span>\n          <span>\n            <a href="" ng-click="pagination.setItemsPerPages(pagination.totalItems)" ng-class="{\'active\': pagination.isActive(pagination.totalItems)}">All</a>\n          </span>\n        </p>\n      </div>\n    '
  };
}

function SimplePaginationController() {
  var self = this;

  self.currentPage = 0;

  self.setItemsPerPages = function (max) {
    self.itemsPerPage = max >= self.totalItems ? self.totalItems : max;
    self.currentPage = 0;
    self.offset = 0;
  };

  self.nextPage = function () {
    self.currentPage += 1;
    self.offset = self.currentPage * self.itemsPerPage;
  };

  self.previousPage = function () {
    self.currentPage -= 1;
    self.offset = self.currentPage * self.itemsPerPage;
  };

  self.getTotalPages = function () {
    return Math.ceil(self.totalItems / self.itemsPerPage);
  };

  self.isActive = function (value) {
    return self.itemsPerPage == value;
  };
}