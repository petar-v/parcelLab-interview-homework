const validateUser = (user: number) => user && !isNaN(user) && user > 0;
const validateToken = (token: string) => token && token.length > 0;

class ParcelLabApi {
  constructor(private user: number, private token: string) {
    if (!validateUser(this.user)) {
      throw new Error("The user provided is not valid");
    }
    if (!validateToken(this.token)) {
      throw new Error("The token provided is not valid");
    }
  }
}
