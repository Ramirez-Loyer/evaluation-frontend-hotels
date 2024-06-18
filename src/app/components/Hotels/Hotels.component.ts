import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/model/hotel.model';
import { Ville } from 'src/app/model/ville.model';
import { ApiService } from 'src/app/services/api.service';
import { VilleServiceService } from 'src/app/services/ville-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
 listHotels : Hotel[] | undefined;
 listVilles : Ville[] | undefined;
 listFiltredHotels: Hotel[] | undefined;
 idVilleSelected: number | undefined;
 nameVilleSelected: string = '';
 error = null;
 urlImg: String = '';
 keyword: string = '';
   
 constructor(
  private router: Router, private apiService: ApiService, private VilleServiceService: VilleServiceService
 ) { }

  ngOnInit(): void {
    this.idVilleSelected = this.VilleServiceService.getSelectedIdVille();
    this.nameVilleSelected = this.VilleServiceService.getSelectedNameVille();
    if (this.idVilleSelected == 0) {
      this.getAllHotels();
    } else {
      this.displayHotelsByVille(
        this.idVilleSelected,
        this.nameVilleSelected
      );
    }
    /*this.getAllVilles();
    this.urlImg = environment.host;
    this.searchService.searchKeyword$.subscribe((kw) => {
      this.keyword = kw;
      this.filterHotels();
    }
    )*/;
  }

    /**
   * Filter hotels based on the keyword.
   */
  filterHotels() {
    if (this.keyword === '') {
      this.listHotels = this.listFiltredHotels; //
    } else {
      this.listHotels = this.listFiltredHotels?.filter((hotel) =>
        hotel.name.toLowerCase().includes(this.keyword)
      );
    }
  }

  
  /**
   * Méthode qui renvoi à partir de l'Api toutes les hotels accessibles
   * en cas de problème avec l'api, un message d'erreur sera relayé et affiché
   */
  getAllVilles() {
    this.apiService.getVilles().subscribe({
      next: (data) => (this.listVilles = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
  /**
   * Méthode qui renvoi à partir de l'Api toutes les hotels accessibles
   * en cas de problème avec l'api, un message d'erreur sera relayé et affiché
   */
  getAllHotels() {
    this.apiService.getHotels().subscribe({
      next: (data) => (
        (this.listHotels = data), (this.listFiltredHotels = data)
      ),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
    this.VilleServiceService.clearSelectedIdVille();
    this.VilleServiceService.clearSelectedNameVille();
    this.nameVilleSelected = "Toutes";
  }

  /**
   * Méthode permettant uniquement à l'Admin de supprimer un hotel de l'ensemble des hotels
   * Une fois l'hotel supprimé dans l'api, la liste des hotels est raffraichie
   * @param hotel
   */
  onDeleteHotel(hotel: Hotel) {
    if (confirm('Vous êtes sur de vouloir supprimer cet hôtel ?')) {
      this.apiService.delHotel(hotel).subscribe({
        next: (data) => console.log(data),
        error: (err) => (this.error = err.message),
        complete: () => this.getAllHotels(),
      });
    }
  }

  /**
   * Méthode permettant uniquement à l'Admin de mettre à jour un hotel de l'ensemble des hotels
   * En renvoyant ici vers le composant dédié à la mise à jour
   * @param hotel
   */
  onUpdateHotel(event: Event, hotel: Hotel) {
    event.preventDefault();
    this.router.navigateByUrl('hotelDetail/' + hotel.id);
  }

  /**
   * Display hotels by ville
   * @param id ID of the ville
   * @param name Name of the ville
   */
  displayHotelsByVille(id: number, name: string) {
    this.apiService.getHotelsByVille(id).subscribe({
      next: (data) => (this.listHotels = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
    this.VilleServiceService.setSelectedIdVille(id);
    this.VilleServiceService.setSelectedNameVille(name);
    this.nameVilleSelected = name;
  }

}

