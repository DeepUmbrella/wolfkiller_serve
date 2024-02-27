import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class SignInValidationPipe implements PipeTransform {
  transform(value) {
    return value;
  }
}
