import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ACCESS_TOKEN, DOMAIN } from './../../utils/configApp';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  token = localStorage.getItem(ACCESS_TOKEN);
  headers: any;
  constructor(
    private httpClient: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'authorization': this.token!,
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    });
  }

  getAllProduct(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'product-management/products?isProductActive=true', { headers: this.headers })
  }
  getAllProductIsSupplierInactive(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'product-management/products?isSupplierActive=true', { headers: this.headers })
  }
  getAllProductIsBrandInactive(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'product-management/products?isBrandActive=true', { headers: this.headers })
  }
  getAllProductIsActiveSubstanceInactive(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'product-management/products?isActiveActiveSubstance=true', { headers: this.headers })
  }

  getProductById(id : number):Observable<any> {
    return this.httpClient.get(DOMAIN + `product-management/products/${id}`, { headers: this.headers })
  }
  ActiveProduct(id : number):Observable<any> {
    return this.httpClient.patch(DOMAIN + `product-management/products/${id}`,{}, { headers: this.headers })
  }

  updateInfoProduct(id : number,data: FormData):Observable<any> {
    return this.httpClient.put(DOMAIN + `product-management/products/${id}`,data, { headers: this.headers })
  }

  //activesubstance

  getAllActiveSubstance(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'active-substance-management/active-substances', { headers: this.headers })
  }
  getAllActiveSubstanceActive(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'active-substance-management/active-substances-active', { headers: this.headers })
  }

  getActiveSubstanceById(id: number): Observable<any>{
    return this.httpClient.get(DOMAIN + `active-substance-management/active-substances/${id}/products`, {headers: this.headers})
  }
  getNameActiveSubstanceById(id: number): Observable<any>{
    return this.httpClient.get(DOMAIN + `active-substance-management/active-substances/${id}`, {headers: this.headers})
  }
  addActiveSubstance(data: any): Observable<any>{
    return this.httpClient.post(DOMAIN + `product-management/products/active-substance`,data, {headers: this.headers})
  }

  createActiveSubstance(name: FormData): Observable<any> {
    return this.httpClient.post(DOMAIN + 'active-substance-management/active-substances', name, { headers: this.headers })
  }
  deleteActiveSubstance(id: number): Observable<any> {
    return this.httpClient.patch(DOMAIN + `active-substance-management/active-substances/${id}`, {}, { headers: this.headers })
  }

  deleteActiveSubstanceInProduct(data: FormData): Observable<any> {
    return this.httpClient.delete(DOMAIN + `product-management/products/active-substance`, { headers: this.headers , body: data})
  }

  updateAS(id: number,AS: FormData): Observable<any> {
    return this.httpClient.put(DOMAIN + `active-substance-management/active-substances/${id}`, AS, { headers: this.headers })
  }
  deleteProductUnit(id: number): Observable<any> {
    return this.httpClient.delete(DOMAIN + `product-units-management/products-units/${id}`, { headers: this.headers})
  }
  addProductUnit(data: any): Observable<any> {
    return this.httpClient.post(DOMAIN + `product-units-management/product-units` , [data] ,{ headers: this.headers})
  }

  //product

  getAllCategory(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'shelves-management/shelves', { headers: this.headers })
  }
  createCategory(name: FormData): Observable<any> {
    return this.httpClient.post(DOMAIN + 'shelves-management/shelves', name, { headers: this.headers })
  }
  deleteCategory(id: number): Observable<any> {
    return this.httpClient.patch(DOMAIN + `shelves-management/shelves/${id}`,{}, { headers: this.headers })
  }
  createProduct (product: any): Observable<any> {
    return this.httpClient.post(DOMAIN + 'product-management/products', product, { headers: this.headers })
  }

  //Shelf
  getAllShelf(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'shelves-management/shelves', { headers: this.headers })
  }
  getAllShelfActive(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'shelves-management/shelves-active', { headers: this.headers })
  }

  getShelfById(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `shelves-management/shelves/${id}/products`, { headers: this.headers })
  }
  getNameShelfById(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `shelves-management/shelves/${id}`, { headers: this.headers })
  }
  updateShelf(id: number, name: FormData): Observable<any> {
    return this.httpClient.put(DOMAIN + `shelves-management/shelves/${id}`,name, { headers: this.headers })
  }

  getROA(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'product-management/route-of-administrations', { headers: this.headers })
  }

  // getStockStrengthUnit(): Observable<any> {
  //   return this.httpClient.get(DOMAIN + 'product-management/stock-strength-units', { headers: this.headers })
  // }

  //Batch
  getProductByIdBatch(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/batches/${id}`, { headers: this.headers })
  }

}
