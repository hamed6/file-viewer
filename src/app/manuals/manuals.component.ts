import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { UserprofilesService } from '../userprofiles.service';
import { GeneralInfoComponent } from './general-info.component';
import { promise } from 'protractor';
import { MatSnackBar } from '@angular/material';

// import {userModel} from 'backend/models/userProfile.js';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


var sharedImo;
var objectStoreName;
// var userDocument = {};
// var  msg:any;

@Component({
  selector: 'app-manuals',
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.css']
})



export class ManualsComponent implements OnInit {


  constructor(private userprofile: UserprofilesService, private _bottomSheet: MatBottomSheet, private router: Router, private _matSnack: MatSnackBar) { }

  sharedUN: any;
  sharedImoTemp: any;
  
  // userDocument: any;

  // @Input('name') imoNumber: String;

  generalInfo(): void {
    this._bottomSheet.open(GeneralInfoComponent);
  };


  // TO HIDE ALL IFRAME BEFORE SHOW THE CLICKED ONE
  cleanIfram() {
    var getIfram = document.getElementsByTagName("iframe");
    for (var i = 0; i < getIfram.length; i++) {
      getIfram[i].style.display = "none";
    }
  }

  // CLICK EVEN TO SHOW EACH SELECTED FILE
  onClickFileOne() { this.cleanIfram(); document.getElementById("fileloc1").style.display = "block"; };
  onClickFileTwo() { this.cleanIfram(); document.getElementById("fileloc2").style.display = "block"; };
  onClickFileThree() { this.cleanIfram(); document.getElementById("fileloc3").style.display = "block"; };
  onClickFileFour() { this.cleanIfram(); document.getElementById("fileloc4").style.display = "block"; };
  onClickFileFive() { this.cleanIfram(); document.getElementById("fileloc5").style.display = "block"; };
  onClickFileSix() { this.cleanIfram(); document.getElementById("fileloc6").style.display = "block"; };
  onClickFileSeven() { this.cleanIfram(); document.getElementById("fileloc7").style.display = "block"; };
  onClickFileEight() { this.cleanIfram(); document.getElementById("fileloc8").style.display = "block"; };
  onClickFileNine() { this.cleanIfram(); document.getElementById("fileloc9").style.display = "block"; };
  onClickFileTen() { this.cleanIfram(); document.getElementById("fileloc10").style.display = "block"; };
  onClickFileEleven() { this.cleanIfram(); document.getElementById("fileloc11").style.display = "block"; };

  logOut() {
    this.userprofile.cleanAll();
    this.router.navigate(['./login']);
  }



  funcBrowserDB(userObj, matSnack) {
    // var hamedData
    // this.userprofile.getDocumentImo(sharedImo).subscribe(data => {
    //   hamedData = data;
    //   console.log(`.... ${hamedData}`)
    // });

    // private userprofile: UserprofilesService
    // const section = document.querySelector('section');
    userObj.getUserImo(sharedImo).subscribe((res)=>{
      if(res.lashmatetool===true){
        // console.log('---------------------has zip file'); 

        let aElement=document.createElement('a')
        // aElement.download='GitHub-Mark'
        // aElement.href='../../assets/doc/lashmate/GitHub-Mark.zip'
        let txt=document.createTextNode('Download Lashmate tool')
        aElement.style.cssText="font-size:11px;padding: 1%;color:black;font-style: italic;text-decoration: none;"
        
        aElement.append(txt)
        // aElement.href='../../assets/doc/lashmate/Lashmate.zip'
        // console.log('------------------address', res.lashmateaddress);
        
        aElement.href=res.lashmateaddress

        let aParetnLocation=document.getElementById('ziplocation').parentNode
        let aLocation=document.getElementById('ziplocation')
        aParetnLocation.insertBefore(aElement,aLocation)


        
        
      }
      else{
        // console.log('-------------------has NOT zip file');
        
      }
    })

    const listOfFiles = [
      { 'name': 'fileloc1' },
      { 'name': 'fileloc2' },
      { 'name': 'fileloc3' },
      { 'name': 'fileloc4' },
      { 'name': 'fileloc5' },
      { 'name': 'fileloc6' },
      { 'name': 'fileloc7' },
      { 'name': 'fileloc8' },
      { 'name': 'fileloc9' },
      { 'name': 'fileloc10' },
      { 'name': 'fileloc11' }
    ]

    // A DICTIONARY TO LINK KEYS FROM FILELOC DB TO LISTITEM HTML TEMPLATE
    const listItem = {
      "fileloc1": "listitem1", "fileloc2": "listitem2", "fileloc3": "listitem3",
      "fileloc4": "listitem4", "fileloc5": "listitem5", "fileloc6": "listitem6",
      "fileloc7": "listitem7", "fileloc8": "listitem8", "fileloc9": "listitem9",
      "fileloc10": "listitem10", "fileloc11": "listitem11",
    };

    // const videos = [
    //   { 'name': 'crystal' },
    //   { 'name': 'elf' },
    //   { 'name': 'frog' },
    //   { 'name': 'monster' },
    //   { 'name': 'pig' },
    //   { 'name': 'rabbit' }
    // ];
    // Create an instance of a db object for us to store our database in
    let db;


    function init() {


      var userDocument;
      // var userDocumentVersion;

      // TO CREATE MENU AND LIST ITEM
      userObj.getDocumentImo(sharedImo).subscribe(
        data => {
          userDocument = data;
          // userDocumentVersion = userDocument.docversion;
          // delete userDocument.docversion;
          // console.log(`${userDocumentVersion}....`)
        }
        , error => {
          // SERVER/SERVICE IS NOT RESPONDE 
          // CHECK DB, IF ITS EXIST LOOP THROUGH AND CREATE MENU AND ITEM
          // console.log(`Service is not available, checking IDB ...${error}`);
          for (let index = 0; index <= listOfFiles.length; index++) {
            let key = listOfFiles[index].name;
            // console.log(`-----begining of for loop ${listOfFiles[index].name}`)
            let objectStore = db.transaction(objectStoreName).objectStore(objectStoreName);
            let request = objectStore.get(key);
            request.onsuccess = function () {
              if (request.result) {
                // console.log(`${typeof request.result.pdf}`)
                displayManual(request.result.pdf, request.result.name);
              }
              else {
                document.getElementById(listItem[key]).style.display = "none";
                // console.log(`inside else -----${listItem[key]}`);
              }
            };
            request.onerror = () => {
              // document.getElementById(listOfFiles[index].name).style.display = "none";
              // console.log(`not found------ ${listOfFiles[index].name}`)
              // document.getElementById(listOfFiles[index].name).setAttribute('src')
            };
            cleanIframInside();
          }
        }, completed => {
          // console.log(`Service is completed , checking IDB ..`);
          var objLen = Object.keys(userDocument).length;
          var counter = 0;
          
          // VERSION COMPARISON, IF VERSION IS OLD, FIRST DELETE ALL SAVED OBJECT.

          for (let key in userDocument) {
            if (userDocument[key] != "") {
              // console.log(`--------------------------------------- ..${key} ${userDocument[key]}`);
              // console.log(`--------before---${document.getElementById(key).getAttribute('src')}`);
              document.getElementById(key).setAttribute("src", userDocument[key]);
              // TO CONNECT TO DB AND FIND CORRESPONDED FILE
              let objectStore = db.transaction(objectStoreName).objectStore(objectStoreName);
              let request = objectStore.get(key);
              // if (request.error){
              // console.log(`  request to IDB error  ---- ${request.error}`);
              // }
              request.onsuccess = () => {

                // if (request.onerror) {
                  // console.log(` error from idb   ---- `);
                // }
                // if (request.result && request.result.dv < ) {
                  // console.log(` version diff, delet db  ----  `);
                  // db.transaction([objectStoreName], 'readwrite').objectStore(objectStoreName).delete(key);
                // }
                // else {
                  // console.log(`request was not found, so  save to IDB  ---- `);
                  let pdfBlob = fetch(userDocument[key]).then(res =>
                    res.blob()
                  );
                  Promise.all([pdfBlob])
                    .then(function (values) {
                      storeManual(values[0], key);
                      counter++;
                    })
                    .then(function () {
                      if (objLen == counter) {
                        let msg = "Application is ready!"
                        matSnack.open(msg, '', { duration: 5000, });

                      }
                    })
                // }

              }

              request.onerror = function () {
                // console.log(`  error req ---- ${request.onerror}`);

              }
            }
            else {
              counter++
              document.getElementById(listItem[key]).style.display = "none";
              document.getElementById(listItem[key]).style.padding = "0px";
              document.getElementById(listItem[key]).parentElement.style.padding= "0px";
              // console.log(`--------after---------${document.getElementById(key).getAttribute('src')}`);
              let objectStore = db.transaction(objectStoreName).objectStore(objectStoreName)
              let request = objectStore.get(key);
              request.onsuccess = () => {
                db.transaction([objectStoreName], 'readwrite').objectStore(objectStoreName).delete(key);
              }
            }
            cleanIframInside();
          }
        }
      )
    }




    // TO CHANGE IFRAME DISPLAY TO NONE 
    function cleanIframInside() {
      var getIfram = document.getElementsByTagName("iframe");
      for (var i = 0; i < getIfram.length; i++) {
        getIfram[i].style.display = "none";
      }
    }
  

    // Define the storeManual() function
    function storeManual(pdfBlob, name) {
      // Open transaction, get object store; make it a readwrite so we can write to the IDB
      let objectStore = db.transaction([objectStoreName], 'readwrite').objectStore(objectStoreName);
      // Create a record to add to the IDB
      let record = {
        pdf: pdfBlob,
        name: name,
        // dv : docversion,
      }

      // Add the record to the IDB using add()
      let request = objectStore.add(record);

      request.onsuccess = function () {
        // console.log('Record addition attempt finished');
      }

      request.onerror = function () {
        // console.log(request.error);
      }

    };

    // Define the displayManual() function
    function displayManual(fileBlob, title) {
      // Create object URLs out of the blobs
      let mp4URL = URL.createObjectURL(fileBlob);
      document.getElementById(title).setAttribute("src", mp4URL);
    }


    // Open our database; it is created if it doesn't already exist
    // (see onupgradeneeded below)


    let request = window.indexedDB.open(sharedImo, 1.0);

    // onerror handler signifies that the database didn't open successfully
    request.onerror = function () {
      // console.log('Database failed to open');
      let msg = 'Your browser does not support offline version!';
      matSnack.open(msg, 'Error!', { duration: 5000 });
      // matSnack.open(msg,'', { duration: 4000,});
    };

    // onsuccess handler signifies that the database opened successfully
    request.onsuccess = function () {
      // console.log('Database opened succesfully');

      // Store the opened database object in the db variable. This is used a lot below
      db = request.result;
      // sharedImo = localStorage.getItem('sharedImo');
      init();
    };

    // Setup the database tables if this has not already been done
    request.onupgradeneeded = function (e) {

      // Grab a reference to the opened database
      // let db = e.target.re;
      let db = request.result;
      // var removeOldVer=window.indexedDB.deleteDatabase(sharedImo);
      // removeOldVer.onsuccess=function(){
      //   console.log('old db removed----');
      //   init();
      // }
      // Create an objectStore to store our videos in (basically like a single table)
      // including a auto-incrementing key
      let objectStore = db.createObjectStore(objectStoreName, { keyPath: 'name' });

      // Define what data items the objectStore will contain
      objectStore.createIndex('pdf', 'pdf', { unique: false });
      // objectStore.createIndex('webm', 'webm', { unique: false });

      // console.log('Database setup complete');

      // if (e.oldVersion < 2) {
      //   var removeOldVer = window.indexedDB.deleteDatabase(sharedImo);
      //   removeOldVer.onsuccess = function () {
      //     console.log('old db removed----');
      //     let objectStore = db.createObjectStore(objectStoreName, { keyPath: 'name' });
      //     objectStore.createIndex('pdf', 'pdf', { unique: false });
      //     init();
      //   }
      // }
    };

  }



  ngOnInit() {
    sharedImo = localStorage.getItem('sharedImo');
    this.sharedUN = localStorage.getItem('sharedUN');
    objectStoreName = localStorage.getItem('sharedUN');
    this.sharedImoTemp = localStorage.getItem('sharedImo');

    if (this.sharedUN == null) { this.router.navigate(['./login']); }
    else {

      this.funcBrowserDB(this.userprofile, this._matSnack);

      // this.userprofile.funcObser(sharedImo).
      // subscribe(
      //   data=>{console.log(`-----data from observable ${data['username']}`)}
      //   ,error=>console.log(`error from subscibe${error}`)
      //   ,()=>console.log(`completed---`)
      // )

      // let tempSrc=document.getElementById('fileloc1').getAttribute('src');
      // if (localStorage.getItem('srcGiven')==undefined){
      // localStorage.setItem('srcGiven',this.srcGiven)
      // PASS IMO FROM LOGIN TO USERPROFILE TO SET SHIP NAME


      // PASS IMO FROM LOGIN TO USERDOCUMENT TO SET IFAMES AND MENU WITH PROPER DOCUMENT 
      // this.userprofile.getDocumentImo(sharedImo).subscribe(data => {
      //   this.userDocument = data;
      //   for (let key in this.userDocument) {
      //     if (this.userDocument[key] != "") {
      //       document.getElementById(key).setAttribute("src", this.userDocument[key]);
      //     }
      //     else {

      //       document.getElementById(this.listItem[key]).style.display = "none";
      //     }
      //   };
      // });
      // this.cleanIfram();

    }

  }
}