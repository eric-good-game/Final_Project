class UserDTO {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  token?: string;
  cart?: ICart;

  constructor(id: string, userData: IUser) {
    this.id = id;
    this.email = userData.email;
    this.name = userData.name;
    this.phone = userData.phone;
    this.token = userData.token;
    this.role = userData.role;
    this.cart = userData.cartId as ICart;
  }
}

export default UserDTO;
