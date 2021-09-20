import jwt_decode from "jwt-decode";

export class TokenHelper {
  public static validateToken(token: string): boolean {
    if (token) {
      const decodedToken: any = jwt_decode(token);
      var dateNow = Date.now() / 1000;
      if (decodedToken.exp > dateNow) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
