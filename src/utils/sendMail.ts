import transporter from '../configs/nodemailer.config';
import logger from './logger';

const sendEmail = async (type: string, data: { [key: string]: any }) => {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
  const to: string[] =
    type === 'order' ? [data.user_email, ADMIN_EMAIL] : [ADMIN_EMAIL];
  const subject: string =
    type === 'order' ? 'New order ' + data._id : 'New user ' + data.id;

  try {
    const style: string =
      '<style> p{margin:0px; margin-bottom:.8rem} span{font-weight:600;text-transform: capitalize}</style>';
    let content: string = '';

    Object.keys(data).forEach((key) => {
      if (!data[key] || key === 'UpdatedAt') {
        return;
      }
      if (key === 'items') {
        content += `<p style="margin-bottom:.4rem !important"><span>${key.replace(
          '_',
          ' ',
        )}: </span></p>`;
        data[key].forEach((item: any, idx: number) => {
          const name = item.name;
          const variant = item.variant;
          const quantity = item.quantity;
          const style = `margin-left: 1rem; ${
            idx !== data[key].length - 1 ? 'margin-bottom:.4rem !important' : ''
          }`;
          content += `<p style="${style}" >${quantity} • ${name} • ${variant}</p>`;
        });
        return;
      }
      content += `<p><span>${key.replace('_', ' ')}: </span>${data[key]}</p>`;
    });
    const template = `<html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge">${style}</head><body>${content}</body></html>`;

    const info = await transporter.sendMail({
      from: 'Eric Good Game', // sender address
      to, // list of receivers
      subject, // Subject line
      html: template, // html body
    });
    logger.info(info);
  } catch (err) {
    logger.error(err);
  }
};

export default sendEmail;
