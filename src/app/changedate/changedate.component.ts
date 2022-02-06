import { Component, OnInit, Input } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service"
import { ModalController, LoadingController } from "@ionic/angular"

@Component({
  selector: "app-changedate",
  templateUrl: "./changedate.component.html",
  styleUrls: ["./changedate.component.scss"],
})
export class ChangedateComponent implements OnInit {
  sundays = [];
  constructor(
    private authService: AuthenticationService, 
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {}
  saveddate = "";
  saveDate(date) {
    this.saveddate = date;
  }
  @Input() subid: number;
  ngOnInit() {
    var sunday = new Date();
    sunday.setDate(sunday.getDate() + 4);
    sunday.setDate(sunday.getDate() + 7 - sunday.getDay());
    for (var i = 0; i < 6; i++) {
      this.sundays.push(new Date(sunday.getTime()));
      sunday.setDate(sunday.getDate() + 7);
    }
  }
  changeDate() {
    this.presentLoading();
    let date = new Date(this.saveddate);
    let datestring = date.toISOString();
    this.authService.changeDate(datestring, this.subid).subscribe((result) => {
      this.modalController.dismiss(result);
      this.loadingController.dismiss();
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Arbejder...",
      translucent: true,
    });
    return await loading.present();
  }
}
