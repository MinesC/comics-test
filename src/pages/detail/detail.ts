import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import {Md5} from 'ts-md5/dist/md5';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})


export class DetailPage {
	comic: any;
	creators: any;
	characters: any;
	segments: string ="description";

	publicKey = '96558ca279bf14f5aead546ced0cdd2b';
	ts = new Date().getTime();
	md = Md5.hashStr(this.ts+'acabe8a3a268841c5fb1499bfbcd43829ee8b1e3'+this.publicKey);



  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.comic = navParams.get('comic');
    this.getCharacters();
    this.getCreators();
    console.log(this.comic);
  }

  getCharacters(){
  	let url = this.comic.characters.collectionURI + '?&apikey='+ this.publicKey + '&hash=' + this.md + '&ts=' +this.ts;
  	this.http.get(url)
    .map(res => res.json()).subscribe(data => {
        this.characters =  data.data.results;
        console.log(this.characters);
    },
    err => {
        console.log('error in MCU');
        return
    });
  }

  getCreators(){
  	 	let url = this.comic.creators.collectionURI + '?&apikey='+ this.publicKey + '&hash=' + this.md + '&ts=' +this.ts;
        		    this.http.get(url)
          .map(res => res.json()).subscribe(data => {
              this.creators=  data.data.results;
              console.log(this.creators);
          },
          err => {
              console.log('error in MCU');
              return
          });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
