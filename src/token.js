import config from "./config";
import { Cookie } from "./cookie";

export class Token {
  static decode = (token) => {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  static isAdmin = () => {
    return this.decode(Cookie.getToken()).user_id === config.admin_id;
  };
}
