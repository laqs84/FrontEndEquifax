import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Item } from '../interfaces/item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-cargarcedulas',
  templateUrl: './cargarcedulas.component.html',
  styleUrls: ['./cargarcedulas.component.css'],
  providers: [DataService, NgxSmartModalService ]
})
export class CargarcedulasComponent implements OnInit {

  returnUrl: string;
  loginError:boolean = false;
  guardaralert:boolean = false;
  actualizaralert:boolean = false;
  loginAlert : any;
  public listitem;
  public listitem2;
  rForm: FormGroup;
  rutaAutorizacionesAlert:string = "Por favor, rellene el campo de la ruta de carga de cedulas";
  rutaAutorizacionesProcAlert:string = "Por favor, rellene el campo de la ruta de cedulas procesadas";
  public rutaAutorizacionesProc: any = "";

  public rutaAutorizaciones:any = "";

  public recno:any = "";

  

  constructor(private dataservice:DataService,private fb: FormBuilder, public ngxSmartModalService: NgxSmartModalService,private route: ActivatedRoute, public router: Router) {


    this.rForm = fb.group({
      'rutaAutorizaciones' : [null, Validators.required],
      'rutaAutorizacionesProc' : [null, Validators.required],
      'cedulaUsuario' : [null],
      'codEmpresa' : [null],
      'idEquifax' : [null]
           
        });
   }





  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/index/home';
    this.dataservice.rutasGet().subscribe(
      res =>{
        debugger;
        this.listitem = res;
        // || boton clic menu
        if (this.listitem) {
          
          this.router.navigate([this.returnUrl]); 
        }
        else{
          const pen: Object = {
            prop1: 'test',
            prop2: true,
            prop3: [{ a: 'a', b: 'b' }, { c: 'c', d: 'd' }],
            prop4: 327652175423
          };
          this.ngxSmartModalService.setModalData(pen, 'popupOne');
          
          this.recno = this.listitem.recno;
          localStorage.setItem('recnoruta', this.recno);
          this.rutaAutorizaciones = this.listitem.rutaAutorizaciones;
          this.rutaAutorizacionesProc = this.listitem.rutaAutorizacionesProc;

          this.actualizaralert = false;
          this.guardaralert = true;
          this.ngxSmartModalService.getModal('popupOne').open();
        }
        
        
        
        
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }

  

  addPost(post) {
   
   post.idEquifax = JSON.parse(localStorage.getItem('usuario')).usuario.idEquifax;
   post.codEmpresa = JSON.parse(localStorage.getItem('usuario')).usuario.codEmpresa;

    post.cedulaUsuario = JSON.parse(localStorage.getItem('usuario')).usuario.cedula;

    if(!localStorage.getItem('recnoruta')){
      debugger;
      this.dataservice.rutas(post).subscribe(
        res =>{
          debugger;
          this.listitem = res;
  
          if(this.listitem = 1){
            this.loginError = true
            this.loginAlert = 'Guardo las rutas correctamente';
          }
          else{
            this.loginError = true
            this.loginAlert = 'Error, no guardo las rutas';
          }
          
        },
        err =>{
          console.log("There is an error : "+err);
        }
      )
    }
    else
    {
      debugger;
      
      
      post.recno = localStorage.getItem('recnoruta');

      this.dataservice.rutasactu(post).subscribe(
        res =>{
          debugger;
          this.listitem2 = res;
  
          if(this.listitem2 = 1){
            this.loginError = true
            this.loginAlert = 'Actualizo las rutas correctamente';
          }
          else{
            this.loginError = true
            this.loginAlert = 'Error, no Actualizo las rutas';
          }
          
        },
        err =>{
          console.log("There is an error : "+err);
        }
      )

   
    }
    
  }

}
