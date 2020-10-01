import { Injectable } from '@angular/core';
import { Button } from './models/button';

@Injectable({
  providedIn: 'root'
})

/**
 * Used to slice buttons in row for a clean view of the calculator
 */

export class ButtonpanelService {

  row1: Button[];
  row2: Button[];
  row3: Button[];
  row4: Button[];
  row5: Button[];

  sortButton(buttonArray: Button[]): void {

    this.row1 = buttonArray.slice(0, 4);
    this.row2 = buttonArray.slice(4, 8);
    this.row3 = buttonArray.slice(8, 12);
    this.row4 = buttonArray.slice(12, 16);
    this.row5 = buttonArray.slice(16, 19);

  }

}
