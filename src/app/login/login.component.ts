import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
@Component({
selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css'],
        providers: [DataService]
        })
export class LoginComponent implements OnInit {
@ViewChild('username') 
        el:ElementRef;
        showProgress:boolean = false;
        statuslogin:any;
        focusin: boolean = true;
        loginscreen: boolean = true;
        rForm: FormGroup;
        post:any;
        usernameAlert:string = "Por favor, rellene el campo de nombre de usuario";
        passwordAlert:string = "Por favor, rellene el campo de la contraseña";
        loginAlert:string;
        loginError:boolean = false;
        returnUrl: string;
        constructor(
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private authenticationservice:DataService,
                public router: Router
                ) {
this.rForm = fb.group({
'username' : [null, Validators.required],
        'password' : [null, Validators.required],
        });
        }
ngOnInit() {
this.authenticationservice.logout();
        this.loginscreen = false;
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/index';
        }
addPost(post) {
        this.showProgress = true;
this.authenticationservice.login(post).subscribe(res => {
       
        let currentUser = localStorage.getItem("currentUser");
        let token = localStorage.getItem("token");
        if (currentUser)
        {
        let tokenactive = this.authenticationservice.ensureAuthenticated(token).then(
        (res) => {
        localStorage.setItem('usuario', res.principal);
        
        post = JSON.parse(localStorage.getItem('usuario')).usuario;
        localStorage.setItem('usuariohome', JSON.stringify(post));
        var user = res;
        if (user.authenticated)
        {
                this.showProgress = false;
        this.router.navigate([this.returnUrl]);
        } else{
                this.loginError = true
                this.loginAlert = 'Nombre de Usuario o Contraseña incorrectos';
        }
        }

        );
                }
},

err => {
  if(err){
    this.showProgress = false;
    this.loginError = true
    this.loginAlert = err;
  }
} 
);
        }
}