import {
  Component,
  OnInit,
  Pipe,
  Injectable,
  getPlatform
} from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import {
  TreeviewModule,
  TreeviewItem,
  DropdownTreeviewComponent,
  TreeviewConfig,
  TreeviewI18nDefault,
  TreeviewI18n,
  DownlineTreeviewItem,
  DefaultTreeviewEventParser,
  TreeviewEventParser
} from "ngx-treeview";
import { BookServiceService } from "../book-service.service";
import { BrowserModule } from "@angular/platform-browser";
import * as _ from "lodash";
import swal from "sweetalert2";

@Injectable()
export class ProductTreeviewConfig extends TreeviewConfig {
  hasAllCheckBox = true;
  hasFilter = true;
  hasCollapseExpand = true;
  maxHeight = 600;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [BookServiceService]
})
export class HomeComponent implements OnInit {
  options = {};
  array = {};
  items: TreeviewItem[];
  allProducts: any = [];
  currentItems: any = [];
  rows: string[];
  value = 11;
  order: string = 'info.name';
  reverse: boolean = false;
  filterBy = [
    {
      key: "price",
      reverse: false,
      value: "Precio &uarr;"
    },
    {
      key: "price",
      reverse: true,      
      value: "Precio &darr;"
    },
    {
      key: "available",
      reverse: false,
      value: "Disponibilidad &uarr;"
    },
    {
      key: "available",
      reverse: true,            
      value: "Disponibilidad &darr;"
    },
    {
      key: "quantity",
      reverse: false,      
      value: "Cantidad &uarr;"
    },
    {
      key: "quantity",
      reverse: true,                  
      value: "Cantidad &darr;"
    }
  ];
  productsCart: any = [];
  cartIsShowing = false;
  constructor(private route: Router, private service: BookServiceService) {}
  isClassVisible: false;

  async onValueChange(value: number) {
    console.log("ithappened");
    this.cartIsShowing = false;
    const selectedProducts: any[] = [];
    console.log("VALUE:" + value);
    await this.getProducts(value);

    if (this.allProducts.products) {
      this.allProducts.products.forEach(element => {
        if (element.sublevel_id == value) {
          selectedProducts.push(element);
          console.log("adding" + element);
        }
      });
    }
    console.log("productos seleccionados");
    console.log(selectedProducts);
    this.currentItems.products = selectedProducts;
    console.log("valueChange raised with value: " + value);
  }

  ngOnInit() {
    this.items = this.service.getNode();
    console.log("items");
    console.log(this.items);

    this.getCartData();
  }

  onItemChange(element) {
    console.log(element);
    this.filterBy.forEach(filterType => {
      if(filterType.value==element){
        this.order=filterType.key;
        this.reverse=filterType.reverse
      console.log(this.order+":"+this.reverse);          
      }
    });
  }

  getProducts(value) {
    this.service.getProducts().subscribe(data => {
      this.allProducts = data;
      this.allProducts.products.forEach(element => {
        element.price= <number>(element.price.slice(1));
      });
      if (!value) {
        this.currentItems = data;
      }
      console.log("allProduts constructor");
      console.log(this.allProducts);
      console.log("selected constructor");
      console.log(this.currentItems);
    });
  }

  getCartData() {
    if (localStorage.getItem("cart")) {
      this.productsCart = JSON.parse(localStorage.getItem("cart"));
    } else {
      this.productsCart = [];
    }
  }

  addToCart(producto) {
    swal({
      title: "¿Cuantos deseas comprar?",
      input: "number",
      showCancelButton: false,
      confirmButtonText: "Ok!"
    }).then(result => {
      if (result.value) {
        console.log(this.productsCart.lenght);
        var exist = false;
        this.productsCart.forEach(item => {
          console.log(item.id + "," + producto.id);
          if (item.id == producto.id) {
            exist = true;
            this.changeQuantity(producto.id, result.value);
          }
        });
        if (!exist) {
          var productToAdd = _.clone(producto);
          productToAdd.quantity = result.value;
          this.productsCart.push(productToAdd);
          localStorage.setItem("cart", JSON.stringify(this.productsCart));
        }
      }
    });
  }

  showCartItems() {
    this.cartIsShowing = true;
    console.log(JSON.parse(localStorage.getItem("cart")));
    this.currentItems.products = JSON.parse(localStorage.getItem("cart"));
  }

  removeFromCart(productId) {
    console.log(this.productsCart.lenght);
    this.productsCart.forEach((element, i) => {
      if (this.productsCart[i].id == productId) {
        console.log(this.productsCart[i].id + ",," + productId);
        this.productsCart.splice(i, 1);
      }
    });
    console.log(this.productsCart);
    localStorage.setItem("cart", JSON.stringify(this.productsCart));
    this.currentItems.products = JSON.parse(localStorage.getItem("cart"));
  }

  changeQuantity(productId, newValue) {
    this.productsCart.forEach((element, i) => {
      if (this.productsCart[i].id == productId) {
        console.log(this.productsCart[i].id + ",," + productId);
        this.productsCart[i].quantity = (+this.productsCart[i].quantity) + (+newValue);
      }
    });
    localStorage.setItem("cart", JSON.stringify(this.productsCart));
  }

}