export class Cookie {
  static getCookie = () => {
    return document.cookie;
  };
  static getToken = () => {
    let token;
    const cookie = this.getCookie();
    if (!cookie) return undefined;
    else {
      token = cookie.split("token=");
      if (!token[1]) return undefined;
    }
    return token[1];
  };
  static deleteToken = () => {
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/posts;";
  };
  static isTokenValid = () => {
    return this.getToken() ? true : false;
  };

  static isLoggedIn = () => {
    let token;
    const cookie = this.getCookie();
    if (!cookie) return undefined;
    else {
      token = cookie.split("loggedIn=");
      if (!token[1]) return undefined;
    }
    return token[1];
  };
}
