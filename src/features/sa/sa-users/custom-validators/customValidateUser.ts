import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersService } from '../application/users.service';


// TODO: need to refactor
@ValidatorConstraint({ name: 'UserLoginIsExist', async: false })
@Injectable()
export class UserLoginIsExistRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: string) {
    try {
      const user = await this.usersService.findOneForCustomDecoratorByLogin(value, 'login')
      if(!user) {
        return true
      } else return false
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Login already exist`;
  }
}

@ValidatorConstraint({ name: 'UserMailIsExist', async: false })
@Injectable()
export class UserMailIsExistRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: string) {
    try {
      const user = await this.usersService.findOneForCustomDecoratorByEmail(value, 'email')
      if(!user) {
        return true
      } else return false
    } catch (e) {
      console.log('e', e)
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Mail already exist`;
  }
}

@ValidatorConstraint({ name: 'UserCodeIsConfirmed', async: false })
@Injectable()
export class UserCodeIsConfirmedRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: string) {
    try {
      const user = await this.usersService.findOneForCustomDecoratorByCode(value, 'code')
      if(user) {
        return true
      } else return false
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Code already confirmed`;
  }
}

@ValidatorConstraint({ name: 'UserMailCheck', async: false })
@Injectable()
export class UserMailCheckRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: string) {
    try {
      const user = await this.usersService.findOneForCustomDecoratorCheckMail(value, 'email')
      if(user) {
        return true
      } else return false
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Email already confirmed or not exist`;
  }
}

