import { $$, browser } from 'protractor';

export class Angular2FullStackPage {
  navigateTo() {
    return browser.get('/');
  }

  getNavbarElement(n) {
    return $$('tk-root a').get(n).getText();
  }

  getNavbarButton() {
    return $$('tk-root button').get(0).getText();
  }

}
