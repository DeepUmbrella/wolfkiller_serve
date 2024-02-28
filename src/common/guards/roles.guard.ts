import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const matchRoles = (roles, resRoles) => {
  console.log('need roles: ', roles);
  console.log('request roles:', resRoles);
  console.log('roles pass');

  return false;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const user = request?.user || 'admin';
    return matchRoles(roles, user.roles);
  }
}
