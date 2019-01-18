import { Component, OnInit, ViewChild } from '@angular/core';

import {Item} from '../interfaces/item';
import { DataService } from '../service/data.service';

import { DatePipe } from '@angular/common';

import {NG_TABLE_DIRECTIVES} from 'ng2-table';
import date from 'date-and-time';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { Router} from '@angular/router';

import * as XLSX from 'ts-xlsx';

import { NgxCarousel3dModule }  from 'ngx-carousel-3d';

import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';

@Component({
  selector: 'app-autorizaciones',
  templateUrl: './autorizaciones.component.html',
  styleUrls: ['./autorizaciones.component.css'],
  providers: [DataService, DatePipe, BaseChartDirective]
})
export class AutorizacionesComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  

  arrayBuffer:any;
file:File;

  private datasets = [
    {
      label: "Seleccione una opcion",
      data: [12, 19, 3, 5, 2, 3]
    }
  ];
  
  // this will add 3 brand new datasets and add 2 items to the datasets array
  private newDatasets = [
    {
      label: 'Group 1',
      data: [5,4,1,3,6]
    },
    {
      label: 'Group 2',
      data: [6,3,4,3,5] 
    },
    {
      label: 'Group 3',
      data: [6,2,0,1,7]
    }
  ];

  private labels = ['', '', '', '', '', '']; // 6 total

  private newLables = ['A', 'B', 'C', 'D', 'E'];  //5 total
  
  public autor;
  public pendientes;
  public errors;
  private options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  
  public rows:Array<any> = [];
  public listitem;
  public datosfechas;
  
  public columns:Array<any> = [
    {title: 'Fecha de Ingreso', name: 'fecha', sort: 'desc'},
    {title: 'Cedula', name: 'cedula', sort: ''},
    {title: 'Autorizacion', name: 'numeroAutorizacion', sort: ''},
    {title: 'Status', name: 'estado', sort: '', color: ''}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;

  public totalitems:any;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;
  public rutaAutorizacionesProc: any = "";

  public rutaAutorizaciones:any = "";

  public deteneralert:boolean = false;
  public iniciaralert:boolean = false;
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];


  today = Date.now();

  public config:any = {

    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered', 'table-ocultar', 'shadow']
  };

  private data:Array<any> =[];

  private data2:Array<any> =[];

public constructor(private dataservice:DataService, private datePipe: DatePipe, public router: Router) {
  
   
  this.length = this.data.length;

  console.log(this.labels);

   
}



public ngOnInit():void {

  let post:Array<any>;
  post = JSON.parse(localStorage.getItem('usuariohome'));
  if(post['activoAutorizaciones']){
    this.deteneralert = true;
    this.iniciaralert = false;
  }
  else{
    this.deteneralert = false;
    this.iniciaralert = true;
    
    
  }


  this.getToday(this.datePipe.transform(this.today, 'yyyy-MM-dd HH:mm:ss'), this.datePipe.transform(this.today, 'yyyy-MM-dd HH:mm:ss'));
  this.onChangeTable(this.config);
  this.count();
  
  
}





public changePage(page:any, data:Array<any> = this.data):Array<any> {
  let start = (page.page - 1) * page.itemsPerPage;
  let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
  
  return data.slice(start, end);
}

public changeSort(data:any, config:any):any {
  if (!config.sorting) {
    return data;
  }

  let columns = this.config.sorting.columns || [];
  let columnName:string = void 0;
  let sort:string = void 0;

  for (let i = 0; i < columns.length; i++) {
    if (columns[i].sort !== '' && columns[i].sort !== false) {
      columnName = columns[i].name;
      sort = columns[i].sort;
    }
  }

  if (!columnName) {
    return data;
  }

  // simple sorting
  return data.sort((previous:any, current:any) => {
    if (previous[columnName] > current[columnName]) {
      return sort === 'desc' ? -1 : 1;
    } else if (previous[columnName] < current[columnName]) {
      return sort === 'asc' ? -1 : 1;
    }
    return 0;
  });
}

public changeFilter(data:any, config:any):any {
  let filteredData:Array<any> = data;
  
  this.columns.forEach((column:any) => {
    if (column.filtering) {
      filteredData = filteredData.filter((item:any) => {
    
        return item[column.name].match(column.filtering.filterString);
        
      });
    }
  });

  if (!config.filtering) {
    return filteredData;
  }

  if (config.filtering.columnName) {
    return filteredData.filter((item:any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString));
  }

  let tempArray:Array<any> = [];
  filteredData.forEach((item:any,index) => {
    
    let flag = false;
    this.columns.forEach((column:any) => {
      
      if(column.name == 'estado'){


          if(item[column.name] == 1){
            item[column.name] = "<div class='color-red'>Con Formato inválido</div>";
          }


          if(item[column.name] == 2){
            item[column.name] = "<div class='color-green'>Formato Exitoso</div>";
          }

          if(item[column.name] == 3){
            item[column.name] = "<div class='color-blue'>En Proceso</div>";
          }
          if(item[column.name] == 4){
            item[column.name] = "<div class='color-red'>Procesada con error</div>";
          }
          if(item[column.name] == 5){
            item[column.name] = "<div class='color-yelow'>Procesada ya existente</div>";
          }
          if(item[column.name] == 6){
            item[column.name] = "<div class='color-green'>Autorizadas</div>";
          }
      }
      if(item[column.name] == null){item[column.name] = "Este campo no tiene datos"}
      if (item[column.name].toString().match(this.config.filtering.filterString)) {
        flag = true;
      }
    
    });

 
    
  
    if (flag) {
      tempArray.push(item);
      
    }
 
  });

  
  return tempArray;

  
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

public count(){
  this.dataservice.autorizacion().subscribe(
    res =>{

      var autorizadas = [];
      var pendientes = [];
      var error = [];
      
      res.forEach((key : any, val: any) => {
        if(key.estado == 3){
          pendientes.push(key.estado);
        }

        if(key.estado == 4){
          error.push(key.estado);
        }

        if(key.estado == 6){
          autorizadas.push(key.estado);
        }

        
    })


    var resultautorizadas = autorizadas.length;
    var resultpendientes = pendientes.length;
    var resulterror = error.length;


    this.autor = resultautorizadas;
    this.pendientes = resultpendientes;
    this.errors = resulterror;
    },
    err =>{
      console.log("There is an error : "+err);
    }
)
}


public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
  if (config.filtering) {
    Object.assign(this.config.filtering, config.filtering);
  }

  if (config.sorting) {
    Object.assign(this.config.sorting, config.sorting);
  }

  this.dataservice.autorizacion().subscribe(
      res =>{
        this.listitem = res;
        if(this.listitem.length >= 1){
         debugger; 
        this.data = this.listitem;
        this.length = this.data.length;
        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
        this.setPage(1);
      }
      else{
        this.data = [];
        this.length = 0;
        let filteredData = 0;
        let sortedData = 0;
        this.rows = [];
        this.length = 0;
        this.setPage(1);
      }
      },
      err =>{
        console.log("There is an error : "+err);
      }
  )
  
}

public getToday(desde: any, hasta:any):any {
  this.dataservice.autorizacionfetch(desde, hasta).subscribe(
    res =>{
      this.datosfechas = res;
      
    },
    err =>{
      console.log("There is an error : "+err);
    }
)
}

setPage(page: number) {
  // get pager object from service
  this.pager = this.dataservice.getPager(this.length, page);


  this.page = page;

 this.totalitems = this.pager.totalItems;

  this.numPages = this.pager.totalPages;

  // get current page of items
  this.pagedItems = this.data.slice(this.pager.startIndex, this.pager.endIndex + 1);
 
        this.data2 = this.pagedItems;
        this.length = this.data2.length;
        let filteredData = this.changeFilter(this.data2, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && this.config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = this.pager.totalItems;
        
 
}
public onCellClick(data: any): any {
  console.log(data);
}

incomingfile(event) 
  {
  this.file= event.target.files[0]; 
  
  }

  Upload() {
    

      /*this.dataservice.subirexcel(form).subscribe(
      res => {
        
        if(res){
          
        }
      },
      error => {
        
        
      }
    );*/
}

download(ev){
  
    
  
}



public hora(){
 

  let now = new Date();

  let an_hour_ago = date.addHours(now, -1);
  
    //hora 

    let menoshoras = this.datePipe.transform(an_hour_ago, 'HH:mm:ss');

    let horaactual = this.datePipe.transform(this.today, 'HH:mm:ss');

    let arrayhoras = [menoshoras, horaactual];


 if(this.getToday(this.datePipe.transform(an_hour_ago, 'yyyy-MM-dd HH:mm:ss'),this.datePipe.transform(an_hour_ago, 'yyyy-MM-dd HH:mm:ss')) >= 1){
 /// falta con datos de prueba
 }
 else{
 
  this.labels = this.newLables;
  console.log(this.labels);
  this.datasets = this.newDatasets;
 }

 

}



change2() {
  this.labels = this.newLables;
  this.datasets = this.newDatasets;
  this.chart.chart.update();
  
}



}
