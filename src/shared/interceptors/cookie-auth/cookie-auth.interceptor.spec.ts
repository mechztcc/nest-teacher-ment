import { CookieAuthInterceptor } from './cookie-auth.interceptor';

describe('CookieAuthInterceptor', () => {
  it('should be defined', () => {
    expect(new CookieAuthInterceptor()).toBeDefined();
  });
});
