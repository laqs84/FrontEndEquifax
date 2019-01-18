import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import { Item } from '../interfaces/item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import date from 'date-and-time';

 

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-reporte-lotes',
  templateUrl: './reporte-lotes.component.html',
  styleUrls: ['./reporte-lotes.component.css'],
  providers: [DataService, DatePipe]
})
export class ReporteLotesComponent implements OnInit {
  
  width = 180;
  height = 160;
  type = 'doughnut2d';
  dataFormat = 'json';
  dataSource = {
    "chart": {
      "caption": "",
      "subcaption": "",
      "bgAlpha": "0",
      "borderAlpha": "20",
      "use3DLighting": "0",
      "showShadow": "0",
      "enableSmartLabels": "0",
      "startingAngle": "310",
      "showLabels": "0",
      "showPercentValues": "1",
      "showLegend": "1",
      "legendShadow": "0",
      "legendBorderAlpha": "0",
      "plottooltext": "<b>$percentValue </b>$label</b>",
      "centerlabel": "Parseado: $value",
      "showTooltip": "0",
       "decimals": "0",
      "theme": "fusion"
    },
    "data": [
      {
        "label": "Parseado",
        "value": "1",
        "color": "#468D55"
      }
    ]
  };

  dataSource2 = {
    "chart": {

      "caption": "",
      "subcaption": "",
      "bgAlpha": "0",
      "borderAlpha": "20",
      "use3DLighting": "0",
      "showShadow": "0",
      "enableSmartLabels": "0",
      "startingAngle": "310",
      "showLabels": "0",
      "showPercentValues": "1",
      "showLegend": "1",
      "legendShadow": "0",
      "legendBorderAlpha": "0",
      "plottooltext": "<b>$percentValue </b>$label</b>",
      "centerlabel": "Consulta CIC : $value",
      "showTooltip": "0",
       "decimals": "0",
      "theme": "fusion"
    },
    "data": [
      {
        "label": "Consulta CIC",
        "value": "1",
        "color": "#070eec"
      }
    ]
  };
  dataSource3 = {
    "chart": {

      "caption": "",
      "subcaption": "",
      "bgAlpha": "0",
      "borderAlpha": "20",
      "use3DLighting": "0",
      "showShadow": "0",
      "enableSmartLabels": "0",
      "startingAngle": "310",
      "showLabels": "0",
      "showPercentValues": "1",
      "showLegend": "1",
      "legendShadow": "0",
      "legendBorderAlpha": "0",
      "plottooltext": "<b>$percentValue </b>$label</b>",
      "centerlabel": "Compara Operaciones : $value",
      "showTooltip": "0",
       "decimals": "0",
      "theme": "fusion"

    },
    "data": [
      {
        "label": "Compara Operaciones",
        "value": "1",
        "color": "#ffd334"
      }
    ]
  };

  dataSource4 = {
    "chart": {

      "caption": "",
      "subcaption": "",
      "bgAlpha": "0",
      "borderAlpha": "20",
      "use3DLighting": "0",
      "showShadow": "0",
      "enableSmartLabels": "0",
      "startingAngle": "310",
      "showLabels": "0",
      "showPercentValues": "1",
      "showLegend": "1",
      "legendShadow": "0",
      "legendBorderAlpha": "0",
      "plottooltext": "<b>$percentValue </b>$label</b>",
      "centerlabel": "Endeudamiento : $value",
      "showTooltip": "0",
       "decimals": "0",
      "theme": "fusion"
    },
    "data": [
      {
        "label": "Endeudamiento",
        "value": "1",
        "color": "#AE0433"
      }
    ]
  };

  rForm: FormGroup;
  desdeAlert:string = "Por favor, rellene el campo del Desde";
  hastaAlert:string = "Por favor, rellene el campo del Hasta";
  loteAlert:string = "Por favor, rellene el campo de Lote";
  cedulaAlert:string = "Por favor, rellene el campo del la Cedula";
  public rows:Array<any> = [];
  public listitem;
  
public columns:Array<any> = [
  {title: 'Lote', name: 'recno', sort: 'asc'},
  {title: 'Fecha Inicio', name: 'fechaInicio'},
  {title: 'Fecha Fin', name: 'fechaFin', sort: ''},
  {title: 'Cantidad de Cedula Incuidas', name: 'cantCedulas', sort: ''},
  {title: 'No Autorizadas', name: 'cantCedsSinAutorizacion', sort: ''},
  {title: 'Autorizadas', name: 'cantCedsConAutorizacion', sort: ''},
  {title: 'Con error', name: 'cantCedsMalas', sort: ''},

  {title: 'Status', name: 'terminado', sort: ''},

];

  public page:number = 1;
  public itemsPerPage:number = 10;

  public totalitems:any;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public desdefecha;
  public hastafecha;
  public lote;
  public cedula;

  public rutaAutorizacionesProc: any = "";

  public rutaAutorizaciones:any = "";

  public autor;
  public pendientes;
  public errors;
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

  loginAlert : any;
  botonbuscar:boolean = true;
  loginError:boolean = false;
  show:boolean = false;
  constructor( private dataservice:DataService,private router:Router,private fb: FormBuilder,private datePipe: DatePipe) { 
    this.length = this.data.length;
    this.rForm = fb.group({
      'desde': [],
      'hasta': [],
      'lote': [],
      'cedula': []
              
            
        });       
  }

  ngOnInit() {

    
    let today = Date.now();
    var d = new Date();
    var anio = d.getFullYear();

    let start1 = anio + '-01-01';
    let end1 = anio + '-12-31';

    $('.input-daterange').datepicker({
      maxViewMode: 1,
      language: "es",
      orientation: "bottom",
      keyboardNavigation: false,
      calendarWeeks: true,
      todayHighlight: true,
      
      format: 'yyyy-mm-dd', 
      datesDisabled: ['01/06/2019', '01/21/2019']
    });


  }


  getvalue(){
    let s = $('#desde').val();
    
        console.log(this.rForm.value.desde = s);
  }

  getvalue2(){
    let s = $('#hasta').val();
        console.log(this.rForm.value.hasta = s);
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
        
        if(column.name == 'terminado'){
  
  
            if(item[column.name] == 1){
              item[column.name] = "<div class='color-green'>Completado</div>";
            }
  
            if(item[column.name] == 0){
              item[column.name] = "<div class='color-red'>Error</div>";
            }
           
        }
        if(item[column.name] == null){item[column.name] = ""}
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
          
          this.data = [];
          this.length = 0;
          let filteredData = 0;
          let sortedData = 0;
          this.rows = [];
          this.length = 0;
          this.setPage(1);
        
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
    this.show =true;

    
    let consultasCic = data.row.consultasCic;
    let parceado = data.row.parceado;
    let comparaOperaciones = data.row.comparaOperaciones;
    let calculoEndeudamiento = data.row.calculoEndeudamiento;

    this.dataSource.data[0].value = consultasCic;
    this.dataSource2.data[0].value = parceado;
    this.dataSource3.data[0].value = comparaOperaciones;
    this.dataSource4.data[0].value = calculoEndeudamiento;
    /*calculoEndeudamiento: false
cantCedsConAutorizacion: 0
cantCedsMalas: 0
cantCedsSinAutorizacion: 0
cantCedulas: 0
catalogoEstadoLote: null
cedulaUsuario: "1234567890"
codEmpresa: "999"
comparaOperaciones: 0
consultasCic: false
estado: null
fechaFin: ""
fechaInicio: "2019-01-15 09:08:37"
idEquifax: "RSABORIOM884"
loteProgramado: false
parceado: false
prioridad: 3
recno: 17
terminado: "<div class='color-red'>Error</div>" */
  }

  addPost(post) {
    this.botonbuscar = false;
    var flaglote = true; 
    var flagcedula = true;
    var flagdesde = true; 
    var flaghasta = true;
    this.lote = post.lote;
    this.desdefecha = post.desde;
    this.hastafecha = post.hasta;
    if(post.desde == undefined){
      this.desdefecha = post.hasta;
      flagdesde = false;
    }
    if(post.hasta == undefined){
      this.hastafecha = post.desde;
      flaghasta = false;
    }

    if(post.lote == undefined){
       flaglote = false; 
    }
    if(post.cedula == undefined){
      flagcedula = false; 
    }

    this.dataservice.lote().subscribe(
      res =>{
        this.botonbuscar = true;
        let greaterTen = [];
        var flagcedula2 = false;
        var flaglote2 = false;
        var flagdesde2 = false;
        var flaghasta2 = false;
        var existe = false;
        var desdefechabd = '';
        var hastafechabd = '';
        for (let i = 0; i<res.length; i++) {
          var currentdesde = res[i].fechaInicio;
          var currenthasta = res[i].fechaFin;

          
          desdefechabd= this.datePipe.transform(currentdesde, 'yyyy-MM-dd')
          hastafechabd = this.datePipe.transform(currenthasta, 'yyyy-MM-dd');
          var currentNumber = res[i].recno;
          var currentCed = res[i].cedulaUsuario;
          if (flaglote) {
            if (currentNumber == this.lote) {
              flaglote2 = true;
              existe = true;
            }
          }
          if (flagcedula && existe == false) {
            if (currentCed == this.cedula) {
              flagcedula2 = true;
              existe = true;
            }
          }



          if (flagdesde  && existe == false || flaghasta  && existe == false) {
            
            if(desdefechabd >= this.desdefecha && desdefechabd <= this.hastafecha) {
              flagdesde2 = true;
              existe = true;
          }
          }


          if (existe) {
            greaterTen.push(res[i]);
            existe = false;
          }
        }

        console.log(greaterTen);
        this.data = greaterTen;
        this.length = this.data.length;
        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = this.page && this.config.paging ? this.changePage(this.page, sortedData) : sortedData;
        this.length = sortedData.length;
      },
      err =>{
        console.log("There is an error : "+err);
      }
  )



  }

  

}
