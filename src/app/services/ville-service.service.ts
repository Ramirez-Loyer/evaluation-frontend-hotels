import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VilleServiceService {

 /**
   * ID of the selected ville
   */
 private selectedIdVille: number;

 /**
  * Name of the selected ville
  */
 private selectedNameVille: string;

 /**
  * Constructor for VilleService.
  */
 constructor() {
   this.selectedIdVille = 0;
   this.selectedNameVille = 'Toutes';
 }

 /**
  * Get the ID of the selected ville
  * @returns ID of the selected ville
  */
 getSelectedIdVille(): number {
   return this.selectedIdVille;
 }

 /**
  * Get the name of the selected ville
  * @returns Name of the selected ville
  */
 getSelectedNameVille(): string {
   return this.selectedNameVille;
 }

 /**
  * Set the ID of the selected ville 
  * @param id ID of the villeto be set.
  */
 setSelectedIdVille(id: number) {
   this.selectedIdVille = id;
 }

 /**
  * Set the name of the selected ville
  * @param name Name of theville to be set.
  */
 setSelectedNameVille(name: string) {
   this.selectedNameVille = name;
 }

 /**
  * Clear the selected ville ID.
  */
 clearSelectedIdVille() {
   this.selectedIdVille = 0;
 }

 /**
  * Clear the selected ville name.
  */
 clearSelectedNameVille() {
   this.selectedNameVille = 'Toutes';
 }
}
