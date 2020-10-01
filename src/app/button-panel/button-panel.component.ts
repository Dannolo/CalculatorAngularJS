import { Component, OnInit } from '@angular/core';

//Importing local model and services
import { Button } from '../models/button';
import { BUTTONS } from "../buttonsComplete";
import { DisplayService } from '../display.service';
import { ButtonpanelService } from '../buttonpanel.service'

//Importing the logic
import { calculate } from '../logic/calculate';

// Create the clickable panel part of the calculator.
// displayService and buttonpanelService are the service where we take most important function to get all to work.
// buttons: Button[]     contains all the buttons;
// setDisplay(Button): void   core function where we get the Button.name that we clicked and we update the Display going throught calculate function.

@Component({
  selector: 'app-button-panel',
  templateUrl: './button-panel.component.html',
  styleUrls: ['./button-panel.component.css']
})
export class ButtonPanelComponent implements OnInit {

  buttons: Button[];

  constructor(private displayService: DisplayService, public buttonpanelService: ButtonpanelService) {
  }

  ngOnInit(): void {

    // Retrieving all buttons from BUTTONS

    this.buttons = BUTTONS;
    this.buttonpanelService.sortButton(this.buttons);
  }

  getButtonName(button: Button): string {
    return button.name;
  }

  setDisplay(button: Button): void {

    this.displayService.setDisplay(calculate(this.displayService.state, this.getButtonName(button)))

    // FOR DEBUG PURPOSE
    // console.log(calculate(this.displayService.state, this.getButtonName(button)));
    // console.log(this.displayService.state);

  }


}
