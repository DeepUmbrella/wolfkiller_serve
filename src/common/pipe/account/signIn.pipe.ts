import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { SignInDto } from 'src/modules/account/account.dto';

@Injectable()
export class SignInValidationPipe implements PipeTransform {
  transform(value, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    return value;
  }
}
