export class Product {
  id: number;
  title: string;
  img: string;
  price: number;
  description: string;
  category: string;
  lat: number;
  lng: number;
  user_id: number;

  constructor(id: number, title: string, img: string, price: number, description: string, category: string, lat: number, lng: number, user_id: number) {
    this.id = id;
    this.title = title;
    this.img = img;
    this.price = price;
    this.description = description;
    this.category = category;
    this.lat = lat;
    this.lng = lng;
    this.user_id = user_id;
  }

  // ----------- Getters -----------
  get get_id() {
    return this.id;
  }

  get get_title() {
    return this.title;
  }

  get get_img() {
    return this.img;
  }

  get get_price() {
    return this.price;
  }

  get get_description() {
    return this.description;
  }

  get get_category() {
    return this.category;
  }

  get get_lat() {
    return this.lat;
  }

  get get_lng() {
    return this.lng;
  }

  get get_user_id() {
    return this.user_id;
  }
  
  // ----------- Getters -----------
  set set_id(id: number){
    this.id = id;
  }

  set set_title(title: string){
    this.title = title;
  }

  set set_img(img: string){
    this.img = img;
  }

  set set_price(price: number){
    this.price = price;
  }

  set set_description(description: string){
    this.description = description;
  }

  set set_category(category: string){
    this.category = category;
  }

  set set_lar(lat: number){
    this.lat = lat;
  }

  set set_lng(lng: number){
    this.lng = lng;
  }

  set set_user_id(user_id: number){
    this.user_id = user_id;
  }

  // getProduct(){
  //   return {
  //     id: this.id,
  //     title: this.title,
  //     img: this.img,
  //     price: this.price,
  //     description: this.description,
  //     category: this.category,
  //     // user_id: this.us
  //   }
  // }
}
