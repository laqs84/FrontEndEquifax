import { Component, OnInit, ViewChild,  ElementRef } from '@angular/core';
import { DataService } from '../service/data.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-cargarexcel',
  templateUrl: './cargarexcel.component.html',
  styleUrls: ['./cargarexcel.component.css'],
  providers: [DataService]
})
export class CargarexcelComponent implements OnInit {

  @ViewChild('excelcsv') excelcsv: ElementRef;

  showProgress:boolean = false;
  public inicarralert:boolean = true;
  arrayBuffer:any;
  file:File;
  public rows:Array<any> = [];
  public listitem;
  public datosfechas;
  
  public columns:Array<any> = [
    {title: 'Fecha de Ingreso', name: 'fechaIngreso', sort: 'asc'},
    {title: 'Cedula', name: 'cedula', sort: ''},
    {title: 'Autorizacion', name: 'autorizado', sort: ''},
    {title: 'Status', name: 'descEstado', sort: '', color: ''}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;

  public totalitems:any;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;
  public rutaAutorizacionesProc: any = "";

  public rutaAutorizaciones:any = "";
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

public constructor(private dataservice:DataService) {
  
  this.length = this.data.length;
}

public ngOnInit():void {
  $("#sortable").sortable({
    revert: true
  });
  this.onChangeTable(this.config);
  
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
      
      if(column.name == 'descEstado'){
        if(item[column.name].descripcion == 'Con Formato inválido'){
          item[column.name] = "<div class='color-red'>Con Formato inválido</div>";
        }
        if(item[column.name].descripcion == 'En Proceso'){
          item[column.name] = "<div class='color-blue'>En Proceso</div>";
        }
        if(item[column.name].descripcion == 'No Procesado'){
          item[column.name] = "<div class='color-red'>No Procesado</div>";
        }
        if(item[column.name].descripcion == 'Consulta CIC'){
          item[column.name] = "<div class='color-yelow'>Consulta CIC</div>";
        }
         
      }
      
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


public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
  if (config.filtering) {
    Object.assign(this.config.filtering, config.filtering);
  }

  if (config.sorting) {
    Object.assign(this.config.sorting, config.sorting);
  }

  this.dataservice.parseocedula().subscribe(
      res =>{
        this.listitem = res;
        if(this.listitem.length >= 1){
         
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
    this.showProgress = true;
      const fd = new FormData();
      var tokens  = [];
$.each($('#sortable').find('label'), function() {
       
		tokens.push(this.id);
		
    });

  fd.append('file', this.file);
  fd.append('tokens', tokens.toString());


      this.dataservice.cargaexcel(fd).subscribe(
      res => {
        
        if(res => 1){
          this.data = res;
        this.length = this.data.length;
        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = this.page && this.config.paging ? this.changePage(this.page, sortedData) : sortedData;
        this.length = sortedData.length;
          this.excelcsv.nativeElement.value = null;
          this.showProgress = false;
        }
      },
      error => {
        
        
      }
    );
}

}
