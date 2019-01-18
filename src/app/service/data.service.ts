import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
  private url: string = '/restapiserver/'; //
  private url2: string = '/equifax/icic/';

  

  private urlsec: string = '/oauth/';

  private urltoken: string = '/user/';

  constructor(private http: Http) { }

  login(post): Observable<any> {
    let params = new URLSearchParams();
    params.append('username',post['username']); //(admin)
    params.append('password', post['password']); //(admin123)  
    params.append('grant_type','password');
    params.append('scope','user_info');
    let headers = new Headers({'Access-Control-Allow-Origin': '*','Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa("SampleClientId:secret"), 'X-Requested-With': 'XMLHttpRequest'});
    let options = new RequestOptions({ headers: headers });

    // url de prueba
    //const getLoginUrl = this.url + 'index.php?username=' + post['username'] + '&password=' + post['password'];
    const getLoginUrl = this.urlsec + 'token';
    return this.http
      //.get(getLoginUrl, {})// url de prueba
      .post(getLoginUrl,params.toString(), options)
      .map(
      res => {
        
        if (res.json().access_token) {
          

          localStorage.setItem('token',res.json().access_token);
          localStorage.setItem('currentUser', JSON.stringify(res.json()));
        }

        return res.json();
      },
      err => {
        return err;
      }
      ).catch((error: any) => {
        if (error.status === 500) {
            return Observable.throw(new Error(error.status));
        }
        else if (error.status === 400) {
            return Observable.throw(new Error(error.json().error_description));
        }
        else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
        }
        else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
        }
    });
  }

  async ensureAuthenticated(token): Promise<any>{
    try {
      const getLoginUrl = this.urltoken + 'me';
      let headers = new Headers({'Authorization': `Bearer ${token}`});
      let res = await this.http
        .get(getLoginUrl, {headers: headers})
        .toPromise();
      return res.json();
    }catch(e) {
      console.log(e);
    }
}

  logout() {
    localStorage.removeItem('currentUser');
  }

  catalogo(): Observable<any> {
    let token = localStorage.getItem('token')
    let headers = new Headers({'Authorization': `Bearer ${token}`});
    const getItemUrl = this.url2 + 'catalogo/operacion/';
    return this.http
      .get(getItemUrl, {headers: headers})
      .map(
      res => {
        return res.json();
      },
      err => {
        return err;
      }
      )
  }

  catalogoID(post): Observable<any> {
    let token = localStorage.getItem('token')
    let headers = new Headers({'Authorization': `Bearer ${token}`});
    const getItemUrl = this.url2 + 'catalogo/operacion/' + post['catalogo'];
    return this.http
      .get(getItemUrl, {headers: headers})
      .map(
      res => {
        return res.json();
      },
      err => {
        return err;
      }
      )
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) { 
        currentPage = 1; 
    } else if (currentPage > totalPages) { 
        currentPage = totalPages; 
    }
    
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}


autorizacion(): Observable<any> {
  const getItemUrl = this.url2 + 'autorizacion/';
  let token = localStorage.getItem('token')
  let headers = new Headers({'Authorization': `Bearer ${token}`});
  return this.http
    .get(getItemUrl, {headers: headers})
    .map(
    res => {
      localStorage.setItem('autorizaciones', JSON.stringify(res.json()));
      return res.json();
    },
    err => {
      return err;
    }
    )
}



autorizacionID(post): Observable<any> {
  const getItemUrl = this.url2 + 'autorizacion/' + post['autorizacion'];
  return this.http
    .get(getItemUrl, {})
    .map(
    res => {
      return res.json();
    },
    err => {
      return err;
    }
    )
}


autorizacionfetch(desde, hasta): Observable<any> {
  const getItemUrl = this.url2 + 'autorizacion/fetch?desde=' + desde +'&hasta='  + hasta;
  let token = localStorage.getItem('token')
  let headers = new Headers({'Authorization': `Bearer ${token}`});
  return this.http
    .get(getItemUrl, {headers: headers})
    .map(
    res => {
      return res.json();
    },
    err => {
      return err;
    }
    )
}


usuarioidexquifax(idfax): Observable<any> {
  const getItemUrl = this.url2 + 'usuario/'  + idfax;
  let token = localStorage.getItem('token')
  let headers = new Headers({'Authorization': `Bearer ${token}`});
  return this.http
    .get(getItemUrl, {headers: headers})
    .map(
    res => {
      localStorage.setItem('getadminusuario',res.json());
      return res.json();
    },
    err => {
      return err;
    }
    )
}



usuario(post): Observable<any> {
  let token = localStorage.getItem('token')
  let headers = new Headers({'Authorization': `Bearer ${token}`});
  const getItemUrl = this.url2 + 'usuario/';
  return this.http
    .post(getItemUrl, post, {headers: headers})
    .map(
    res => {
      return res.json();
    },
    err => {
      return err;
    }
    )
}

usuarioactu(cuerpo): Observable<any> {
  
  let token = localStorage.getItem('token')
  let headers = new Headers({'Authorization': `Bearer ${token}`});
  const getItemUrl = this.url2 + 'usuario/'+cuerpo.recno;
  return this.http
    .put(getItemUrl, cuerpo, {headers: headers})
    .map(
    res => {
      return res.json();
    },
    err => {
      return err;
    }
    )
}


rutas(post): Observable<any> {
  let token = localStorage.getItem('token')
  let headers = new Headers({'Authorization': `Bearer ${token}`});
  const getItemUrl = this.url2 + 'configuracion/rutas/';
  return this.http
    .post(getItemUrl, post, {headers: headers})
    .map(
    res => {
      return res.json();
    },
    err => {
      return err;
    }
    )
}


rutasGet(): Observable<any> {
  let idEquifax = JSON.parse(localStorage.getItem('usuario')).usuario.idEquifax;
  let codEmpresa = JSON.parse(localStorage.getItem('usuario')).usuario.codEmpresa;
  let cedula = JSON.parse(localStorage.getItem('usuario')).usuario.cedula;
  let token = localStorage.getItem('token')
  let headers = new Headers({'Authorization': `Bearer ${token}`});
  const getItemUrl = this.url2 + 'configuracion/rutas/'+idEquifax+'/cedula/'+cedula+'/empresa/'+codEmpresa;
  return this.http
    .get(getItemUrl, {headers: headers})
    .map(
    res => {
      return res.json();
    },
    err => {
      return err;
    }
    )
}


rutasactu(cuerpo): Observable<any> {
  
  let token = localStorage.getItem('token')
  let headers = new Headers({'Authorization': `Bearer ${token}`});
  const getItemUrl = this.url2 + 'configuracion/rutas/'+cuerpo.recno;
  return this.http
    .put(getItemUrl, cuerpo, {headers: headers})
    .map(
    res => {
      return res.json();
    },
    err => {
      return err;
    }
    )
}



lotefetch(desde, hasta): Observable<any> {
  const getItemUrl = this.url2 + 'lote/fetch?desde=' + desde +'&hasta='  + hasta;
  let token = localStorage.getItem('token')
  let headers = new Headers({'Authorization': `Bearer ${token}`});
  return this.http
    .get(getItemUrl, {headers: headers})
    .map(
    res => {
      return res.json();
    },
    err => {
      return err;
    }
    )
}


lote(): Observable<any> {
  const getItemUrl = this.url2 + 'lote/';
  let token = localStorage.getItem('token')
  let headers = new Headers({'Authorization': `Bearer ${token}`});
  return this.http
    .get(getItemUrl, {headers: headers})
    .map(
    res => {
      return res.json();
    },
    err => {
      return err;
    }
    )
}


cargaexcel(post): Observable<any> {
  
  let token = localStorage.getItem('token')
  let headers = new Headers({'Authorization': `Bearer ${token}`});
  const getItemUrl = this.url2 + 'archivo/carga/excel';
  return this.http
    .post(getItemUrl, post, {headers: headers})
    .map(
    res => {
      return res.json();
    },
    err => {
      return err;
    }
    )
}


parseocedula(): Observable<any> {
  const getItemUrl = this.url2 + 'cedulas/procesar/';
  let token = localStorage.getItem('token')
  let headers = new Headers({'Authorization': `Bearer ${token}`});
  return this.http
    .get(getItemUrl, {headers: headers})
    .map(
    res => {
      localStorage.setItem('parseos', JSON.stringify(res.json()));
      return res.json();
    },
    err => {
      return err;
    }
    )
}


parseocedulafetch(desde, hasta): Observable<any> {
  const getItemUrl = this.url2 + 'autorizacion/fetch?desde=' + desde +'&hasta='  + hasta;
  let token = localStorage.getItem('token')
  let headers = new Headers({'Authorization': `Bearer ${token}`});
  return this.http
    .get(getItemUrl, {headers: headers})
    .map(
    res => {
      return res.json();
    },
    err => {
      return err;
    }
    )
}


}



