import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('🛡️ JWT Guard activated');
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('🛡️ JWT Guard handleRequest:', { 
      error: err?.message, 
      userExists: !!user,
      info: info?.message 
    });
    
    if (err || !user) {
      console.log('❌ JWT Guard rejected:', err?.message || 'No user');
      throw err || new UnauthorizedException('Invalid token');
    }
    
    console.log('✅ JWT Guard accepted user:', user.email);
    return user;
  }
}