'use strict';

angular
  .module('angularSimplePagination', [])
  .directive('simplePagination', SimplePagination);

function SimplePagination() {
  return {
    restrict: 'E',
    scope: {
      currentPage: '=',
      offset: '=',
      pageLimit: '=',
      pageLimits: '=',
      total: '=',
      onUpdate: '&'
    },
    bindToController: true,
    controller: SimplePaginationController,
    controllerAs: 'pagination',
    template: `
      <div class="simple-pagination">
        <p class="simple-pagination__items">Showing {{pagination.pageLimit}} out of {{pagination.total}}</p>
        <p>
          <button ng-click="pagination.previousPage()" ng-disabled="pagination.currentPage <= 0" class="simple-pagination__button simple-pagination__button--prev">
            &#10094;
          </button>
          <span class="simple-pagination__pages">{{pagination.currentPage + 1}} of {{pagination.getTotalPages()}}</span>
          <button ng-click="pagination.nextPage()" ng-disabled="pagination.currentPage === (pagination.getTotalPages() - 1)" class="simple-pagination__button simple-pagination__button--next">
            &#10095;
          </button>
        </p>
        <p class="simple-pagination__page-limit">
          <span class="simple-pagination__page-limit__option" ng-repeat="limit in pagination.pageLimits" ng-if="limit < pagination.total">
            <a href="" ng-click="pagination.setItemsPerPages(limit)" ng-class="{'active': pagination.isCurrentPageLimit(limit)}">{{limit}}</a>
          </span>
          <span>
            <a href="" ng-click="pagination.setItemsPerPages(pagination.total)" ng-class="{'active': pagination.isCurrentPageLimit(pagination.total)}">All</a>
          </span>
        </p>
      </div>
    `
  };
}

function SimplePaginationController() {
  var self = this;

  self.currentPage = self.currentPage || 0;
  self.pageLimit = self.pageLimit || self.pageLimits[0];

  self.setItemsPerPages = function(max) {
    self.pageLimit = max >= self.total ? self.total : max;
    self.currentPage = 0;
    self.offset = 0;
    invokeCallback();
  };

  self.nextPage = function() {
    self.currentPage += 1;
    self.offset = (self.currentPage) * self.pageLimit;
    invokeCallback();
  };

  self.previousPage = function() {
    self.currentPage -= 1;
    self.offset = (self.currentPage) * self.pageLimit;
    invokeCallback();
  };

  self.getTotalPages = function() {
    return Math.ceil(self.total / self.pageLimit);
  };

  self.isCurrentPageLimit = function(value) {
    return self.pageLimit == value;
  };

  function invokeCallback() {
    if (self.onUpdate) {
      self.onUpdate();
    }
  }

}
