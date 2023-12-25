import { IncomeProfileEnum, ResidenceTypeEnum } from '@prisma/client';
import { getIncomeStatus, getResidentialStatus } from './calculation';

interface BankObject {
  row1?: string;
  ourReviews?: string;
  loanType?: string;
  preApprovalFee?: string;
  processingFee?: string;
  valuationFee?: string;
  fixedRate?: string;
  variableRate?: string;
  variableDay1?: string;
  lifeInsurance?: string;
  propertyInsurance?: string;
  earlySettlement?: string;
  partialSettlement?: string;
  feeFinance?: string;
}
export const getBestOptions = (residenceType: ResidenceTypeEnum, incomeProfile: IncomeProfileEnum) => {
  const bank1 = getBank1(residenceType, incomeProfile);
  const bank2 = getBank2(residenceType, incomeProfile);
  const bank3 = getBank3(residenceType, incomeProfile);
  const data = { bank1: bank1, bank2: bank2, bank3: bank3 };

  return data;
};

const getBank1 = (residenceType: ResidenceTypeEnum, incomeProfile: IncomeProfileEnum) => {
  const residentialStatus = getResidentialStatus(residenceType);
  const incomeStatus = getIncomeStatus(incomeProfile);
  const bank1: BankObject = {};

  if (residentialStatus === 12) {
    bank1.row1 = 'MONEY SAVER';
    bank1.ourReviews = 'NOT BAD';
    bank1.loanType = 'ISLAMIC / CONVENTIONAL';
    bank1.preApprovalFee = parseFloat('1050').toFixed(2);
    bank1.processingFee = '1%';
    bank1.valuationFee = parseFloat('2625').toFixed(2);
    bank1.fixedRate = '-';
    bank1.variableRate = '-';
    bank1.variableDay1 = '2.99% + 3M EIBOR';
    bank1.lifeInsurance = '0.4176% PER YEAR OF LOAN OUTSTANDING';
    bank1.propertyInsurance = '0.06% PER YEAR OF PROPERTY VALUE';
    bank1.earlySettlement = '1% OF LOAN OUTSTANDING  OR AED 10,000 WHATEVER IS LESS';
    bank1.partialSettlement = 'FREE UP TO 25% OF LOAN OUTSTANDING EVERY YEAR';
    bank1.feeFinance = '-';
  } else {
    switch (incomeStatus) {
      case 1:
        bank1.row1 = 'MONEY SAVER';
        bank1.ourReviews = 'SAVES YOUR MONEY';
        bank1.loanType = 'ISLAMIC / CONVENTIONAL';
        bank1.preApprovalFee = '-';
        bank1.processingFee = '-';
        bank1.valuationFee = parseFloat('2625').toFixed(2);
        bank1.fixedRate = 'PREFERENTIAL PRICING - 5.69% FIXED FOR 3 YEAR OR OTHERS - 5.85% FIXED FOR 3 YEARS';
        bank1.variableRate = ' PREFERENTIAL PRICING - 1.75% + 3M EIBOR OR OTHERS - 2.00% + 3M EIBOR';
        bank1.variableDay1 =
          'PREFERENTIAL PRICING  - 1.49% + 3M EIBOR (Min 1.49%) OTHERS -1.65% + 3M EIBOR (Min 1.65%) LOW DOC - 2.25% + 3M EIBOR (Min 3.99%)';
        bank1.lifeInsurance = '0.165% PER YEAR OF LOAN OUTSTANDING';
        bank1.propertyInsurance = '0.06% PER YEAR OF PROPERTY VALUE';
        bank1.earlySettlement = '1% OF LOAN OUTSTANDING  OR AED 10,000 WHATEVER IS LESS';
        bank1.partialSettlement = 'FREE UP TO 25% OF LOAN OUTSTANDING EVERY YEAR';
        bank1.feeFinance = '6% (DLD & BROKER FEE) + 0.25% MORTGAGE REGISTRATION FEE';
        break;
      case 2:
        bank1.row1 = 'MONEY SAVER';
        bank1.ourReviews = 'GOOD';
        bank1.loanType = 'ISLAMIC / CONVENTIONAL';
        bank1.preApprovalFee = '-';
        bank1.processingFee = '-';
        bank1.valuationFee = parseFloat('2625').toFixed(2);
        bank1.fixedRate = '-';
        bank1.variableRate = '-';
        bank1.variableDay1 = '2.99% + 3M EIBOR';
        bank1.lifeInsurance = '0.165% PER YEAR OF LOAN OUTSTANDING';
        bank1.propertyInsurance = '0.06% PER YEAR OF PROPERTY VALUE';
        bank1.earlySettlement = '1% OF LOAN OUTSTANDING  OR AED 10,000 WHATEVER IS LESS';
        bank1.partialSettlement = 'FREE UP TO 25% OF LOAN OUTSTANDING EVERY YEAR';
        bank1.feeFinance = '6% (DLD & BROKER FEE) + 0.25% MORTGAGE REGISTRATION FEE';
        break;
      default:
        bank1.row1 = 'MONEY SAVER';
        bank1.ourReviews = 'GOOD';
        bank1.loanType = 'ISLAMIC / CONVENTIONAL';
        bank1.preApprovalFee = '-';
        bank1.processingFee = '-';
        bank1.valuationFee = parseFloat('2625').toFixed(2);
        bank1.fixedRate = '-';
        bank1.variableRate = '-';
        bank1.variableDay1 = '2.99% + 3M EIBOR';
        bank1.lifeInsurance = '0.165% PER YEAR OF LOAN OUTSTANDING';
        bank1.propertyInsurance = '0.06% PER YEAR OF PROPERTY VALUE';
        bank1.earlySettlement = '1% OF LOAN OUTSTANDING  OR AED 10,000 WHATEVER IS LESS';
        bank1.partialSettlement = 'FREE UP TO 25% OF LOAN OUTSTANDING EVERY YEAR';
        bank1.feeFinance = '6% (DLD & BROKER FEE) + 0.25% MORTGAGE REGISTRATION FEE';
        break;
    }
  }
  return bank1;
};
const getBank2 = (residentialType: ResidenceTypeEnum, incomeProfile: IncomeProfileEnum) => {
  const residentialStatus = getResidentialStatus(residentialType);
  const incomeStatus = getIncomeStatus(incomeProfile);
  const bank2: BankObject = {};

  if (residentialStatus === 12) {
    bank2.row1 = 'LOWEST RATE';
    bank2.ourReviews = 'BAD';
    bank2.loanType = 'ISLAMIC';
    bank2.preApprovalFee = parseFloat('1575').toFixed(2);
    bank2.processingFee = '1%';
    bank2.valuationFee = parseFloat('2500').toFixed(2);
    bank2.fixedRate = '4.99%';
    bank2.variableRate = '-';
    bank2.variableDay1 = '2.83814% + 3 MONTH EIBOR';
    bank2.lifeInsurance = '0.36% PER YEAR OF LOAN OUTSTANDING';
    bank2.propertyInsurance = '0.035% PER YEAR OF PROPERTY VALUE';
    bank2.earlySettlement = '1% OF LOAN OUTSTANDING  OR AED 10,000 WHATEVER IS LESS';
    bank2.partialSettlement = '1% OF LOAN OUTSTANDING  OR AED 10,000 WHATEVER IS LESS';
    bank2.feeFinance = '-';
  } else {
    switch (incomeStatus) {
      case 1:
        bank2.row1 = 'LOWEST RATE';
        bank2.ourReviews = 'CAN GET BEST RATE';
        bank2.loanType = 'ISLAMIC';
        bank2.preApprovalFee = '-';
        bank2.processingFee = '-';
        bank2.valuationFee = parseFloat('2500').toFixed(2);
        bank2.fixedRate = '4.99% FIXED FOR 1 YEAR 5.25% FIXED FOR 3 YEAR 5.49% FIXED FOR 5 YEAR';
        bank2.variableRate = '1 YEAR - 1.75% + 3M EIBOR 3 YEAR - 1.75% + 3M EIBOR 5 YEAR - 1.75% + 3M EIBOR';
        bank2.variableDay1 = 'STL: 1.49814% + 3M EIBOR NSTL: 1.74814% + 3M EIBOR ';

        bank2.lifeInsurance = '0.36% PER YEAR OF LOAN OUTSTANDING';
        bank2.propertyInsurance = '0.03325% PER YEAR OF PROPERTY VALUE';
        bank2.earlySettlement = '1% OF LOAN OUTSTANDING  OR AED 10,000 WHATEVER IS LESS';
        bank2.partialSettlement = 'FREE UP TO 25% OF LOAN OUTSTANDING EVERY YEAR';
        bank2.feeFinance = '6% of DLD & BROKER FEE + TRUSTEE FEE';
        break;
      case 2:
        bank2.row1 = 'LOWEST RATE';
        bank2.ourReviews = 'VERY GOOD';
        bank2.loanType = 'ISLAMIC';
        bank2.preApprovalFee = '-';
        bank2.processingFee = ' 0.5%';
        bank2.valuationFee = parseFloat('2500').toFixed(2);
        bank2.fixedRate = '4.99% FIXED FOR 1 YEAR 5.25% FIXED FOR 3 YEAR 5.49% FIXED FOR 5 YEAR';
        bank2.variableRate = '1 YEAR - 1.75% + 3M EIBOR 3 YEAR - 1.75% + 3M EIBOR 5 YEAR - 1.75% + 3M EIBOR';
        bank2.variableDay1 = '1.74814% + 3M EIBOR';
        bank2.lifeInsurance = '0.36% PER YEAR OF LOAN OUTSTANDING';
        bank2.propertyInsurance = '0.03325% PER YEAR OF PROPERTY VALUE';
        bank2.earlySettlement = '1% OF LOAN OUTSTANDING  OR AED 10,000 WHATEVER IS LESS';
        bank2.partialSettlement = '1% OF LOAN OUTSTANDING  OR AED 10,000 WHATEVER IS LESS';
        bank2.feeFinance = '6% of DLD & BROKER FEE + TRUSTEE FEE';
        break;
      default:
        bank2.row1 = 'LOWEST RATE';
        bank2.ourReviews = 'VERY GOOD';
        bank2.loanType = 'ISLAMIC';
        bank2.preApprovalFee = '-';
        bank2.processingFee = '0.5%';
        bank2.valuationFee = parseFloat('2500').toFixed(2);
        bank2.fixedRate = '4.99% FIXED FOR 1 YEAR 5.25% FIXED FOR 3 YEAR 5.49% FIXED FOR 5 YEAR';
        bank2.variableRate = '1 YEAR - 1.75% + 3M EIBOR 3 YEAR - 1.75% + 3M EIBOR 5 YEAR - 1.75% + 3M EIBOR';
        bank2.variableDay1 = '1.74814% + 3M EIBOR';
        bank2.lifeInsurance = '0.36% PER YEAR OF LOAN OUTSTANDING';
        bank2.propertyInsurance = '0.03325% PER YEAR OF PROPERTY VALUE';
        bank2.earlySettlement = '1% OF LOAN OUTSTANDING  OR AED 10,000 WHATEVER IS LESS';
        bank2.partialSettlement = '1% OF LOAN OUTSTANDING  OR AED 10,000 WHATEVER IS LESS';
        bank2.feeFinance = '6% of DLD & BROKER FEE + TRUSTEE FEE';
        break;
    }
  }
  return bank2;
};
const getBank3 = (residentialType: ResidenceTypeEnum, incomeProfile: IncomeProfileEnum) => {
  const residentialStatus = getResidentialStatus(residentialType);
  const incomeStatus = getIncomeStatus(incomeProfile);
  const bank3: BankObject = {};

  if (residentialStatus === 12) {
    bank3.row1 = 'QUICK APPROVAL';
    bank3.ourReviews = 'GOOD';
    bank3.loanType = 'ISLAMIC / CONVENTIONAL';
    bank3.preApprovalFee = '-';
    bank3.processingFee = '1%';
    bank3.valuationFee = parseFloat('3150').toFixed(2);
    bank3.fixedRate = 'SAL - 5.14% FIXED FOR 1 YEAR SE - 5.44% FIXED FOR 3 YEAR';
    bank3.variableRate = 'SAL - 2.79% + 3M EIBOR SE - 2.49% + 3M EIBOR';
    bank3.variableDay1 = 'SAL - 2.29% + 3M EIBOR SE - 2.49% + 3M EIBOR';
    bank3.lifeInsurance = '0.14004% PER YEAR OF LOAN OUTSTANDING';
    bank3.propertyInsurance = '0.04% PER YEAR OF PROPERTY VALUE';
    bank3.earlySettlement = '1% OF LOAN OUTSSTANDING  OR AED 10,000 WHATEVER IS LESS';
    bank3.partialSettlement = 'FREE UP TO 15% OF LOAN OUTSTANDING';
    bank3.feeFinance = '-';
  } else {
    switch (incomeStatus) {
      case 1:
        bank3.row1 = 'QUICK APPROVAL';
        bank3.ourReviews = 'QUICK APPROVAL CAOMPARE TO OTHER';
        bank3.loanType = 'ISLAMIC / CONVENTIONAL';
        bank3.preApprovalFee = '-';
        bank3.processingFee = 'OPTION 1: 0.75% OPTION 2: 0.50%';
        bank3.valuationFee = parseFloat('3150').toFixed(2);
        bank3.fixedRate = '5.20% FIXED FOR 1 YEAR OPTION 1: 4.75% FIXED FOR 3 YEAR OPTION 2: 4.99% FIXED FOR 3 YEAR';
        bank3.variableRate = '1.79% + 3M EIBOR';
        bank3.variableDay1 = '1.39% + 3M EIBOR';
        bank3.lifeInsurance = '0.14004% PER YEAR OF LOAN OUTSTANDING';
        bank3.propertyInsurance = '0.04% PER YEAR OF PROPERTY VALUE';
        bank3.earlySettlement = '1% OF LOAN OUTSSTANDING  OR AED 10,000 WHATEVER IS LESS';
        bank3.partialSettlement = 'FREE UP TO 15% OF LOAN OUTSTANDING';
        bank3.feeFinance = '7% OF TOTAL PROPERTY COST';
        break;
      case 2:
        bank3.row1 = 'QUICK APPROVAL';
        bank3.ourReviews = 'EXTRA';
        bank3.loanType = 'ISLAMIC / CONVENTIONAL';
        bank3.preApprovalFee = '-';
        bank3.processingFee = '0.5%';
        bank3.valuationFee = parseFloat('3150').toFixed(2);
        bank3.fixedRate = '5.90% FIXED FOR 1 YEAR 5.23% FIXED FOR 3 YEAR';
        bank3.variableRate = '1.99% + 3M EIBOR';
        bank3.variableDay1 = '1.59% + 3M EIBOR';
        bank3.lifeInsurance = '0.14004% PER YEAR OF LOAN OUTSTANDING';
        bank3.propertyInsurance = '0.04% PER YEAR OF PROPERTY VALUE';
        bank3.earlySettlement = '1% OF LOAN OUTSSTANDING  OR AED 10,000 WHATEVER IS LESS';
        bank3.partialSettlement = 'FREE UP TO 15% OF LOAN OUTSTANDING';
        bank3.feeFinance = '-';
        break;
      default:
        bank3.row1 = 'QUICK APPROVAL';
        bank3.ourReviews = 'EXTRA';
        bank3.loanType = 'ISLAMIC / CONVENTIONAL';
        bank3.preApprovalFee = '-';
        bank3.processingFee = '0.5%';
        bank3.valuationFee = parseFloat('3150').toFixed(2);
        bank3.fixedRate = '5.90% FIXED FOR 1 YEAR 5.23% FIXED FOR 3 YEAR';
        bank3.variableRate = '1.99% + 3M EIBOR';
        bank3.variableDay1 = '1.59% + 3M EIBOR';
        bank3.lifeInsurance = '0.14004% PER YEAR OF LOAN OUTSTANDING';
        bank3.propertyInsurance = '0.04% PER YEAR OF PROPERTY VALUE';
        bank3.earlySettlement = '1% OF LOAN OUTSSTANDING  OR AED 10,000 WHATEVER IS LESS';
        bank3.partialSettlement = 'FREE UP TO 15% OF LOAN OUTSTANDING';
        bank3.feeFinance = '-';
        break;
    }
  }
  return bank3;
};
