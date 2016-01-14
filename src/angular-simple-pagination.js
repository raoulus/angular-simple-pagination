'use strict';

angular
  .module('angularSimplePagination', [])
  .directive('simplePagination', SimplePagination);

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
    template: `
      <div class="simple-pagination">
        <p class="simple-pagination__items">Showing {{pagination.itemsPerPage}} out of {{pagination.totalItems}}</p>
        <p>
          <button ng-click="pagination.previousPage()" ng-disabled="pagination.currentPage <= 0" class="simple-pagination__button simple-pagination__button--prev">
            &#10094;
          </button>
          <span class="simple-pagination__pages">{{pagination.currentPage + 1}} of {{pagination.getTotalPages()}}</span>
          <button ng-click="pagination.nextPage()" ng-disabled="pagination.currentPage === (pagination.getTotalPages() - 1)" class="simple-pagination__button simple-pagination__button--next">
            &#10095;
          </button>
        </p>
        <p class="simple-pagination__max">
          <span class="simple-pagination__max__page" ng-repeat="page in pagination.maxPages" ng-if="page < pagination.totalItems">
            <a href="" ng-click="pagination.setItemsPerPages(page)" ng-class="{'active': pagination.isActive(page)}">{{page}}</a>
          </span>
          <span>
            <a href="" ng-click="pagination.setItemsPerPages(pagination.totalItems)" ng-class="{'active': pagination.isActive(pagination.totalItems)}">All</a>
          </span>
        </p>
      </div>
    `
  };
}

function SimplePaginationController() {
  var self = this;

  self.currentPage = 0;

  self.setItemsPerPages = function(max) {
    self.itemsPerPage = max >= self.totalItems ? self.totalItems : max;
    self.currentPage = 0;
    self.offset = 0;
  };

  self.nextPage = function() {
    self.currentPage += 1;
    self.offset = (self.currentPage) * self.itemsPerPage;
  };

  self.previousPage = function() {
    self.currentPage -= 1;
    self.offset = (self.currentPage) * self.itemsPerPage;
  };

  self.getTotalPages = function() {
    return Math.ceil(self.totalItems / self.itemsPerPage);
  };

  self.isActive = function(value) {
    return self.itemsPerPage == value;
  };

}
