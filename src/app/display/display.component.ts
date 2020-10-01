import { Component, OnInit} from '@angular/core';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  // Create the display part of the calculator.
  // All logic part is done by displayService

  constructor(public displayService: DisplayService) { }

  ngOnInit(): void {

    // Start display Value

    this.displayService.setShowedValue("0")
  }

}
