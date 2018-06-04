import { Component, ViewChild, ElementRef, Inject } from "@angular/core";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

class Equipment {
  constructor(public name: string) {}
}

class Hire extends Equipment {
  constructor(public name: string, quantity: number) {
    super(name);
  }
}

class Own extends Equipment {
  constructor(public name: string, driver: string) {
    super(name);
  }
}

class Driver {
  constructor(public name: string, public id: number) {

  }
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  ownForm: FormGroup;
  hireForm: FormGroup;
  closeResult: string;

  equipments: Equipment[] = [new Hire("Hire 1", 1), new Own("Own 1", "Hai")];
  drivers: Driver[] = [new Driver("Driver 1", 1), new Driver("Dirver 2", 2)];

  @ViewChild("hireDialog") hireDialog: ElementRef;
  @ViewChild("ownDialog") ownDialog: ElementRef;



  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.hireForm = this.fb.group({
      name: "",
      quantity: "",
    });
    this.ownForm = this.fb.group({
      name: "",
      driver: "",
    });
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  openDialog(equipment: Equipment) {
    let dialogContent: ElementRef;

    if (equipment instanceof Hire) {
      dialogContent = this.hireDialog;
    }

    if (equipment instanceof Own) {
      dialogContent = this.ownDialog;
    }

    this.modalService.open(dialogContent).result.then(
      res => {
        switch (res) {
          case "saveHire":
            console.log("Saving hire");
            break;
          case "saveOwn":
            console.log("Saving own");
            break;
          default:
            break;
        }
      },
      dismiss => {},
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
