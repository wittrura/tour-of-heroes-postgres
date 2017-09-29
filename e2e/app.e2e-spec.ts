import { AngularTourOfHeroesPostgresPage } from './app.po';

describe('angular-tour-of-heroes-postgres App', () => {
  let page: AngularTourOfHeroesPostgresPage;

  beforeEach(() => {
    page = new AngularTourOfHeroesPostgresPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
