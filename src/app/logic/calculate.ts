// Math Library to get more accurate operations

import Big from "big.js";

import operate from "./operate";
import isNumber from "./isNumber";
import { State } from '../models/state';

/**
 * Same logic used in react Calculator, but modified in some lines to get it working with Angular
 * @param obj:State   class that contains all our numbers
 * @param buttonName:string    What we clicked
 */

/**DESCRIPTION
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 *   total:String      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 */
export function calculate(obj: State, buttonName: string) {
  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null,
    };
  }

  if (isNumber(buttonName)) {
    if (buttonName === "0" && obj.next === "0") {
      return {
        total: obj.total,
        next: obj.next,
        operation: obj.operation
      };
    }
    // If there is an operation, update next
    if (obj.operation) {
      if (obj.next) {
        return {
            total: obj.total,
            next: obj.next + buttonName,
            operation: obj.operation
            };
      }
      return { total: obj.total, next: buttonName, operation: obj.operation };
    }
    // If there is no operation, update next and clear the value
    if (obj.next) {
      const next = obj.next === "0" ? buttonName : obj.next + buttonName;
      return {
        next,
        total: null,
        operation: obj.operation
      };
    }
    return {
      next: buttonName,
      total: null,
      operation: obj.operation
    };
  }

  if (buttonName === "%") {
    if (obj.operation && obj.next) {
      const result = operate(obj.total, obj.next, obj.operation);
      return {
        total: Big(result)
          .div(Big("100"))
          .toString(),
        next: null,
        operation: null,
      };
    }
    if (obj.next) {
      return {
        total: obj.total,
        next: Big(obj.next)
          .div(Big("100"))
          .toString(),
        operation: obj.operation
      };
    }
    return {
        total: obj.total,
        next: obj.next,
        operation: obj.operation
    };
  }

  if (buttonName === ".") {
    if (obj.next) {
      // ignore a . if the next number already has one
      if (obj.next.includes(".")) {
        return {
            total: obj.total,
            next: obj.next,
            operation: obj.operation};
      }
      return { total: obj.total, next: obj.next + "." , operation: obj.operation };
    }
    return { total: obj.total, next: "0.", operation: obj.operation };
  }

  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
      };
    } else {
      // '=' with no operation, nothing to do
      return {
            total: obj.total,
            next: obj.next,
            operation: obj.operation,
      };
    }
  }

  if (buttonName === "+/-") {
    if (obj.next) {
      return {total: obj.total, next: (-1 * parseFloat(obj.next)).toString(), operation: obj.operation };
    }
    if (obj.total) {
      return { total: (-1 * parseFloat(obj.total)).toString(), next: obj.next, operation: obj.operation };
    }
    return {};
  }

  // Button must be an operation

  // User pressed an operation button and there is an existing operation
  if (obj.operation) {
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName,
    };
  }

  // no operation yet, but the user typed one

  // The user hasn't typed a number yet, just save the operation
  if (!obj.next) {
    return { total: obj.total,
        next: obj.next,
        operation: buttonName, };
  }

  // save the operation and shift 'next' into 'total'
  return {
    total: obj.next,
    next: null,
    operation: buttonName,
  };
}