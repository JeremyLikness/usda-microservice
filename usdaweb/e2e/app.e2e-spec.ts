import { UsdawebPage } from './app.po';

describe('usdaweb App', function() {
  let page: UsdawebPage;

  beforeEach(() => {
    page = new UsdawebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('USDA Database');
  });
});
