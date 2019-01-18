import { Component, OnInit } from '@angular/core';

import { AmazingTimePickerService } from 'amazing-time-picker';
import { DataService } from '../service/data.service';
import { Router} from '@angular/router';
import { Item } from '../interfaces/item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [DataService]
})
export class AdminComponent  implements OnInit{
  
  public selectedTime: string;
  public selectedTime2: string;
  loginAlert : any;
  loginError:boolean = false;
  update:boolean = false;
  tipoCedula=0;
  public Username:any;
  public recibirCorreos:any;
  public horaNotificacion:any;
  public cedula:any;
  public correo:any;
  public codEmpresa:any;
  public tipoCedulauser:any;
  public pin:any;
  private recno:any;
  public listitem;
  public rol;
  public containeritem:Item;
  public rutaAutorizacionesProc: any = "";

  public rutaAutorizaciones:any = "";
  list: any[] = ['opt1', 'opt2', 'opt3'];
  rForm: FormGroup;
  usernameAlert:string = "Por favor, rellene el campo de nombre de usuario";
  passwordAlert:string = "Por favor, rellene el campo de la contraseña";
  cedulaAlert:string = "Por favor, rellene el campo de cedula";
  tipoCedulaAlert:string = "Por favor, rellene el campo del tipo de Cedula";
  codEmpresaAlert:string = "Por favor, rellene el campo del codigo de la Empresa";
  correoAlert:string = "Por favor, rellene el campo de la contraseña";
  idEquifaxAlert:string = "Por favor, rellene el campo del id de Equifax";
  pinAlert:string = "Por favor, rellene el campo del Pin";
  showProgress:boolean = false;

  constructor( private atp: AmazingTimePickerService, private dataservice:DataService,private router:Router,private fb: FormBuilder) {
    this.getuser();
    
    
    


    this.dataservice.rutasGet().subscribe(
      res =>{
        this.listitem = res;
        // || boton clic menu
        if (this.listitem) {
          
          this.rutaAutorizaciones = this.listitem.rutaAutorizaciones;
          this.rutaAutorizacionesProc = this.listitem.rutaAutorizacionesProc;

        }
        
        
        
        
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )

    
    }


    getuser(){
      this.dataservice.usuarioidexquifax(JSON.parse(localStorage.getItem('usuario')).usuario.idEquifax).subscribe(
        res =>{
          this.recno = res.recno;
          this.Username = res.idEquifax;
          this.recibirCorreos = res.recibirCorreos;
          this.horaNotificacion = res.horaNotificacion;
          this.cedula = res.cedula;
          this.correo = res.correo;
          this.codEmpresa = res.codEmpresa;
          this.tipoCedulauser = res.tipoCedula;
          this.pin = res.pin;
          this.rol =1;//res.role;
  
          if(this.rol == 1 && this.update == false){
            this.rForm = this.fb.group({
              
              'fechas': [],
              'horainicio': [],
              'horafin': [],
              'username': [null, Validators.required],
              'pin' : [null, Validators.required],
                      
                    
                });
            }
      
            if (this.rol == 2 && this.update == false) {
              
              this.rForm = this.fb.group({
                'username': [null, Validators.required],
                'recibirCorreos': [],
                'horaNotificacion': [],
                'pin' : [null, Validators.required],
                        
                      
                  });
                }
        
            if (this.rol == 3 && this.update == false) {
              
              this.rForm = this.fb.group({
                'username': [null, Validators.required],
                'rutaAutorizacionesProc': [],
                'rutaAutorizaciones' : [],
                'pin' : [null, Validators.required],
                        
                      
                  });
                }
          
          
        },
        err =>{
          console.log("There is an error : "+err);
        }
      )
    }
   
        
       

  ngOnInit() {}
  opendates() {
  $(document).ready(function(){
    var today = new Date();
    var y = today.getFullYear();
    let array;
    let addDates = JSON.parse(localStorage.getItem('usuario')).usuario.fechasConsultaSujef;
    var oldArray = addDates.split(',');

    console.log(oldArray);

    $('#fechas').multiDatesPicker(
    {
      addDates: oldArray,
      numberOfMonths: [3,4],
      defaultDate: '1/1/'+y
    });
  });
  $('#fechas').focus();
}
     
    
getvalue(){
  let s = $('#fechas').val();
  
      console.log(this.rForm.value.fechas = s);
}

getvalue1(){
  let s = $('#horainicio').val();
  
      console.log(this.rForm.value.horainicio = s);
}
getvalue2(){
  let s = $('#horafin').val();
  
      console.log(this.rForm.value.horafin = s);
}
  
 


  open() {
      const amazingTimePicker = this.atp.open();
      amazingTimePicker.afterClose().subscribe(time => {
          this.selectedTime = time;
      });
  }


  open2() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
        this.selectedTime2 = time;
    });
}


  
  addPost(post) {

  this.showProgress = true;

  post.recno = this.recno;

  /** 
   * rol 1
    'horaNotificacion': [],
    'fechas': [],
    'username': [null, Validators.required],
    'pin' : [null, Validators.required],

    rol 2

     'username': [null, Validators.required],
    'recibirCorreos': [],
    'horaNotificacion': [],
    'pin' : [null, Validators.required],

    rol 3

    'username': [null, Validators.required],
    'rutaAutorizacionesProc': [],
    'rutaAutorizaciones' : [],
    'pin' : [null, Validators.required],

    
   
   */
  let user = JSON.parse(localStorage.getItem('usuario')).usuario;

  if (this.rol == 1) {
    var dates = $('#fechas').multiDatesPicker('getDates');
    var myJsonString = dates.toString();
  var cuerpo = {
    "activoAutorizaciones": user.activoAutorizaciones,
    "cedula": user.cedula,
    "codEmpresa": user.codEmpresa,
    "correo": user.correo,
    "fechasConsultaSujef": myJsonString,
    "horaFinConsulta": this.selectedTime2,
    "horaInicioConsulta": this.selectedTime,
    "horaNotificacion": user.horaNotificacion,
    "idEquifax": user.idEquifax,
    "pin": post.pin,
    "recibirCorreos": user.recibirCorreos,
    "recno": user.recno,
    "role": user.role,
    "tipoCatalogoRoles": user.tipoCatalogoRoles,
    "tipoCedula": user.tipoCedula
  }
    
  }
  if (this.rol == 2) {
     cuerpo = {
      "activoAutorizaciones": user.activoAutorizaciones,
      "cedula": user.cedula,
      "codEmpresa": user.codEmpresa,
      "correo": user.correo,
      "fechasConsultaSujef": user.fechasConsultaSujef,
      "horaFinConsulta": user.horaFinConsulta,
      "horaInicioConsulta": user.horaInicioConsulta,
      "horaNotificacion": this.selectedTime,
      "idEquifax": user.idEquifax,
      "pin": post.pin,
      "recibirCorreos": post.recibirCorreos,
      "recno": user.recno,
      "role": user.role,
      "tipoCatalogoRoles": user.tipoCatalogoRoles,
      "tipoCedula": user.tipoCedula
    }
  }

  if (this.rol == 3) {
    cuerpo = {
     "activoAutorizaciones": user.activoAutorizaciones,
     "cedula": user.cedula,
     "codEmpresa": user.codEmpresa,
     "correo": user.correo,
     "fechasConsultaSujef": user.fechasConsultaSujef,
     "horaFinConsulta": user.horaFinConsulta,
     "horaInicioConsulta": user.horaInicioConsulta,
     "horaNotificacion": user.horaNotificacion,
     "idEquifax": user.idEquifax,
     "pin": post.pin,
     "recibirCorreos": user.recibirCorreos,
     "recno": user.recno,
     "role": user.role,
     "tipoCatalogoRoles": user.tipoCatalogoRoles,
     "tipoCedula": user.tipoCedula
   }
 }

  
    this.dataservice.usuarioactu(cuerpo).subscribe(
      res =>{
        this.listitem = res;

        if(this.listitem >= 1){
          
          
          this.update = true;
          this.getuser();
          if (this.rol == 2 || this.rol == 1) {
            this.loginError = true;
          this.loginAlert = 'Actualizo el usuario correctamente';
          this.showProgress = false;
          }
          if (this.rol == 3) {
            

            post = {
              "cedulaUsuario": user.cedula,
              "codEmpresa": user.codEmpresa,
              "idEquifax": user.idEquifax,
              "recno": localStorage.getItem('recnoruta'),
              "rutaAutorizaciones": post.rutaAutorizaciones,
              "rutaAutorizacionesProc": post.rutaAutorizacionesProc
            }
            debugger;
            this.dataservice.rutasactu(post).subscribe(
              res =>{
                
                if (res >= 1) {
                  this.loginError = true;
                  this.loginAlert = 'Actualizo el usuario correctamente';
                  this.showProgress = false;
                }
                else{
                  this.loginError = true;
                  this.loginAlert = 'No actualizo el usuario';
                  this.showProgress = false;

                }
                
              },
              err =>{
                console.log("There is an error : "+err);
              }
            )
            
          } 
        }
        else{
          this.loginError = true;
          this.loginAlert = 'No actualizo el usuario';
          this.showProgress = false;
        }
        
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }

}
