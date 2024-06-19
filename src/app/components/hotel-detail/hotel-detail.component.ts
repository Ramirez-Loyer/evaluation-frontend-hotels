import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/model/hotel.model';
import { Ville } from 'src/app/model/ville.model';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  myForm: FormGroup;
  hotel: Hotel;
  error: string = '';
  urlImg:string = '';
  selectedFile: File | null = null;
  selectedFileName: String = '';
  villes: Ville[];
  isUpdateAllowed: boolean = true;
  isAdmin: Boolean;
  imageUrl: string;
  status: any;

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: ApiService, 
    private router: Router, 
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { 
    const defaultVille = new Ville(0, '');
    this.hotel= new Hotel(0, '', '', '', 0, 0,0,'', true, defaultVille);

    this.villes = [];
    this.hotel.ville = defaultVille;
    this.urlImg = environment.host;
    this.isAdmin = false;

    this.myForm = this.formBuilder.group({
      id: [this.hotel.id],
      name: [this.hotel.name, Validators.required],
      phone: [this.hotel.phone, Validators.required],
      address: [this.hotel.address, [Validators.required, Validators.min(50), Validators.max(5000)]],
      starsNumber: [this.hotel.starsNumber, [Validators.required]],
      roomsNumber: [this.hotel.roomsNumber, [Validators.required]],
      price: [this.hotel.price, [Validators.required]],
      img: [this.hotel.img],
      active: [this.hotel.active, Validators.required],
      ville: [this.hotel.id === 0 ? null : this.hotel.ville, [Validators.required,]],
    });
    this.imageUrl = 'assets/img/bedroom2.jpg';
  }
  

  ngOnInit(): void {
    this.apiService.getVilles().subscribe({
      next: (data) => {
        this.villes = data;
      },
      error: (err) => (this.error = err),
    });

    let id = this.route.snapshot.params['id'];
    if (id > 0) {
      this.apiService.getHotel(id).subscribe({
        next: (data) => {
          this.hotel = data;

          this.myForm.setValue({
            id: this.hotel.id,
            name: this.hotel.name,
            phone: this.hotel.phone,
            address: this.hotel.address,
            starsNumber: this.hotel.starsNumber,
            roomNumber: this.hotel.roomsNumber,
            price: this.hotel.price,
            img: this.hotel.img,
            active: this.hotel.active,
            ville: this.hotel.ville
          });

          this.imageUrl = this.getHotelImageUrl();

          this.apiService.getVilles().subscribe({
            next: (data) => {
              (this.villes = data);
            },
            error: (err) => (this.error = err),
          });
        },
        error: (err) => (this.error = err),
      });
    } else {
      this.imageUrl = 'assets/img/bedroom2.jpg';
    }
    this.route.params.subscribe((params) => {
      let id = +params['id'];
      console.log(id);
      if (id != 0) {
        console.log('id : ' + id + ' loadhotel');
        this.loadHotel(id);
      } else if (id == 0) {
        console.log('reset form');
        this.resetForm();
      }
    });
  }

  loadHotel(id: number) {
    this.apiService.getHotel(id).subscribe((hotel) => {
      this.hotel = hotel;
      this.myForm.patchValue(this.hotel);
      this.refreshImageUrl();
    });
  }

  resetForm() {
    this.myForm.reset({
      id: 0, 
      name: '', 
      phone:'', 
      address: '',
      starsNumber: 0,
      roomsNumber: 0,
      price: 0,
      img:'', 
      active:true, 
      ville: null
    });

    this.imageUrl = 'assets/img/bedroom2.jpg';
 
  }

  /**
   * Navigates to the home page.
   */
  goHome() {
    this.router.navigateByUrl('hotels');
  }

  getHotelImageUrl(): string {
    return this.status
      ? `${this.urlImg}/download/${this.hotel.id}?${new Date().getTime()}`
      : 'assets/img/bedroom2.jpg';
  }

  refreshImageUrl(): void {
    this.imageUrl = this.getHotelImageUrl();
    this.cdr.detectChanges();
  }

  /**
   * Handles form submission.
   * If status is true, updates the training, otherwise adds a new training.
   * @param form FormGroup instance containing form data.
   */
  onSubmit(form: FormGroup) {
    if (this.status) {
      this.updateHotel(form);
    } else {
      this.onAddHotel(form);
    }
  }

  /**
   * Méthode appelée lorsqu'un fichier est sélectionné par l'utilisateur via un élément d'entrée de type fichier.
   * @param event L'événement déclenché lorsque l'utilisateur sélectionne un fichier.
   */
  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = event.target.files[0] as File;
    if (input.files) {
      this.selectedFileName = input.files[0].name;
    }
  }

  /**
   * Méthode de création d'une nouvelle formation avec une image par défaut.
   * @param form comprend le formulaire avec toutes les données saisies par l'utilisateur
   */
  onAddHotel(form: FormGroup) {
    console.log(this.selectedFile);
    if (form.valid) {
      if (this.selectedFile == null) {
        // Si aucun fichier n'est sélectionner.
        this.apiService
          .postHotel({
            id: form.value.id,
            name: form.value.name,
            phone: form.value.phone,
            adress: form.value.address,
            starsNumber: form.value.starsNumber,
            roomNumber: form.value.roomNumber, 
            price: form.value.price,
            img: form.value.img,
            active: form.value.active,
            Ville: form.value.ville,
          })
          .subscribe({
            next: (data) => console.log(data),
            error: (err) => (this.error = err.message),
            complete: () => this.router.navigateByUrl('hotels'),
          });
      } else {
        this.onAddHotelWithNewImg(form); // Si un fichier est sélectionner.
      }
    } else this.error = 'Veuillez saisir tous les champs';
  }

  /**
   * Méthode de création d'une nouvelle formation avec une image choisie.
   * @param form comprend le formulaire avec toutes les données saisies par l'utilisateur
   */
  onAddHotelWithNewImg(form: FormGroup) {
    const formData = new FormData();
    formData.append('file', this.selectedFile as File, this.selectedFile?.name);
    this.apiService.postImg(formData).subscribe(
      (response) => {
        this.apiService
          .postHotel({
            id: form.value.id,
            name: form.value.name,
            phone: form.value.phone,
            adress: form.value.address,
            starsNumber: form.value.starsNumber,
            roomNumber: form.value.roomNumber, 
            price: form.value.price,
            img: form.value.img,
            active: form.value.active,
            Ville: form.value.ville,
          })
          .subscribe({
            next: (data) => console.log(data),
            error: (err) => (this.error = err.message),
            complete: () => this.router.navigateByUrl('hotels'),
          });
      },
      (errror) => {
        console.error(errror);
      }
    );
  }

  /**
   * Méthode de mise à jour d'une nouvelle formation avec la même image.
   * @param form comprend le formulaire avec toutes les données saisies par l'utilisateur
   */
  updateHotel(form: FormGroup) {
    if (form.valid) {
      if (this.selectedFile == null) {
        // Si aucun fichier n'est sélectionner donc même image.
        this.apiService
          .postHotel({
            id: form.value.id,
            name: form.value.name,
            phone: form.value.phone,
            adress: form.value.address,
            starsNumber: form.value.starsNumber,
            roomNumber: form.value.roomNumber, 
            price: form.value.price,
            img: form.value.img,
            active: form.value.active,
            Ville: form.value.ville,
          })
          .subscribe({
            next: (data) => {
              console.log(data);
              this.refreshImageUrl();
            },
            error: (err) => (this.error = err.message),
            complete: () => this.router.navigateByUrl('hotels'),
          });
    } else this.error = 'Veuillez saisir tous les champs';
  }

  

  // deleteTraining(training: Training) {
  //   if (confirm('Êtes vous sur de vouloir supprimer cette formation ?')) {
  //     this.apiService.delTraining(training).subscribe({
  //       complete: () => this.router.navigateByUrl('trainings'),
  //     });
  //   }
  // }


  

  /*filterVilles(): void {
    if (this.hotel && this.hotel.ville) {
      this.villes = this.villes.filter(
        (ville) => ville.id !== this.hotel.ville.id
      );
    }
  }*/

  /*showNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        setTimeout(() => {
          notification.classList.remove('hide');
        }, 500);
      }, 2000);
    }*/
  }
}
