import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Item } from '../../interfaces/item';

import { DatePipe } from '@angular/common';

import date from 'date-and-time';

declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-listitem',
  templateUrl: './listitem.component.html',
  styleUrls: ['./listitem.component.css'],
  providers: [DataService, DatePipe]
})



export class ListitemComponent implements OnInit {
      
  arrayBuffer:any;
  file:File;
      public deteneralert:boolean = false;
      public iniciaralert:boolean = false;
      public listitem;
      public datosfechas;
      today = Date.now();
      width = 480;
      height = 480;
      type = 'pie3d';
      dataFormat = 'json';
      dataSource : any = {
        "chart": {
          "caption": "",
          "subcaption": "",
          "showvalues": "1",
          "showpercentintooltip": "0",
          "numberprefix": "",
          "enablemultislicing": "1",
          "showLegend": "1",
          "interactiveLegend": "1",
          "theme": "gammel"
        },
        "events": {

            "noDataToDisplay": function (eventObj) {
              debugger;
            console.log('No hay datos');
        }
    },
        "data": [
          {
            "label": "Autorizadas",
            "value": "0",
            "color": "#468D55"
          },
          {
            "label": "En Proceso",
            "value": "0",
            "color": "#0280A8"
          },
          {
            "label": "Error",
            "value": "0",
            "color": "#AE0433"
          }
          ,
          {
            "label": "Ya existente",
            "value": "0",
            "color": "#ffec05"
          }
        ]
      }

      

      dataSource2 : any = {
        "chart": {
          "caption": "",
          "subcaption": "",
          "showvalues": "1",
          "showpercentintooltip": "0",
          "numberprefix": "",
          "enablemultislicing": "1",
          "showLegend": "1",
          "interactiveLegend": "0",
          "theme": "gammel"
        },
        "events": {

            "noDataToDisplay": function (eventObj) {
            
        }
    },
        "data": [
          {
            "label": "En Proceso",
            "value": "0",
            "color": "#0280A8"
          },
          {
            "label": "Terminadas",
            "value": "0",
            "color": "#468D55"
          }
        ]
      };
  
     
    irautorizaciones() {
      let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/index/autorizaciones';
      this.router.navigate([returnUrl]); 
    }

    irparseo() {
      let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/index/parseo-masivo';
      this.router.navigate([returnUrl]); 
    }

    iniciar() {
      let post:Array<any>;
       
      post = JSON.parse(localStorage.getItem('usuariohome'));
      post["activoAutorizaciones"] = true;
      this.dataservice.usuarioactu(post).subscribe(
      res =>{
        debugger;
        this.listitem = res;

        if(this.listitem >= 1){
          this.deteneralert = false;
          this.iniciaralert = true;
          
          localStorage.setItem("usuariohome", JSON.stringify(post));
        }
        else{
          

          this.deteneralert = true;
          this.iniciaralert = false;
        }
        
      },
      err =>{
        console.log("There is an error : "+err);
        
        
      }
    )
    }

    detener() {
      let post:Array<any>;
      post = JSON.parse(localStorage.getItem('usuariohome'));
      post["activoAutorizaciones"] = false;
    this.dataservice.usuarioactu(post).subscribe(
      res =>{
        debugger;
        this.listitem = res;

        if(this.listitem >= 1){
          this.deteneralert = true;
          this.iniciaralert = false;
          localStorage.setItem("usuariohome", JSON.stringify(post));
          
        }
        else{
          this.deteneralert = false;
          this.iniciaralert = true;
        }
        
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
    }

  constructor(private dataservice:DataService, private datePipe: DatePipe,private route: ActivatedRoute, public router: Router) { 
    
  }

  incomingfile(event) 
  {

  this.file= event.target.files[0]; 

  this.Upload();
  }

  Upload() {
   /* let fileReader = new FileReader();

    let stringcsv:any = '';
      fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {type:"binary"});
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          stringcsv += XLSX.utils.sheet_to_csv(worksheet);
          console.log(stringcsv);
      }
      fileReader.readAsArrayBuffer(this.file);*/
      const fd = new FormData();
  fd.append('file', this.file);
  fd.append('tokens', "cedula,tipoCedula,autorizado");


}
  
   
  ngOnInit() {
    !!/[\d\s]/.test($("g[class^='raphael-group-'][class$='-labels'] text"));
    let post:Array<any>;
       
    post = JSON.parse(localStorage.getItem('usuariohome'));
    if(post['activoAutorizaciones']){
      this.deteneralert = false;
      this.iniciaralert = true;
    }
    else{
      this.deteneralert = true;
      this.iniciaralert = false;
      
    }
   
    let now = new Date();
    let an_hour_next = date.addHours(now, 24);

    let an_hour_ago = date.addHours(now, -24);
    
    
    this.getToday(this.datePipe.transform(an_hour_ago, 'yyyy-MM-dd HH:mm:ss'), this.datePipe.transform(an_hour_next, 'yyyy-MM-dd HH:mm:ss'));
    
  }


  public getToday(desde: any, hasta:any):any {
    debugger;
    this.dataservice.autorizacionfetch(desde, hasta).subscribe(
      res =>{

        var autorizadas = [];
        var pendientes = [];
        var error = [];
        var existe = [];
        
        res.forEach((key : any, val: any) => {
          if(key.estado == 3){
            pendientes.push(key.estado);
          }

          if(key.estado == 4 || key.estado == 1){
            error.push(key.estado);
          }

          if(key.estado == 6){
            autorizadas.push(key.estado);
          }

          if(key.estado == 5){
            existe.push(key.estado);
          }

          
      })


      var resultautorizadas = autorizadas.length;
      var resultpendientes = pendientes.length;
      var resulterror = error.length;
      var resultexiste = existe.length;


      this.dataSource.data[0].value = resultautorizadas;/// 0 1 2
      this.dataSource.data[1].value = resultpendientes;
      this.dataSource.data[2].value = resulterror;
      this.dataSource.data[3].value = resultexiste;
      },
      err =>{
        console.log("There is an error : "+err);
      }
  )

// Parseo


this.dataservice.parseocedulafetch(desde, hasta).subscribe(
  res =>{
    debugger;
    var autorizadasparseo = [];
    var pendientesparseo = [];
    
    res.forEach((key : any, val: any) => {
      if(key.estado == 3){
        pendientesparseo.push(key.estado);
      }

      

      if(key.estado == 6){
        autorizadasparseo.push(key.estado);
      }

      

      
  })


  var resultautorizadas = autorizadasparseo.length;
  var resultpendientes = pendientesparseo.length;


  this.dataSource2.data[0].value = resultautorizadas;
  this.dataSource2.data[1].value = resultpendientes;
  },
  err =>{
    console.log("There is an error : "+err);
  }
)


  }

  
}
