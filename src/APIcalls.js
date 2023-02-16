import config from "./config";

export class APIcall {
  static user = config.path + "user";
  static admin = config.path + "admin";

  static createUser = APIcall.user + "/create";
  static login = APIcall.user + "/login";
  static getPosts = APIcall.user + "/get/posts";
  static post = APIcall.user + "/post";
  static getMessages = APIcall.user + "/get/messages";
  static getUsers = APIcall.user + "/get/users";
  static sendMessage = APIcall.user + "/message";

  static adminGetUsers = APIcall.admin + "/get/users";
  static changeUserStatus = APIcall.admin + "/users/status";
  static deletePost = APIcall.admin + "/delete/post";
  static sendMessageToAllUsers = APIcall.admin + "/message";
}
