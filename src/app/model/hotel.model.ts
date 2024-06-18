import { Ville } from "./ville.model";

export class Hotel {
    id: number;
    name: string;
    phone : string;
    address : string;
    starsNumber : number;
    roomsNumber : number;
    price : number; 
    img : string;
    active: boolean;
    ville : Ville;

    constructor(
        id: number,
        name: string,
        phone : string,
        address : string,
        starsNumber : number,
        roomsNumber : number,
        price : number,
        img : string,
        active: boolean,
        ville : Ville
    ) {
        this.id = id; 
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.starsNumber = starsNumber;
        this.roomsNumber = roomsNumber;
        this.price = price;
        this.img = img;
        this.active = active;
        this.ville = ville;
    }
}