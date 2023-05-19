export class StorageFileModule {
  #name: string;
  #size: number;
  #path: string;
  #uploadDate: Date;
  #uploadedBy: string;

  constructor(
    name: string = '',
    size: number = 0,
    path: string = '',
    uploadDate: Date = new Date(),
    uploadedBy: string = '',

  ){
    this.#name = name;
    this.#size = size;
    this.#path = path;
    this.#uploadDate = uploadDate;
    this.#uploadedBy = uploadedBy;

  }

  //Get name.
  get name():string{
    return this.#name;
  }

  //Get size.
  get size():number{
    return this.#size
  }

  //Get path.
  get path(): string{
    return this.#path;
  }

  //Get uploadDate.
  get uploadDate(): Date{
    return this.#uploadDate;
  }

  //Get uploadedBy.
  get uploadedBy():string{
    return this.#uploadedBy;
  }

  //-----------------------------------------------------------------------------------------setters--------------------------------------------------------------------------------

  //set name
  set name(name: string) {
    this.#name = name;
  }

  //set size
  set size(size: number){
    this.#size = size;
  }

  //set path
  set path(path: string){
    this.#path = path;
  }

  //set uploadDate
  set uploadDate(uploadDate: Date) {
    this.#uploadDate = uploadDate;
  }
  //set uploadedBy
  set uploadedBy(uploadedBy: string) {
    this.#uploadedBy = uploadedBy;
  }
}
