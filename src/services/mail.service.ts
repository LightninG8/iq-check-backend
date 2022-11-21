import { IMailService, ILogger, IConfigService } from '../interfaces';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { createTestAccount, createTransport, TestAccount, Transporter } from 'nodemailer';

@injectable()
export class MailService implements IMailService {
  transporter: Transporter

	constructor(
    @inject(TYPES.IConfigService) private configService: IConfigService,
    @inject(TYPES.ILogger) private logger: ILogger
  ) {}

  async connect() {
    try {
      this.transporter = createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports 587
        auth: {
          user: this.configService.get('MAIL_LOGIN'),
          pass: this.configService.get('MAIL_SECURE_KEY')
        }
      });
      
      this.logger.log('[Mail] Почтовый сервис подключен')
    } catch (e) {
      this.logger.error('[Mail] Ошибка подключения почтового сервиса')
    }
    
  }

  async send(email: string, resultId: string) {
    const ADDRESS = process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://интеллект-тест.рф';
  
    await this.transporter.sendMail({
      from: `"интеллект-тест.рф" ${this.configService.get('MAIL_LOGIN')}`,
      to: email,
      subject: 'Тест на IQ | Интеллект тест',
      text: 'Для получения информации о Вашем результате прохождения IQ-теста перейдите по ссылке',
      html: `
        <table border="0" cellspacing="0" cellpadding="0" style="max-width:600px">
            <tbody>
            <tr>
                <td>
                    <table bgcolor="#3E4480" width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width:332px;max-width:600px;border:1px solid #e0e0e0;border-bottom:0;border-top-left-radius:3px;border-top-right-radius:3px">
                        <tbody>
                        <tr><td height="72" colspan="3"></td></tr>
                        <tr>
                            <td width="32"></td>
                            <td style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:24px;color:#ffffff;line-height:1.25">
                                IQ тест
                            </td>
                            <td width="32"></td>
                        </tr>
                        <tr><td height="18px" colspan="3"></td></tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    &ensp;<table bgcolor="#FAFAFA" width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width:332px;max-width:600px;border:1px solid #f0f0f0;border-bottom:1px solid #c0c0c0;border-top:0;border-bottom-left-radius:3px;border-bottom-right-radius:3px">
                        <tbody>
                        <tr height="16px">
                            <td width="32px" rowspan="3"></td>
                            <td></td>
                            <td width="32px" rowspan="3"></td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Добрый день!</h3>
                                <p>
                                    Для получения информации о Вашем результате прохождения Iq-теста перейдите по ссылке:
                                    <br>
                                    <br>
                                    <a style="border:1px solid #000000;padding:5px 10px;text-decoration:none" href="${ADDRESS}/certificate/${resultId}">Перейти.</a>
                                </p>
                            </td>
                        </tr>
                        <tr height="32px"></tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr height="16px"></tr>
            </tbody>
        </table>`
    }, (error) => {
      if (error) {
        this.logger.error(`Не получилось отправить письмо: ${error}`);
      } else {
        this.logger.log(`Письмо доставлено на адрес ${email}`);
      }
    });
  }
}
