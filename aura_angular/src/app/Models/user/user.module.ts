import { last } from "rxjs";

export class User {
  public id: number;
  public name: string;
  public lastname: string;
  public email: string;
  public location: string;
  public icon: string;
  public role: string;


  constructor(id: number, name: string, lastname: string, email: string, location: string, icon: string, role: string = 'user') {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.location = location;
    this.icon = icon;
    this.role = role;

  }

  //-------------Getters--------------------------
  public get Id(): number {
    return this.id;
  }
  public get Name(): string {
    return this.name;
  }
  public get Lastname(): string {
    return this.lastname;
  }
  public get Email(): string {
    return this.email;
  }
  public get Location(): string {
    return this.location;
  }
  public get Icon(): string {
    return this.icon;
  }
  public get Role(): string {
    return this.role;
  }

  //-------------SETTERS-------------------------------

  public set Id(id: number) {
    this.id = id;
  }

  public set Name(name: string) {
    this.name = name;
  }
  public set Lastname(lastname: string) {
    this.lastname = lastname;
  }
  public set Email(email: string) {
    this.email = email;
  }
  public set Location(location: string) {
    this.location    = location;
  }
  public set Icon(icon: string) {
    this.icon    = icon;
  }
  public set Role(role: string) {
    this.role = role;
  }
  //----------------------------------------------------

}
