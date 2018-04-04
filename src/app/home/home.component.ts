
    if(localStorage.getItem("cart")){
      this.productsCart =  JSON.parse (localStorage.getItem("cart"));
    }else{
      this.productsCart = [];
    }
  }

  addToCart(producto){
    this.productsCart.push(producto);
    localStorage.setItem("cart", JSON.parse(this.productsCart));
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

  value: any;
  productsCart: any = [];
  isClassVisible: false;
    if(localStorage.getItem("cart")){
      this.productsCart =  JSON.parse (localStorage.getItem("cart"));
    }else{
      this.productsCart = [];
    }
  }

  addToCart(producto){
    this.productsCart.push(producto);
    localStorage.setItem("cart", JSON.parse(this.productsCart));
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
