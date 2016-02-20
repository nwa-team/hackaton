import {
  it,
  iit,
  describe,
  ddescribe,
  expect,
  inject,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {ApiService} from './api-service';


describe('ApiService Service', () => {

  beforeEachProviders(() => [ApiService]);


  it('should ...', inject([ApiService], (service:ApiService) => {

  }));

});
