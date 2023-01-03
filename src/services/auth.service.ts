import twilio from 'twilio';
import User from '../models/user.model';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';
import UserDTO from '../dtos/user.dto';
import cartService from './cart.service';
import sendEmail from '../utils/sendMail';

class AuthService {
  #cartService = cartService;
  async signup(user: any) {
    if (!(user instanceof User)) {
      throw new Error('User not found');
    }
    const cart = await this.#cartService.create(user._id.toString());
    user.cartId = cart;
    user.generateToken();
    const userDto = new UserDTO(user._id.toString(), user);
    await sendEmail('new user', { ...userDto, createdAt: user.createdAt });
    return userDto;
  }
  async login(user: any): Promise<UserDTO> {
    if (!(user instanceof User)) {
      throw new Error('User not found');
    }
    user.generateToken();

    const userDto = new UserDTO(user._id.toString(), user);
    return userDto;
  }
  async verifyToken(user: any): Promise<UserDTO> {
    try {
      if (!(user instanceof User)) {
        throw new Error('User not found');
      }
      const userDto = new UserDTO(user._id.toString(), user);
      return userDto;
    } catch (err) {
      throw err;
    }
  }

  async verifyEmail(email: string) {
    try {
      const user = await User.exists({ email }).select('email').lean();
      return user ? true : false;
    } catch (err) {
      throw err;
    }
  }

  async sendVerification(phone: string): Promise<VerificationInstance> {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);
      const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID || null;
      if (!serviceSid) {
        throw new Error('No service sid');
      }
      const verification = await client.verify.v2
        .services(serviceSid)
        .verifications.create({
          to: `+${phone}`,
          channel: 'sms',
        });
      return verification;
    } catch (err) {
      throw err;
    }
  }

  async checkVerification(
    phone: string,
    code: string,
  ): Promise<VerificationCheckInstance> {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);
      const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID || null;
      if (!serviceSid) {
        throw new Error('No service sid');
      }
      const verification_check = await client.verify.v2
        .services(serviceSid)
        .verificationChecks.create({ to: phone, code: code });

      if (verification_check.status !== 'approved') {
        throw new Error('Verification failed');
      }
      return verification_check;
    } catch (err) {
      throw err;
    }
  }
}

const authService = new AuthService();

export default authService;
