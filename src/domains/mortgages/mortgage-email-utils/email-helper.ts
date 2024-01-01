import * as nodeMailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

// const EMAIL = 'apikey';
// const EMAIL_PASSWORD = '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';
//   return nodeMailer.createTransport({
//     host: 'smtp.sendgrid.net',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: EMAIL,
//       pass: EMAIL_PASSWORD,
//     },
//   });

function readHTMLFile(path: any, callback: any) {
  try {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        callback(err);
      } else {
        callback(null, html);
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        error: (error as Error).message,
      }),
    );
  }
}

const createEmailConfig = (recipients: string[], subject: string, htmlToSend: any) => {
  const config = {
    from: 'info@purpleroof.com',
    to: recipients,
    subject: subject,
    html: htmlToSend, // html body`,
    attachments: [
      {
        filename: 'logo-white.png',
        path: path.join(process.cwd(), '/src/assets/images/logo-white.png'),
        cid: 'logo_white',
      },
      {
        filename: 'purple-logo.png',
        path: path.join(process.cwd(), '/src/assets/images/purple-logo.png'),
        cid: 'logo_purple',
      },
    ],
  };
  return config;
};

const createMailerTransport = () => {
  console.log('creating transport');
  const transport = nodeMailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: 'purplroof@gmail.com',
      pass: 'dqL1hwQygPrC9sWS',
    },
  });
  console.log('transport created');
  return transport;
};

export const sendEmailNotif = async (recipients: string[], subject: string, template: string, data: any) => {
  const templatePath = path.join(process.cwd(), `/src/utils/${template}.html`);

  try {
    const nodeMailerTransport = createMailerTransport();

    nodeMailerTransport.verify((error) => {
      if (error) return;
      console.log('Ready to send email');
    });

    readHTMLFile(templatePath, async function (err: any, html: any) {
      if (err) return;

      const template = handlebars.compile(html);
      const htmlToSend = template(data);
      const emailConfig = createEmailConfig(recipients, subject, htmlToSend);

      await nodeMailerTransport.sendMail(emailConfig);

      return new Response(
        JSON.stringify({
          success: true,
          status: 200,
        }),
      );
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: (error as Error).message,
      }),
    );
  }
};

export const sendEmailPdf = async (
  email: string,
  fullName: string,
  htmlData: { currentDate: number },
  pdfFileName: string,
) => {
  try {
    console.log('sending email');
    const nodeMailerTransport = createMailerTransport();
    // nodeMailerTransport.verify((error) => {
    //   if (error) {
    //     console.log('error happened');
    //     return;
    //   }
    //   console.log('Ready to send email', pdfFileName);
    // });

    const pdfPath = `assets/generated${pdfFileName}`;

    const templatePath = `assets/templates/mortgage.html`;

    try {
      readHTMLFile(templatePath, async function (err: any, html: any) {
        if (err) {
          console.log('error reading html file', err);
          return;
        }

        const template = handlebars.compile(html);
        const htmlToSend = template(htmlData);

        await nodeMailerTransport.sendMail({
          from: 'info@purpleroof.com',
          to: [email],
          subject: `Your Exclusive Mortgage Proposal Awaits!`,
          html: htmlToSend,
          attachments: [
            {
              filename: 'logo-white.png',
              path: path.join(process.cwd(), '/assets/images/logo-white.png'),
              cid: 'logo_white',
            },
            {
              filename: 'purple-logo.png',
              path: path.join(process.cwd(), '/assets/images/purple-logo.png'),
              cid: 'logo_purple',
            },
            {
              filename: `Mortgage Application ${fullName}.pdf`,
              path: pdfPath,
              contentType: 'application/pdf',
            },
          ],
        });

        fs.unlinkSync(`assets/generated${pdfFileName}`);

        console.log('Email sent!');
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  } catch (error) {}
};

export const sendDummyPdf = async () => {
  try {
    const nodeMailerTransport = createMailerTransport();
    nodeMailerTransport.verify((error) => {
      if (error) return;
      console.log('Ready to send email');
    });

    const pdfPath = path.join(process.cwd(), 'public/pdf/generated/schieniezelgmailcom_mortgage_qoutation_3.pdf');

    await nodeMailerTransport.sendMail({
      from: 'info@purpleroof.com',
      to: 'schieniezel@gmail.com',
      subject: 'Sample Subject',
      html: `<div></div>`, // html body`,
      attachments: [
        {
          filename: 'file.pdf',
          path: pdfPath,
          contentType: 'application/pdf',
        },
      ],
    });

    return new Response(
      JSON.stringify({
        success: true,
        status: 200,
      }),
    );
  } catch (error) {}
};

type JsonResponseParams = Record<string, any> & {
  status?: number;
};

export const jsonResponse = (data: JsonResponseParams) =>
  new Response(JSON.stringify({ ...data }), {
    status: data.status || 200,
  });
