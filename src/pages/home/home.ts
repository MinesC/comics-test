import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import {Md5} from 'ts-md5/dist/md5';
import 'rxjs/add/operator/map';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	comics: any;


  constructor(public navCtrl: NavController, public http: Http) {

				let publicKey = '96558ca279bf14f5aead546ced0cdd2b';
				let baseUrl = 'https://gateway.marvel.com/v1/public/comics?';
				let ts = new Date().getTime();
				let hash = Md5.hashStr(ts+'acabe8a3a268841c5fb1499bfbcd43829ee8b1e3'+publicKey);
        let encodedPath = baseUrl +'&apikey=' + publicKey + '&hash='+ hash+ '&ts='+ts;

        this.http.get(encodedPath)
            .map(res => res.json()).subscribe(data => {
                this.comics = data.data.results;
                console.log(this.comics);
            },
            err => {
                console.log('error in MCU');
            });
  }

  comicSelected(comic){
  	this.navCtrl.push(DetailPage, {
  		comic: comic
  	});
  }

}
