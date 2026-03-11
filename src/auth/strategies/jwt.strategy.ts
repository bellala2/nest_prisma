import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
@Injectable()
export class JwtStrategy extends
    PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'NEST_PRISMA',
        });
    }
    validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
      studentId: payload.memberId, 
    };
    
    }
} 