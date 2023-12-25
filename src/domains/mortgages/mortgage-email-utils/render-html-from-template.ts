import * as path from 'path';
import { getMortgageCalculations } from './calculation';
import { getBestOptions } from './best-options';
import { Mortgage, Requirement } from '@prisma/client';
import * as mustache from 'mustache';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

export const renderHtmlFromTemplate = async (
  mortgage: Mortgage,
  requirement: Requirement,
  requiredDocumentNames: string[],
) => {
  return new Promise(async (resolve, reject) => {
    const templatePath = path.join(process.cwd(), 'assets/templates/mortgageTemplate.html');
    const renderedHtml = path.join(process.cwd(), '/' + mortgage.email + '_rendered_template_' + mortgage.id + '.html'); // Output rendered template path
    const destinationFolder = path.join(process.cwd(), 'assets/generated');
    const pdfFileName = '/' + mortgage.email.replace(/[@.]/g, '') + '_mortgage_qoutation_' + mortgage.id + '.pdf';

    fs.readFile(templatePath, 'utf8', async (err: any, template: any) => {
      if (err) {
        console.error('Error reading template file:', err);
        return;
      }

      const mortgageCalculation = getMortgageCalculations(mortgage, requirement);
      const bestOptions = getBestOptions(mortgage.residenceType, mortgage.incomeProfile);
      const documents = requiredDocumentNames;
      const data = {
        ...mortgageCalculation,
        ...bestOptions,
        documents: documents,
      };
      // Render the template with the data
      const renderedTemplate = mustache.render(template, data);
      // Save the rendered template to a file
      fs.writeFile(renderedHtml, renderedTemplate, 'utf8', async (err: any) => {
        if (err) {
          console.error('Error writing rendered template to file:', err);
          return reject({
            success: false,
            error: err,
          });
        }

        // Use Puppeteer to generate PDF from the rendered HTML
        const browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await generateProposalPerEmail(destinationFolder, renderedHtml, pdfFileName, page, browser);

        resolve({
          success: true,
          pdfFileName,
        });
      });
    });
  });
};

const generateProposalPerEmail = async (
  destinationFolder: any,
  renderedHtml: any,
  pdfFileName: any,
  page: any,
  browser: any,
) => {
  return new Promise((resolve, reject) => {
    fs.access(destinationFolder, fs.constants.F_OK, async (err: any) => {
      if (err) {
        fs.mkdir(destinationFolder, { recursive: true }, async (error: any) => {
          if (error) {
            console.error('Error creating folder:', error);
            reject(error);
          } else {
            console.log('Folder created successfully!');
            await saveToPdf(page, renderedHtml, pdfFileName, destinationFolder, browser);

            resolve(true);
          }
        });
      } else {
        await saveToPdf(page, renderedHtml, pdfFileName, destinationFolder, browser);

        resolve(true);
      }
    });
  });
};

const saveToPdf = async (page: any, renderedHtml: any, pdfFileName: any, destinationFolder: any, browser: any) => {
  try {
    const htmlContent = await fs.readFileSync(renderedHtml, 'utf8');
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });

    await page.pdf({
      path: destinationFolder + pdfFileName,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1cm',
        bottom: '1cm',
        left: '2cm',
        right: '2cm',
      },
    });

    console.log('PDF generated successfully!');
    deleteRenderedHtml(renderedHtml);
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    await browser.close();
  }
};

const deleteRenderedHtml = (renderedHtml: any) => {
  fs.unlink(renderedHtml, (err: any) => {
    if (err) {
      console.error('Error deleting the file:', err);
    } else {
      console.log('File deleted successfully!');
    }
  });
};
