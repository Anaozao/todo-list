// import SequelizeUser from "../../database/models/SequelizeUser";

// export default class AccountRecoveryService {
//   private model = SequelizeUser

//   async resetPass(email: string) {

//     const 



//     const newPass = this.generateRandomPassword(6)

//   }

//   private generateRandomPassword(length: number): string {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let password = '';
//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * chars.length);
//       password += chars[randomIndex];
//     }
//     return password;
//   }

// }