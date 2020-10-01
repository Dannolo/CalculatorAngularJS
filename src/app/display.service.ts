import { Injectable } from '@angular/core';
import { State } from './models/state';


@Injectable({
  providedIn: 'root'
})

export class DisplayService {

/** This service gathers and reorganize the data returned from calculate function. 
 * SetDisplay contains all the set functions used to modified state attributes.
 * 
 * @param value: string,    value displayed on the calculator
 * @param state: State      contains value that are going to be used to calculate all calculator' operations
 */

  value: string;

  state: State = {
    total: "0",
    next: null,
    operation: null
  };

  setDisplay(obj): void {

    this.setValue(obj.total)
    this.setNext(obj.next)
    this.setOperation(obj.operation)

    if(obj.total == null && obj.next == null && obj.operation == null){
      this.state = this.clearDisplay()
    }

    if(obj.next != null){
      this.setShowedValue(this.state.next)
    }else{
      this.setShowedValue(this.state.total)
    }
  }

  setValue(value: string): void {
    this.state.total = value;
  }

  setNext(value: string): void {
    this.state.next = value;
  }

  setOperation(value: string): void {
    this.state.operation = value;
  }

  clearDisplay(): State{
    return {
      total: "0",
      next: null,
      operation: null
    }
  }

  setShowedValue(value: string): void{
    this.value = value;
  }
  

}
