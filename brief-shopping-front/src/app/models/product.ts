import { Category } from "./category";

export class Product {
    public id?: number;
    public name?: string;
    public description?: string;
    public price?: string;
    public category?: Category;
    public image?: string;

    constructor(name: string | undefined, description: string | undefined, category: Category | undefined){
      this.name = name;
      this.description = description;
      this.category = category;
    }
}