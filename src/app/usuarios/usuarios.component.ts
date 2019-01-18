import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router} from '@angular/router';
import { Item } from '../interfaces/item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [DataService]
})
export class UsuariosComponent implements OnInit {

  loginError:boolean = false;
  loginAlert : any;
  tipoCedula=0;
  public listitem;
  public containeritem:Item;
  list: any[] = ['opt1', 'opt2', 'opt3'];
  rForm: FormGroup;
  cedulaAlert:string = "Por favor, rellene el campo de cedula";
  tipoCedulaAlert:string = "Por favor, rellene el campo del tipo de Cedula";
  codEmpresaAlert:string = "Por favor, rellene el campo del codigo de la Empresa";
  correoAlert:string = "Por favor, rellene el campo de la contraseña";
  idEquifaxAlert:string = "Por favor, rellene el campo del id de Equifax";
  pinAlert:string = "Por favor, rellene el campo del Pin";

  constructor(private dataservice:DataService,private router:Router,private fb: FormBuilder) {

    this.rForm = fb.group({
      'recibirCorreos': [],
      'horaNotificacion': [],
      'username': [null, Validators.required],
      'nombrecerf': [],
      'cedula' : [null, Validators.required],
      'tipoCedula' : [null, Validators.required],
      'codEmpresa' : [null, Validators.required],
      'correo' : [null, [Validators.required, Validators.email]],
      'idEquifax' : [null, Validators.required],
      'pin' : [null, Validators.required],
              
            
        });
              
    }
   

  ngOnInit() {

    this.dataservice.catalogo().subscribe(
      res =>{

        this.list = res;
        
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }


  addPost(post) {

    this.dataservice.usuario(post).subscribe(
      res =>{

        this.listitem = res;

        if(this.listitem = 1){
          this.loginError = true
          this.loginAlert = 'Guardo el usuario correctamente';
        }
        else{
          this.loginError = true
          this.loginAlert = 'No guardo el usuario';
        }
        
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }
          }