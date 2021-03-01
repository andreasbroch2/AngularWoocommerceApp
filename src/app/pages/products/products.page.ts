import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { ActivatedRoute, Router} from '@angular/router';
import { ModalController, PickerController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(private authService: AuthenticationService, private activatedRoute: ActivatedRoute,  private pickerController: PickerController, private router: Router, private modalController: ModalController) { }
  details= null;
  hovedretter = null;
  snacks = null;
  drikkevarer = null;
  categories = null;
  hideMeHoved = false;
  hideMeSnacks = false;
  hideMeDrikkevarer = false;
  @Input() subid: number;

  ngOnInit() {
    this.authService.categories().subscribe(result => {
      this.categories = result;
      this.categories = this.categories.sort((a, b) => a.id - b.id);
      console.log(this.categories);
    })
    this.authService.hovedret().subscribe(result => {
      this.hovedretter = result;
      console.log(result);
    })
    this.authService.snacks().subscribe(result => {
      this.snacks = result;
      console.log(result);
    })
    this.authService.drikkevarer().subscribe(result => {
      this.drikkevarer = result;
      console.log(result);
    })
  }
async openPicker(prodid){
  const picker = await this.pickerController.create({
    columns: [{
      name: 'Antal',
      cssClass: 'picker',
      options: [
        {text: '1',value: 1},
        {text: '2',value:2},
        {text: '3',value:3},
        {text: '4',value:4},
        {text: '5',value:5},
        {text: '6',value:6},
        {text: '7',value:7},
        {text: '8',value:8},
        {text: '9',value:9},
        {text: '10',value:10},
       ]
    }],
    buttons: [
      {
        text: 'Fortryd',
        role: 'cancel'
      },
      {
        text: 'Tilføj',
        handler: (value) => {
          console.log(value.Antal.value);
          console.log(prodid);
          this.authService.addproduct(this.subid, prodid, value.Antal.value).subscribe(result => {
            this.details = result;
            if (Number(this.details.total) > 599 &&	this.details.shipping_lines[0].id==50870){
              console.log('over');
            }
            console.log(result);
            this.modalController.dismiss(this.details)
        }
      )
    }
    }
    ]
  });

  await picker.present();
}
hideHoved() {
  if(this.hideMeHoved == false)
  this.hideMeHoved = true;
  else this.hideMeHoved = false;
}
hideSnacks() {
  if(this.hideMeSnacks == false)
  this.hideMeSnacks = true;
  else this.hideMeSnacks = false;
}
hideDrikkevarer() {
  if(this.hideMeDrikkevarer == false)
  this.hideMeDrikkevarer = true;
  else this.hideMeDrikkevarer = false;
}
}
