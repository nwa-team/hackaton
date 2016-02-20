export class ClientPage {
  navigateTo() { return browser.get('/'); }
  getParagraphText() { return element(by.css('Client-app p')).getText(); }
}
