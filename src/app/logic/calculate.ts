// Math Library to get more accurate operations

import Big from "big.js";

import operate from "./operate";
import isNumber from "./isNumber";
import { State } from '../models/state';

/**
 * Same logic used in react Calculator, but modified in some lines to get it working with Angular and to modify how 
 * the calculator works.
 * 
 * Some auxiliary functions are imported like IsNumber (used to understand if that value is a Number)
 * and operate (used to operate the calculator with the Big library)
 * 
 * @param state:State   class that contains all our numbers
 * @param buttonName:string    What we clicked
 */

/** DESCRIPTION
 * 
 * Given a button name and a calculator data state, return an updated
 * calculator data state.
 *
 * Calculator data state contains:
 *   total:String      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 * 
 * USAGE
 * 
 * AC: returns all at starting point with 0 as first number (state.total);
 * 0 - 9: selects that number;
 * . : makes the number decimal;
 * %: does percentage of that number;
 * +/-: change sign;
 * (+, -, x, /, =): do their operations;
 * 
 * Other comments are on written directly in the functions code
 */


export function calculate(state: State, buttonName: string) {

  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null,
    };
  }

  if (isNumber(buttonName)) {
    if (buttonName === "0" && state.next === "0") {
      return {
        total: state.total,
        next: state.next,
        operation: state.operation
      };
    }

    // If there is an operation, update next
    if (state.operation) {
      if (state.next) {
        return {
            total: state.total,
            next: state.next + buttonName,
            operation: state.operation
            };
      }
      return { total: state.total, next: buttonName, operation: state.operation };
    }

    // If there is no operation, update next and clear the value
    if (state.next) {
      const next = state.next === "0" ? buttonName : state.next + buttonName;
      return {
        next,
        total: null,
        operation: state.operation
      };
    }
    return {
      next: buttonName,
      total: null,
      operation: state.operation
    };
  }

  if (buttonName === "%") {
    if (state.next) {
      return {
        total: state.total,
        next: Big(state.next)
          .div(Big("100"))
          .toString(),
        operation: state.operation
      };
    }
    if (state.total && !state.next) {
      return {
        total: Big(state.total)
          .div(Big("100"))
          .toString(),
        next: state.next,
        operation: state.operation
      };
    }
    return {
        total: state.total,
        next: state.next,
        operation: state.operation
    };
  }

  if (buttonName === ".") {
    if (state.next) {
      // ignore a . if the next number already has one
      if (state.next.includes(".")) {
        return {
            total: state.total,
            next: state.next,
            operation: state.operation};
      }
      return { total: state.total, next: state.next + "." , operation: state.operation };
    }

    return { total: state.total, next: "0.", operation: state.operation };
  }

  if (buttonName === "=") {
    if (state.next && state.operation) {
      return {
        total: operate(state.total, state.next, state.operation),
        next: null,
        operation: null,
      };
    } else {
      // '=' with no operation, nothing to do
      return {
            total: state.total,
            next: state.next,
            operation: state.operation,
      };
    }
  }

  // changing sign, next or total in Float and go back to string
  if (buttonName === "+/-") {
    if (state.next) {
      return {total: state.total, next: (-1 * parseFloat(state.next)).toString(), operation: state.operation };
    }
    if (state.total) {
      return { total: (-1 * parseFloat(state.total)).toString(), next: state.next, operation: state.operation };
    }
    return {total: state.total, next: state.next, operation: state.operation};
  }

  // Button must be an operation

  // User pressed an operation button and there is an existing operation
  // Case when you already put all state value and you want to make another operations to the result

  if (state.operation) {
    return {
      total: operate(state.total, state.next, state.operation),
      next: null,
      operation: buttonName,
    };
  }

  // no operation yet, but the user typed one

  // The user hasn't typed a number yet, just save the operation
  if (!state.next) {
    return { total: state.total,
        next: state.next,
        operation: buttonName, };
  }

  // save the operation and shift 'next' into 'total'
  return {
    total: state.next,
    next: null,
    operation: buttonName,
  };
}