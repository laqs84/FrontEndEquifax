import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


import { routing }        from './app.routing';
import { AppComponent } from './app.component';
import { ListitemComponent } from './item/listitem/listitem.component';
import { DetailitemComponent } from "./item/detailitem/DetailitemComponent";
import { LoginComponent } from './login/login.component';
import { AutofocusDirective} from './directive/autofocus.directive';
import { AuthguardService }  from './service/authguard.service';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar.component';
import { FooterComponent } from './footer.component';
import { ChartsModule } from 'ng2-charts';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CargarexcelComponent } from './cargarexcel/cargarexcel.component';
import { AdminComponent } from './admin/admin.component';
import { AmazingTimePickerService, AmazingTimePickerModule } from 'amazing-time-picker';
import { CargarcedulasComponent } from './cargarcedulas/cargarcedulas.component';
import { FirmaloginComponent } from './firmalogin/firmalogin.component';
import { AutorizacionesComponent } from './autorizaciones/autorizaciones.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReporteLotesComponent } from './reporte-lotes/reporte-lotes.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import {Dounat3D} from 'animated-3d-piechart';


import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';

// Load FusionCharts Individual Charts
import * as Charts from 'fusioncharts/fusioncharts.charts';




// Use fcRoot function to inject FusionCharts library, and the modules you want to use
FusionChartsModule.fcRoot(FusionCharts, Charts)




//import { EnsureAuthenticated } from './ensure-authenticated.service';

@NgModule({
  declarations: [
    AppComponent,
    ListitemComponent,
    DetailitemComponent,
    LoginComponent,
    AutofocusDirective,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CatalogoComponent,
    CargarexcelComponent,
    AdminComponent,
    CargarcedulasComponent,
    FirmaloginComponent,
    AutorizacionesComponent,
    UsuariosComponent,
    ReporteLotesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,                             
    ReactiveFormsModule ,
    routing,
    ChartsModule,
    Ng2TableModule,
    AmazingTimePickerModule,
    NgxSmartModalModule.forRoot(),
    FusionChartsModule,
    BrowserAnimationsModule
    
  ],
  providers: [AuthguardService, AmazingTimePickerService],//, EnsureAuthenticated],
  bootstrap: [AppComponent]
})
export class AppModule { }
