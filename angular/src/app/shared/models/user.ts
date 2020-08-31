export interface InterfaceUser {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  PermissionId?: string;
  img?: { id: number; path: string };
}
export class User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  PermissionId?: string;
  img?: { id: number; path: string };
  constructor(public user: InterfaceUser) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.PermissionId = user.PermissionId;
  }
}
