import { Response, NextFunction, Request } from 'express'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config()

const sendEmail = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL
      }
    })
    console.log(process.env.USER_EMAIL, process.env.PASS_EMAIL)
    const code = 12345612345

    const mainOptions: any = {
      from: process.env.USER_EMAIL,
      to: `${email}`,
      subject: 'Update password', // tieu de,
      text: 'You recieved message from ' + req.body.email,
      html: `<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
       style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
       <tr>
          <td>
             <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                align="center" cellpadding="0" cellspacing="0">
                <tr>
                   <td style="height:80px;">&nbsp;</td>
                </tr>
                <tr>
                   <td style="text-align:center;">
                      <a href="https://rakeshmandal.com" title="logo" target="_blank">
                      <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo">
                      </a>
                   </td>
                </tr>
                <tr>
                   <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                   <td>
                      <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                         style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                         <tr>
                            <td style="height:40px;">&nbsp;</td>
                         </tr>
                         <tr>
                            <td style="padding:0 35px;">
                               <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                  requested to reset your password
                               </h1>
                               <span
                                  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                               <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                  We cannot simply send you your old password. A unique link to reset your
                                  password has been generated for you. To reset your password, click the
                                  following link and follow the instructions.
                               </p>
                               <a href="javascript:void(0);"
                                  style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                               Password</a>
                            </td>
                         </tr>
                         <tr>
                            <td style="height:40px;">&nbsp;</td>
                         </tr>
                      </table>
                   </td>
                <tr>
                   <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                   <td style="text-align:center;">
                      <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.rakeshmandal.com</strong></p>
                   </td>
                </tr>
                <tr>
                   <td style="height:80px;">&nbsp;</td>
                </tr>
             </table>
          </td>
       </tr>
    </table>`
    }

    const info = await transporter.sendMail(mainOptions)
    console.log(info, 'info')
    if (info && info.messageId) {
      const pass = '123456'
      req.pass = pass
      req.code = code
      next()
      return res.json({ message: 'Email sent successfully' })
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ message: 'Failed to send email' })
  }
}
export default sendEmail
