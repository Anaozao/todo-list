import * as jwt from 'jsonwebtoken';

export interface Payload {
  id: number,
  username: string,
  email: string,
}

export default class JwtUtils {
  private secret: string ;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'password';
  }

  createToken(payload: Payload, expiresIn?: string) {
    if (expiresIn) {
      const token = jwt.sign(payload, this.secret, { expiresIn });
      return token;
    }
    const token = jwt.sign(payload, this.secret);
    return token;
  }

  validateToken(token: string) {
    const payload = jwt.verify(token, this.secret) as Payload;
    return payload;
  }
}
