import nodemailer from 'nodemailer';
export { renderEmail } from '../../veiws';
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wezonaser50@gmail.com',
    pass: 'lmevmyjzkuzermlj',
  },
});

export const mailOptions = (to: string, subject: string, html: string) => {
  return {
    from: 'wezonaser50@gmail.com',
    to: 'wezonaser50@gmail.com',
    subject,
    html,
  };
};
