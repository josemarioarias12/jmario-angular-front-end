import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  protected source!: string;
  protected http = inject(HttpClient);

  public find(id: string | number): Observable<IResponse<T>> {
    return this.http.get<IResponse<T>>(`${this.source}/${id}`);
  }

  // ✅ PUT /{source}/{id}?params
  public customEditWithParams(
    item: T & { id: number },
    params: any = {}
  ): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(
      `${this.source}/${item.id}`,
      item,
      { params: this.buildUrlParams(params) }
    );
  }

  public findAll(): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(this.source);
  }

  public findAllWithParams(params: any = {}): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(this.source, {
      params: this.buildUrlParams(params),
    });
  }

  public findAllWithParamsAndCustomSource(
    customUrlSource: string,
    params: any = {}
  ): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(
      `${this.source}/${customUrlSource}`,
      { params: this.buildUrlParams(params) }
    );
  }

  public add(data: {}): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(this.source, data);
  }

  // ✅ POST /{source}?params — mantiene el orden (params, data)
  public addWithParams(params: any = {}, data: {}): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(this.source, data, {
      params: this.buildUrlParams(params),
    });
  }

  public addCustomSource(
    customUrlSource: string,
    data: {}
  ): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(`${this.source}/${customUrlSource}`, data);
  }

  public edit(id: number | undefined, data: {}): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(`${this.source}/${id}`, data);
  }

  public customEdit(data: {}): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(this.source, data);
  }

  public editCustomSource(
    customUrlSource: string,
    data: {}
  ): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(
      `${this.source}${customUrlSource ? '/' + customUrlSource : ''}`,
      data
    );
  }

  public del(id: any): Observable<IResponse<T>> {
    return this.http.delete<IResponse<T>>(`${this.source}/${id}`);
  }

  public delCustomSource(customUrlSource: string): Observable<IResponse<T>> {
    return this.http.delete<IResponse<T>>(`${this.source}/${customUrlSource}`);
  }

  // ✅ Limpieza mejorada: ignora undefined/null
  public buildUrlParams(params: any = {}) {
    let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== null) {
        queryParams = queryParams.append(key, String(value));
      }
    });
    return queryParams;
  }
}
