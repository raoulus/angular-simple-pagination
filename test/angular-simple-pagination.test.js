/*jslint nomen: true, expr: true */
'use strict';

describe('Angular Simple Pagination', function() {

  var $rootScope;
  var element;
  var controller;

  beforeEach(module('angularSimplePagination'));

  beforeEach(function() {
    inject(function(_$compile_, _$rootScope_) {
      var $compile = _$compile_;
      $rootScope = _$rootScope_;
      $rootScope.offset = 0;
      $rootScope.currentPage = 0;
      $rootScope.pageLimit = 10;
      $rootScope.total = 2000;
      $rootScope.pageLimits = [10, 100, 1000];
      $rootScope.callback = sinon.spy();
      element = $compile('<simple-pagination page-limit="pageLimit" offset="offset" total="total" on-update="callback()" current-page="currentPage"></simple-pagination>')($rootScope);
      $rootScope.$digest();
      controller = element.controller('simplePagination');
    });
  });

  it('Resets offset and currentPage to 0 when page limit has changed', function() {
    controller.currentPage = 20;
    controller.offset = 10;
    controller.setItemsPerPages(25);
    $rootScope.$digest();
    expect($rootScope.currentPage).to.equal(0);
    expect($rootScope.offset).to.equal(0);
    expect($rootScope.pageLimit).to.equal(25);
  });

  it('Prevents that the page limit is not higher than the total', function() {
    controller.total = 50;
    controller.setItemsPerPages(100);
    $rootScope.$digest();
    expect($rootScope.pageLimit).to.equal(50);
  });

  it('Increases currentPage with 1 when the next page button is clicked', function() {
    expect(controller.currentPage).to.equal(0);
    controller.nextPage();
    $rootScope.$digest();
    expect($rootScope.currentPage).to.equal(1);
    expect($rootScope.offset).to.equal(controller.currentPage * controller.pageLimit);
  });

  it('Decreases currentPage with 1 when previous page button is clicked', function() {
    controller.currentPage = 10;
    controller.previousPage();
    $rootScope.$digest();
    expect($rootScope.currentPage).to.equal(9);
    expect($rootScope.offset).to.equal(controller.currentPage * controller.pageLimit);
  });

  it('Invokes the callback when pagination changes', function() {
    controller.previousPage();
    expect($rootScope.callback.called).to.be.true;

    $rootScope.callback.reset();
    expect($rootScope.callback.called).to.be.false;
    controller.nextPage();
    expect($rootScope.callback.called).to.be.true;

    $rootScope.callback.reset();
    expect($rootScope.callback.called).to.be.false;
    controller.setItemsPerPages(10);
    expect($rootScope.callback.called).to.be.true;
  });

  it('Returns the amount of pages for the current page limit', function() {
    controller.total = 50;
    controller.pageLimit = 10;
    var totalPages = controller.getTotalPages();
    expect(totalPages).to.equal(5);

    controller.total = 51;
    controller.pageLimit = 10;
    totalPages = controller.getTotalPages();
    expect(totalPages).to.equal(6);
  });

  it('Checks which page limit is currently active', function() {
    controller.pageLimit = 10;
    var isCurrentPageLimit = controller.isCurrentPageLimit(10);
    expect(isCurrentPageLimit).to.equal(true);

    isCurrentPageLimit = controller.isCurrentPageLimit(11);
    expect(isCurrentPageLimit).to.equal(false);
  });

});
