/*
 * @Description:email 邮件服务
 */
import { post, prefix } from "../requestDecorator";
import axios from "axios"
import nodemailer from "nodemailer"
export interface EmailModel {
}

const sendEmail = (transporter: nodemailer.Transporter, mailOptions: nodemailer.SendMailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('发送邮件失败:', error);
        reject(error);
      } else {
        console.log('邮件已成功发送:', info.response);
        resolve(info);
      }
    });
  });
};

@prefix('/api/email')
export default class Article {
  @post('/send-email')
  async sendEmailHandler(ctx: any) {
    const clientId =
      '950277997880-ler2f8ejqq5cca3bkgloe0g6rkatkng9.apps.googleusercontent.com';
    const clientSecret = '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';
    const refreshToken =
      '1//04KAGCiob31TzCgYIARAAGAQSNwF-L9Ir-785-qIlNlHQoAa6obDL6hNCRkD-iUKiyAmBX5kDuTxJ71Sh12rMVWOCUaUetfViX-8';
    const token = await axios.post('https://accounts.google.com/o/oauth2/token', {
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });
    const { access_token } = token.data || {};
    const { company_name, email, name, name2, phone, text } = ctx.request.body
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: '200214zef@gmail.com',
        clientId,
        clientSecret,
        refreshToken,
        accessToken: access_token,
      },
    });
    const currentDate = new Date();

    // 获取年、月、日、小时和分钟
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    // 格式化日期和时间
    const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;
    const AdminMailOptions = {
      from: '200214zef@gmail.com',
      // to: '290204957@qq.com',
      to: '200214zef@gmail.com',
      subject: '【お問い合わせ完了メール】dreaMTank 来信 📨',
      html: `
    <div style="white-space: pre-line;">
      ----------------------------------------------------------------------------------------------------------------------------------------------
      <br />
      御社名：${company_name}
      <br />
      お名前：${name}
      <br />
      お名前(フリガナ)：${name2}
      <br />
      メールアドレス：${email}
      <br />
      電話番号：${phone}
      <br />
      お問い合わせ内容：${text}
      <br />
      ----------------------------------------------------------------------------------------------------------------------------------------------
      お問い合わせ受付日時：${formattedDate}
      <br />
      ----------------------------------------------------------------------------------------------------------------------------------------------
    </div>
    `,
    };

    const UserMailOptions = {
      from: ' "お問い合わせ（返信不可）" 200214zef@gmail.com ',
      to: email,
      subject:
        '【お問い合わせ完了メール】dreaMTank　オンラインお問い合わせ完了メール 📧',
      html: `
    <div>
      ----------------------------------------------------------------------------------------------------------------------------------------------
      <br />
      ※本メールは、自動的に配信しています。
      <br />
      こちらのメールは送信専用のため、直接ご返信いただいて
      <br />
      もお問い合わせには
      <br />
      お答えできませんので、あらかじめご了承ください。
      <br />
      ----------------------------------------------------------------------------------------------------------------------------------------------
      <br />
      このたびは、dreaMTankをお問い合わせいただき誠にあり
      <br />
      がとうございます。
      <br />
      お問い合わせいただいた内容をお知らせします。
      <br />
      ----------------------------------------------------------------------------------------------------------------------------------------------
      <br />
      お問い合わせ受付日時：${formattedDate}
      <br />
      ----------------------------------------------------------------------------------------------------------------------------------------------
    </div>
    `,
    };
    const msg = {
      code: 0,
      message: ''
    }
    try {
      // 发送第一封邮件
      const adminInfo = await sendEmail(transporter, AdminMailOptions);
      // 发送第二封邮件
      const userInfo = await sendEmail(transporter, UserMailOptions);

      if (adminInfo || userInfo) {
        // 发送邮件成功
        msg.code = 200
        msg.message = '電子メールを正常に送信'
      }
    } catch (error) {
      console.log(error);
      // 发送邮件失败
      msg.code = 500
      msg.message = 'メール送信に失敗しました'
    }
    return msg
  }
}
