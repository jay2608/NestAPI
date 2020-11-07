export class Product {
  // Normal Way
  // id: string;
  // title: string;
  // description: string;
  // price: number;

  constructor(
    // TypeScript Way
    public id: string,
    public title: string,
    public description: string,
    public price: number,
  ) {
    // this.id = id;
    // this.title = title;
    // this.description = desc;
    // this.price = price;
  }
}
