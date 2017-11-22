import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { FeathersBatch } from 'models/batch';
import { feathersCore } from './feathers.core';

@Injectable()
export class FeathersService<T> implements Resolve<Observable<T>> {
  private _socket: any;
  private _app: any;

  // Observable.defer calls the function we pass (in this case this.find) every time someone subscribes
  private _items: Observable<T[]>;

  // replay subject that holds on to the cached item
  private itemCacheSubject = new ReplaySubject<T[]>();

  constructor(private serviceName: string) {
    this._socket = feathersCore.socket;

    this._app = feathersCore.app;

    this._items = Observable.defer(() => {
      return this.find({}); // Find all items on first subscribe
    }).map(value => {
      if (value.data) {
        return value.data; // Value is a batch: Map to the data
      } else {
        return value; // Value is the data: Return the data
      }
    }).multicast(this.itemCacheSubject) // Multicast so all subscribers get the result of the same server call
      .refCount(); // use refcount so the observable calls the server on the first subscribe

  }

  // FEATHERS STUFF

  // private handleError(operation: string) {
  //   return error => {
  //     console.error(this.serviceName + '.' + operation, error);
  //   };
  // }

  /// Shortcut for accessing items
  get items() {
    return this._items;
  }

  /// GET /messages
  find(query?: any): Observable<FeathersBatch<T>> {
    return this.service.find({ query });
  }

  /// GET /messages and choose a random item
  random(query?: any): Observable<T> {
    query.$random = 1;
    return this.find(query).map(values => {
      return values[0]; // find with random returns an array, we just want the first item
    });
  }

  /// GET /messages/<id>
  get(id: any, params?: any): Observable<T> {
    return this.service.get(id, params);
  }

  /// POST /messages
  create(data: T | any, params?: any): Observable<T> {
    return this.service.create(data, params);
  }

  /// PUT /messages[/<id>]
  update(id: any, data: T | any, params?: any): Observable<T> {
    return this.service.update(id, data, params);
  }

  /// PATCH /messages[/<id>]
  patch(id: any, data: T | any, params?: any): Observable<T> {
    return this.service.patch(id, data, params);
  }

  /// DELETE /messages[/<id>]
  remove(id: any, params?: any) {
    return this.service.remove(id, params);
  }

  /// get a feathers service object
  getService(name: string) {
    return this.app.service(name);
  }

  protected get service() {
    return this.getService(this.serviceName);
  }

  // Resolve:

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.params['id'];

    return Promise.resolve(this.get(id));
  }

    /// get the shared feathers app
  protected get app() {
    return this._app;
  }

  protected get socket() {
    return this._socket;
  }

  protected get user() {
    return this.app.get('user');
  }

    /// checks if value from this.app.get() is not undefined
  protected exists(key: string): boolean {
    let value = this.app.get(key);
    if (value === undefined) {
      return false;
    } else {
      return true;
    }
  }

}
