// tslint:disable-next-line: import-name
import BigNumber from 'bignumber.js';

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

import { configuration } from '../configuration';

// tslint:disable-next-line: function-name
export function IsEthAddress(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'isEthAddress',
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            typeof value === 'string' &&
            configuration.web3.utils.isAddress(value)
          );
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return 'Is not valid Ethereum address';
        },
      },
    });
  };
}

// tslint:disable-next-line: function-name
export function IsPositiveBigNumber(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'isPositiveBigNumber',
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && new BigNumber(value).gt(0);
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return 'Is not positive BigNumber value';
        },
      },
    });
  };
}

// tslint:disable-next-line: function-name
export function IsPositiveOrZeroBigNumber(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'isPositiveBigNumber',
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && new BigNumber(value).gte(0);
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return 'Is not positive BigNumber value';
        },
      },
    });
  };
}
