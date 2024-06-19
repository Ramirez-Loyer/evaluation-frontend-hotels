import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() 
  hotel: Hotel | undefined;
  urlImage: String="";
  validateBtnFile: boolean = false;
  fileInput: boolean = false;
  selectedFile: File | null = null; 

   constructor(private router : Router, private apiService : ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.urlImage = environment.host + '/download/' + this.hotel?.id + new Date().getTime();
  }

    /**
   * Méthode permettant uniquement à l'Admin de mettre à jour un hotel de l'ensemble des formations
   * En renvoyant ici vers le composant dédié à la mise à jour
   * @param hotel
   */
  
    onUpdateHotel(hotel: Hotel) {
      this.router.navigateByUrl('hotelDetail/' + hotel.id);
    }

    onFileSelected(event:any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Fichier sélectionné:', file);
      this.validateBtnFile = true;
      this.selectedFile = event.target.files[0] as File;
     }
    }
    updateImg(id: number) {
    if(this.hotel) {}
    const formData = new FormData();
    formData.append('file', this.selectedFile as File, this.selectedFile?.name);
    this.apiService.updateImgTraining(formData, id).subscribe((response) => {
      if(this.hotel) {
        this.urlImage = environment.host + '/download/' + this.hotel?.id + '?' + new Date().getTime();
        this.cdr.detectChanges();
        this.validateBtnFile = false;
        this.fileInput = false;
      }
    })
  }
}
