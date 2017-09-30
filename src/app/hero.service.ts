import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

// import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
  private heroesUrl = 'http://localhost:8000/api/heroes'; // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    // return Promise.resolve(HEROES);
    return this.http.get(this.heroesUrl)
            .toPromise()
            .then(heroes => heroes.json().data as Hero[])
            .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    // return this.getHeroes()
    //         .then(heroes => heroes.find(hero => hero.id === id));
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
            .toPromise()
            .then(hero => hero.json().data as Hero)
            .catch(this.handleError);
  }

  createHero(name: string): Promise<Hero> {
    return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(hero => hero.json().data as Hero)
      .catch(this.handleError);
  }

  updateHero(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.patch(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
  }

  deleteHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
  }

  // CRITICAL STEP - HTTP failures must be anticipated and handled
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
