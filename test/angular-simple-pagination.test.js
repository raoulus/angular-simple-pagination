/*jslint nomen: true */
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
      $rootScope.itemsPerPage = 10;
      $rootScope.totalItems = 50;
      element = $compile('<simple-pagination items-per-page="itemsPerPage" offset="offset" total-items="totalItems"></simple-pagination>')($rootScope);
      $rootScope.$digest();
      controller = element.controller('simplePagination');
    });
  });

  it('Sets offset and currentPage to 0 when itemsPerPages is updated', function() {
    controller.currentPage = 20;
    controller.offset = 10;
    controller.setItemsPerPages(25);
    $rootScope.$digest();
    expect(controller.currentPage).to.equal(0);
    expect($rootScope.offset).to.equal(0);
    expect($rootScope.itemsPerPage).to.equal(25);
  });

  it('Sets itemsPerPage to totalItems when value of setItemsPerPages is bigger than totalItems', function() {
    controller.totalItems = 50;
    controller.setItemsPerPages(100);
    $rootScope.$digest();
    expect($rootScope.itemsPerPage).to.equal(50);
  });

  it('Increases count of currentPage with 1 when nextPage is called', function() {
    expect(controller.currentPage).to.equal(0);
    controller.nextPage();
    $rootScope.$digest();
    expect(controller.currentPage).to.equal(1);
    expect($rootScope.offset).to.equal(controller.currentPage * controller.itemsPerPage);
  });

  it('Decreases count of currentPage with 1 when previousPage is called', function() {
    controller.currentPage = 10;
    controller.previousPage();
    $rootScope.$digest();
    expect(controller.currentPage).to.equal(9);
    expect($rootScope.offset).to.equal(controller.currentPage * controller.itemsPerPage);
  });

  it('Returns the total pages', function() {
    controller.totalItems = 50;
    controller.itemsPerPage = 10;
    var totalPages = controller.getTotalPages();
    expect(totalPages).to.equal(5);

    controller.totalItems = 51;
    controller.itemsPerPage = 10;
    totalPages = controller.getTotalPages();
    expect(totalPages).to.equal(6);
  });

  it('Checks if itemsPerPage is equal to a certain value', function() {
    controller.itemsPerPage = 10;
    var isActive = controller.isActive(10);
    expect(isActive).to.equal(true);

    isActive = controller.isActive(11);
    expect(isActive).to.equal(false);
  });

});
