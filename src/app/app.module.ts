import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  TreeviewModule,
  DropdownTreeviewComponent,
  TreeviewConfig,
  TreeviewI18nDefault,
  TreeviewI18n,
  DefaultTreeviewEventParser,
  TreeviewEventParser
} from 'ngx-treeview';
import { HttpModule } from '@angular/http';
import { BookServiceService } from './book-service.service';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductsPipe } from './products.pipe';
import { TreeModule } from 'angular-tree-component';
import { SelectTreeViewComponent } from './select-tree-view/select-tree-view.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsPipe,
    SelectTreeViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,
    TreeModule,
    OrderModule,
    TreeviewModule.forRoot(),
    FormsModule,
    Ng2SearchPipeModule,
    ModalModule.forRoot()
  ],
  providers: [ BookServiceService,
    TreeviewConfig,
    { provide: TreeviewI18n, useClass: TreeviewI18nDefault },
    { provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser }
  ],
  exports: [
    SelectTreeViewComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }
