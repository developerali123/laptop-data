// src/common/guards/gql-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    @Inject('PROFILE_SERVICE') private readonly client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.replace(/^Bearer\s+/i, '').trim();

    try {
      const isValid = await firstValueFrom(
        this.client.send('auth.validate-token', token), // now only token is passed
      );

      if (!isValid) {
        throw new UnauthorizedException('Invalid token');
      }

      return true;
    } catch (err) {
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
