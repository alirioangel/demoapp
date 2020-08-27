import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  private request;
  private context: ExecutionContext;

  canActivate(context: ExecutionContext): boolean {
    this.context = context;
    this.request = context.switchToHttp().getRequest();
    const { role } = this.request;
    if (role === 'ADMIN') return true;
  }
}
