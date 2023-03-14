import { SetMetadata } from '@nestjs/common';
export const ALLOW_KEY = 'allowAnon';
export const AllowAnon = (allowAnon = true) =>
  SetMetadata(ALLOW_KEY, allowAnon);
