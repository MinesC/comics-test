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
	limit = 40;
	offset = 0;
	md = Md5.hashStr(this.ts+'acabe8a3a268841c5fb1499bfbcd43829ee8b1e3'+this.publicKey);
  encodedPath = this.baseUrl +'&apikey=' + this.publicKey + '&hash='+ this.md+ '&ts='+this.ts + '&limit='+ this.limit +'&format=comic';


  constructor(public navCtrl: NavController, public http: Http) {
  	this.comicList();
  }

  comicList(){
  	this.offset = 0;
  	this.encodedPath = this.baseUrl +'&format=comic'+'&apikey=' + this.publicKey + '&hash='+ this.md+ '&ts='+this.ts + '&limit='+ this.limit;
  	this.getComicsByUrl(this.encodedPath);
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

  comicSearch(ev: any){

  	let val = ev.target.value;
		if (val && val.trim() != '' && !Number(val) ) {
			this.searchByTitle(val);
  	}else{
  		if (val && val.trim() != '' && Number(val) && val.length > 3){
  			this.searchByYear(val);
  		} else {
  			this.comicList();
  		}
  	}
  }

  searchByTitle(name){
  	this.encodedPath = this.baseUrl +'&format=comic'+'&apikey=' + this.publicKey + '&hash='+ this.md+ '&ts='+this.ts + '&limit='+ this.limit + '&titleStartsWith=' + name;
  	this.getComicsByUrl(this.encodedPath)
  }

  searchByYear(year){
  	this.encodedPath = this.baseUrl +'&format=comic'+'&apikey=' + this.publicKey + '&hash='+ this.md+ '&ts='+this.ts + '&limit='+ this.limit +'&startYear='+year;
  	this.getComicsByUrl(this.encodedPath)
  }

  getComicsByUrl(url){
    this.http.get(url)
    .map(res => res.json()).subscribe(data => {
        this.comics = data.data.results;
        console.log(this.comics);
    },
    err => {
        console.log('error in MCU');
    });
  }

}
