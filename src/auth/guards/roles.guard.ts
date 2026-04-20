import {CanActivate, ExecutionContext,Injectable,} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { user_role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<user_role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('User yang login:', user); 
console.log('Role yang diminta:', requiredRoles);

    if (!user || !user.role) {
      return false;
    }
    return requiredRoles.some(
  (role) =>
    role.toString().toLowerCase() === user.role?.toString().toLowerCase(),
);
  }
}
