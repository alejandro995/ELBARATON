import { Injectable } from "@angular/core";
import { TreeviewItem, TreeItem } from "ngx-treeview";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { element } from "protractor";

@Injectable()
export class BookServiceService {
  categoriesData = "../assets/data/categories.json";
  productsData = "../assets/data/products.json";
  nodeArray: TreeviewItem[] = [];

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(this.categoriesData).map((data: any) => {
      return data.categories;
    });
  }

  getProducts() {
    return this.http.get(this.productsData);
  }

  arrayMethod(): any[] {
    const array: any[] = [];
    array.push({
      name: "asdasd",
      value: 10,
      collapsed: false
    });
    return array;
  }

  getNode(): TreeviewItem[] {
    this.getCategories().subscribe(categories => {
      categories.forEach((category: any) => {
        this.nodeArray.push(
          new TreeviewItem({
            text: category.name,
            value: category.id,
            children: this.sublevel(category, [])
          })
        );
      });
    });
    return this.nodeArray;
  }

  sublevel(category: any, children: any[]): any[] {
    if (category.sublevels) {
      category.sublevels.forEach((sublevel: any) => {
        if (!sublevel.sublevels) {
          children.push({
            text: sublevel.name,
            value: sublevel.id
          });
        } else {
          children.push({
            text: sublevel.name,
            value: sublevel.id,
            children: this.sublevel(sublevel.sublevels, children)
          });
        }
      });
      return children;
    } else {
      const childrenFinal: any[] = [];
      category.forEach((sublevel: any) => {
        if (!sublevel.sublevels) {
          childrenFinal.push({
            text: sublevel.name,
            value: sublevel.id
          });
        } else {
          childrenFinal.push({
            text: sublevel.name,
            value: sublevel.id,
            children: this.sublevel(sublevel.sublevels, childrenFinal)
          });
        }
      });
      return childrenFinal;
    }
  }
}
