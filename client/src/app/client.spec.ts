import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {ClientApp} from '../app/client';

beforeEachProviders(() => [ClientApp]);

describe('App: Client', () => {
  it('should have the `defaultMeaning` as 42', inject([ClientApp], (app: ClientApp) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([ClientApp], (app: ClientApp) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});

