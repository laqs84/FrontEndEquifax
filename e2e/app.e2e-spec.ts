import { Angular4TokenAuthPage } from './app.po';

describe('angular4-token-auth App', () => {
  let page: Angular4TokenAuthPage;

  beforeEach(() => {
    page = new Angular4TokenAuthPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
