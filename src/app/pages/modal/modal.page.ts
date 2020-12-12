import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  product = null;

  @Input() subid: number;
  @Input() prodid: number;

  constructor(private authService: AuthenticationService, private pickerController: PickerController ) { }

  ngOnInit() {
    this.authService.product(this.prodid).subscribe(result => {
      this.product = result;
  })
  };

  async openPicker(numColumns = 1, numOptions = 5, columnOptions = ['1','2','3','4','5']){
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(`Got Value ${value}`);
          }
        }
      ]
    });

    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      })
    }

    return options;
  }
}
