"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[420],{420:(y,u,r)=>{r.r(u),r.d(u,{Tab3PageModule:()=>v});var a=r(8526),c=r(6010),g=r(9808),p=r(2382),d=r(655),e=r(1223),h=r(2777);function f(t,l){1&t&&(e.TgZ(0,"div",8),e._UZ(1,"ion-spinner",9),e.qZA())}function x(t,l){if(1&t&&(e.TgZ(0,"div",10),e._UZ(1,"ion-spinner",11),e.TgZ(2,"ion-text",12),e._uU(3),e.qZA(),e.qZA()),2&t){const n=e.oxw();e.xp6(3),e.hij(" ",n.load,"")}}function b(t,l){if(1&t&&(e.TgZ(0,"h3",13),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.hij(" Velkommen, ",n.kunde.billing.first_name," ")}}function _(t,l){if(1&t){const n=e.EpF();e.TgZ(0,"ion-card"),e.TgZ(1,"ion-card-content"),e.TgZ(2,"p",14),e._uU(3,"Email"),e.TgZ(4,"ion-icon",15),e.NdJ("click",function(){e.CHM(n);const o=e.oxw();return o.kundeEmail(o.customer.customer.id)}),e.qZA(),e.qZA(),e.TgZ(5,"p"),e._uU(6),e.qZA(),e.TgZ(7,"p",14),e._uU(8,"Telefon"),e.TgZ(9,"ion-icon",15),e.NdJ("click",function(){e.CHM(n);const o=e.oxw();return o.kundeTelefon(o.customer.customer.id)}),e.qZA(),e.qZA(),e.TgZ(10,"p"),e._uU(11),e.qZA(),e.TgZ(12,"p",14),e._uU(13,"Kontoadresse"),e.TgZ(14,"ion-icon",15),e.NdJ("click",function(){e.CHM(n);const o=e.oxw();return o.kundeAdresse(o.customer.customer.id)}),e.qZA(),e.qZA(),e.TgZ(15,"div",16),e._uU(16," Navn "),e.qZA(),e.TgZ(17,"div",17),e._uU(18),e.qZA(),e._UZ(19,"hr"),e.TgZ(20,"div",16),e._uU(21," Adresse "),e.qZA(),e.TgZ(22,"div",17),e._uU(23),e.qZA(),e._UZ(24,"hr"),e.TgZ(25,"div",16),e._uU(26," Postnr. og by "),e.qZA(),e.TgZ(27,"div",17),e._uU(28),e.qZA(),e._UZ(29,"br"),e.qZA(),e.qZA()}if(2&t){const n=e.oxw();e.xp6(6),e.Oqu(n.kunde.billing.email),e.xp6(5),e.Oqu(n.kunde.billing.phone),e.xp6(7),e.AsE(" ",n.kunde.billing.first_name," ",n.kunde.billing.last_name," "),e.xp6(5),e.AsE(" ",n.kunde.billing.address_1," ",n.kunde.billing.address_2," "),e.xp6(5),e.AsE(" ",n.kunde.billing.postcode," ",n.kunde.billing.city," ")}}let m=(()=>{class t{constructor(n,i,o){this.authService=n,this.router=i,this.alertController=o,this.kunde=null,this.customer=null,this.load=""}ngOnInit(){this.authService.kunde().subscribe(n=>{this.customer=n,console.log(this.customer.customer.id),this.authService.customer(this.customer.customer.id).subscribe(i=>{this.kunde=i}),console.log(this.kunde)})}console(){console.log(this.kunde)}logout(){this.authService.logout(),this.router.navigate(["/"])}kundeAdresse(n){return(0,d.mG)(this,void 0,void 0,function*(){yield(yield this.alertController.create({cssClass:"adressealert",header:"Kontoadresse",inputs:[{name:"first_name",type:"text",placeholder:"Fornavn"},{name:"last_name",type:"text",placeholder:"Efternavn"},{name:"address_1",type:"text",placeholder:"Vejnavn og nr."},{name:"address_2",type:"text",placeholder:"Etage, d\xf8r, mm."},{name:"postcode",type:"text",placeholder:"Postnummer"},{name:"city",type:"text",placeholder:"By"}],buttons:[{text:"Fortryd",role:"cancel",cssClass:"secondary",handler:()=>{console.log("Confirm Cancel")}},{text:"Bekr\xe6ft",handler:o=>{this.load="Skifter adresse",console.log(o),this.authService.addKundeAdresse(n,o).subscribe(s=>{this.kunde=s,console.log(this.kunde),this.load=""})}}]})).present()})}kundeTelefon(n){return(0,d.mG)(this,void 0,void 0,function*(){yield(yield this.alertController.create({cssClass:"telefonalert",header:"Telefonnummer",inputs:[{name:"phone",type:"number",placeholder:"Telefon"}],buttons:[{text:"Fortryd",role:"cancel",cssClass:"secondary",handler:()=>{console.log("Confirm Cancel")}},{text:"Bekr\xe6ft",handler:o=>{this.load="Skifter nummer",console.log(o),this.authService.addKundeTelefon(n,o.phone).subscribe(s=>{this.kunde=s,console.log(this.kunde),this.load=""})}}]})).present()})}kundeEmail(n){return(0,d.mG)(this,void 0,void 0,function*(){yield(yield this.alertController.create({cssClass:"emailealert",header:"Email",inputs:[{name:"email",type:"text",placeholder:"Email"}],buttons:[{text:"Fortryd",role:"cancel",cssClass:"secondary",handler:()=>{console.log("Confirm Cancel")}},{text:"Bekr\xe6ft",handler:o=>{this.load="Skifter email",console.log(o.email),this.authService.addKundeEmail(n,o.email).subscribe(s=>{this.kunde=s,console.log(this.kunde),this.load=""})}}]})).present()})}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(h.$),e.Y36(c.F0),e.Y36(a.Br))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-tab3"]],decls:12,vars:4,consts:[[1,"headergrid"],["alt","logo","height","40","src","/assets/icon/logo.svg"],["color","primary"],["class","spin",4,"ngIf"],["class","loadbar",4,"ngIf"],["class","ion-text-center",4,"ngIf"],[4,"ngIf"],["color","tertiary","expand","block",3,"click"],[1,"spin"],["color","primary","name","crescent"],[1,"loadbar"],["color","light","name","crescent"],["color","light"],[1,"ion-text-center"],[1,"contentheading"],["button","","size","small","name","pencil",1,"edit",3,"click"],[1,"adresselabel"],[1,"adressevalue"]],template:function(n,i){1&n&&(e.TgZ(0,"ion-content"),e.TgZ(1,"div",0),e._UZ(2,"img",1),e.TgZ(3,"ion-title",2),e._uU(4,"Din Profil"),e.qZA(),e._UZ(5,"div"),e.qZA(),e.YNc(6,f,2,0,"div",3),e.YNc(7,x,4,1,"div",4),e.YNc(8,b,2,1,"h3",5),e.YNc(9,_,30,8,"ion-card",6),e.TgZ(10,"ion-button",7),e.NdJ("click",function(){return i.logout()}),e._uU(11,"Log ud"),e.qZA(),e.qZA()),2&n&&(e.xp6(6),e.Q6J("ngIf",!i.kunde),e.xp6(1),e.Q6J("ngIf",i.load),e.xp6(1),e.Q6J("ngIf",i.kunde),e.xp6(1),e.Q6J("ngIf",i.kunde))},directives:[a.W2,a.wd,g.O5,a.PQ,a.yW,a.PM,a.FN,a.gu,a.YG],styles:["ion-text[_ngcontent-%COMP%]{text-align:center;font-size:22px;font-family:Quicksand}ion-card-header[_ngcontent-%COMP%]{text-align:center}ion-button[_ngcontent-%COMP%]{--border-radius:100px;margin:10px}ion-icon[_ngcontent-%COMP%]{margin:0;color:#304f23}#adresse[_ngcontent-%COMP%]{text-align:center;font-size:20px}ion-card[_ngcontent-%COMP%]{background-color:#fff;border-radius:10px;margin:20px 0}ion-card-content[_ngcontent-%COMP%]{overflow:auto}.spin[_ngcontent-%COMP%]{text-align:center;margin-top:100px;margin-bottom:50px}.spin[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%]{transform:scale(3);stroke:#fff;fill:#fff}.statusbokspause[_ngcontent-%COMP%]{width:100%;padding:5px;border-radius:5px;border-style:solid;border-width:2px;background-color:#edeebe;border-color:#5f6600;text-align:center}.loadbar[_ngcontent-%COMP%]{width:200px;height:30px;margin:auto;display:flex;align-items:center;justify-content:center;border-radius:25px;background-color:#46b064;text-align:center;position:fixed;left:50%;transform:translate(-50%);top:90%;z-index:100}"]}),t})();var T=r(581);const Z=[{path:"",component:m}];let k=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[c.Bz.forChild(Z)],c.Bz]}),t})(),v=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[a.Pc,g.ez,p.u5,T.e,c.Bz.forChild([{path:"",component:m}]),k]]}),t})()}}]);