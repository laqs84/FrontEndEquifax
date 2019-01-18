import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router} from '@angular/router';
import { Item } from '../interfaces/item';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  providers: [DataService]
})
export class CatalogoComponent implements OnInit {
  public listitem;
  public containeritem:Item;
  constructor(private dataservice:DataService,private router:Router) { }

  ngOnInit() {
    this.dataservice.catalogo().subscribe(
      res =>{
        this.listitem = res.data[1];
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }

}
