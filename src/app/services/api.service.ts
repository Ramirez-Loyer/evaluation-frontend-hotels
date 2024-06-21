import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hotel } from '../model/hotel.model';
import { Ville } from '../model/ville.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  /**
   * Constructor for ApiService.
   * @param http HttpClient instance.
   */
  constructor(private http: HttpClient) {}


   /****************HOTELS*****************/
    /**
   * Get all hotels
   * @returns Observable with array of Hotel objects.
   */
    public getHotels() {
      return this.http.get<Hotel[]>(environment.host + '/hotels');
    }

      /**
   * Get a hotel by ID.
   * @param id Hotel ID.
   * @returns Observable with Hotel object.
   */
  public getHotel(id: number) {
    return this.http.get<Hotel>(environment.host + '/hotel/' + id);
  }

   /**
   * Add a new hotel
   * @param training Hotel object.
   * @returns Observable with Hotel object.
   */
   public postHotel(hotel: any) {
    return this.http.post<Hotel>(environment.host + '/hotels', hotel);
  }

  /**
   * Delete a hotel
   * @param hotel Hotel object to be deleted.
   * @returns Observable with no return type.
   */
  public delHotel(hotel: Hotel) {
    return this.http.delete(environment.host + '/hotels/' + hotel.id);
  }

  /**
   * Update a hotel
   * @param hotel Hotel object.
   * @returns Observable with Hotel object.
   */
  public putHotel(hotel: any) {
    return this.http.put<Hotel>(
      environment.host + '/hotels/' + hotel.id, hotel );
  }

  /****************VILLES*****************/
  /**
   * Get villes
   * @returns Observable with array of Villes objects.
   */
 public getVilles() {
    return this.http.get<Ville[]>(environment.host + '/villes');
  }

  /**
   * Get hotels by ville ID.
   * @param id Ville ID.
   * @returns Observable with array of Hotel objects.
   */
  public getHotelsByVille(id: number) {
    return this.http.get<Hotel[]>(
      environment.host + '/hotels/ville/' + id
    );
  }


   /****************IMAGES*****************/
  /**
   * Get an image by ID.
   * @param id Image ID.
   * @returns Observable with any type.
   */
  public getImg(id: number) {
    return this.http.get<any>(environment.host + '/download/' + id);
  }

  /**
   * Add a new image.
   * @param formData FormData object.
   * @returns Observable with any type.
   */
  public postImg(formData: FormData) {
    return this.http.post<any>(environment.host + '/download', formData);
  }

  /**
   * Update training image.
   * @param formData FormData object.
   * @param id Training ID.
   * @returns Observable with any type.
   */
  public updateImgTraining(formData: FormData, id: number) {
    return this.http.post<any>(environment.host + '/download/' + id, formData);
  }

}
