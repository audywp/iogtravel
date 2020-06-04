const nodemailer = require('nodemailer')
require('dotenv').config
module.exports = {
  sendMail: (sendTo, subject, bodyEmail, callback) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.NODEMAILER_CODE
      }
    })

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: `${sendTo}`,
      subject: `${subject}`,
      html: `${bodyEmail}`
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log(info)
      }
    })
  }
}
