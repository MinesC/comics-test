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
	publicKey = '96558ca279bf14f5aead546ced0cdd2b';
	baseUrl = 'https://gateway.marvel.com/v1/public/comics?';
	ts = new Date().getTime();
	limit = 20;
	offset = 0;
	md = Md5.hashStr(this.ts+'acabe8a3a268841c5fb1499bfbcd43829ee8b1e3'+this.publicKey);
  encodedPath = this.baseUrl +'&apikey=' + this.publicKey + '&hash='+ this.md+ '&ts='+this.ts + '&limit='+ this.limit;


  constructor(public navCtrl: NavController, public http: Http) {
  	this.comicList();
  }


  comicList(){
  
  	        this.http.get(this.encodedPath)
            .map(res => res.json()).subscribe(data => {
                this.comics = data.data.results;
            },
            err => {
                console.log('error in MCU');
            });
 
  }

  comicLoadMore(infiniteScroll){
 						this.offset = this.offset + this.limit;
 						let offsetPath = this.encodedPath +'&offset=' +this.offset
  	  	    this.http.get(offsetPath)
            .map(res => res.json()).subscribe(data => {
                this.comics = this.comics.concat(data.data.results);
                infiniteScroll.complete();
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
