import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtTokenService {
  private readonly secretKey = 'purpleroof-secret-key';

  // Method to generate a JWT token
  generateToken({ userId, userAuthId, username, email, role }): string {
    const payload = { userId, userAuthId, username, email, role };
    const options = { expiresIn: '30d' };

    // Sign the token with the secret key
    const token = jwt.sign(payload, this.secretKey, options);

    return token;
  }

  verifyToken = (token: string) => {
    return jwt.verify(token, this.secretKey);
  };
}
