import { injectable } from 'inversify';
import crypto from 'crypto';
import VerificationToken from '../models/VerificationToken';
import nodeMailer from '../utils/nodeMailer';
import ClientDTO from "dtos/UserDTO";

@injectable()
class EmailService {
    public async sendVerificationEmail(
        client: ClientDTO,
        verifyUrl: string
    ): Promise<void> {
        try {
            const token = new VerificationToken({
                user: client._id,
                value: crypto.randomBytes(16).toString('hex')
            });
            await token.save();

            const subject = 'Account Verification Token';
            const to = client.email;
            const from = process.env.FROM_EMAIL;
            const link = verifyUrl + token.value;
            const html = `<p>Hi ${client.email}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p>
             <br><p>If you did not request this, please ignore this email.</p>`;

            await this.sendEmail({ from, to, subject, html });
        } catch (err) {
            throw new Error(`Problem with nodeMailer service: ${err.message}`);
        }
    }

    private async sendEmail(mailOptions: any): Promise<void> {
        await nodeMailer.sendMail(mailOptions);
    }
}

export default EmailService;
