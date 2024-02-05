import { IncomeProfileEnum, LoanTypeEnum, Mortgage, Requirement, ResidenceTypeEnum } from '@prisma/client';

export const getMortgageCalculations = (mortgage: Mortgage, requirement: Requirement) => {
  const finance = getFinanceAmount(mortgage.valueOfProperty, mortgage.residenceType, mortgage.incomeProfile);
  const installmentAndInsurance = getMonthlyInstallmentAndInsurance(
    mortgage.dateOfBirth,
    mortgage.incomeProfile,
    finance.financeAmount,
    mortgage.valueOfProperty,
    mortgage.residenceType,
    requirement,
  );
  const bankCharges = getBankCharges(
    mortgage.incomeProfile,
    finance.financeAmount,
    mortgage.residenceType,
    requirement,
  );
  const landDepartmentCharges = getLandDepartmentCharges(
    mortgage.loanType,
    mortgage.valueOfProperty,
    finance.financeAmount,
  );
  const realEstateCharges = getRealEstateCharges(mortgage.loanType, mortgage.valueOfProperty);
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  const imageUrl = '/assets/images/logo-white.png';

  console.log('mortgage', mortgage);

  const { valueOfProperty: propertyValue, firstName, lastName } = mortgage;

  const data = {
    finance,
    installmentAndInsurance,
    bankCharges,
    landDepartmentCharges,
    realEstateCharges,
    propertyValue,
    firstName,
    lastName,
    formattedDate,
    imageUrl,
  };

  return data;
};

export const getFinanceAmount = (
  propertyValue: number,
  residenceType: ResidenceTypeEnum,
  incomeProfile: IncomeProfileEnum,
) => {
  const loanToValue = getLoanToValue(residenceType, incomeProfile);
  const financeAmount = propertyValue * loanToValue;
  const data = { financeAmount: financeAmount, loanToValue: loanToValue * 100 };
  return data;
};
export const getMonthlyInstallmentAndInsurance = (
  dateOfBirth: Date,
  incomeProfile: IncomeProfileEnum,
  financeAmount: number,
  propertyValue: number,
  residenceType: ResidenceTypeEnum,
  requirement: Requirement,
) => {
  // const rates = JSON.parse(policy?.rates);

  const lifeInsuranceBaseRate = requirement.lifeInsurance;
  const propertyInsuranceBaseRate = requirement.propertyInsurance;

  const today = new Date(); // Current date
  const birthday = new Date(dateOfBirth);
  const differenceInMilliseconds = Math.abs(today.getTime() - birthday.getTime());
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const age = (Math.floor(differenceInMilliseconds / oneDayInMilliseconds) + 180) / 365;
  const tenorYears = age > 25 ? 25 : 65;
  const rate = getRate(incomeProfile, residenceType, requirement);
  const monthlyInstallment = (financeAmount * (rate / 1.8) * tenorYears + financeAmount) / (tenorYears * 12);
  const lifeInsurance = (financeAmount * (lifeInsuranceBaseRate / 100)) / 12;
  let propertyInsurance = (propertyValue * (propertyInsuranceBaseRate / 100)) / 12;
  propertyInsurance = parseFloat(propertyInsurance.toFixed(2));
  const data = {
    monthlyInstallment: parseFloat(monthlyInstallment.toFixed(2)),
    lifeInsurance: lifeInsurance,
    propertyInsurance: propertyInsurance,
  };
  return data;
};
export const getBankCharges = (
  incomeProfile: IncomeProfileEnum,
  financeAmount: number,
  residenceType: ResidenceTypeEnum,
  requirement: Requirement,
) => {
  let preApprovalFee = 0;
  let processingFeePercentage = 0;
  let valuationFee = 0;
  // const rates = JSON.parse(policy?.rates);
  const residentialStatus = getResidentialStatus(residenceType);
  const incomeStatus = getIncomeStatus(incomeProfile);
  if (residentialStatus === 12) {
    preApprovalFee = requirement.preApprovalFee;
    processingFeePercentage = requirement.processingFee / 100;
    valuationFee = requirement.valuationFee;
  } else {
    switch (incomeStatus) {
      case 1:
        preApprovalFee = requirement.preApprovalFee;
        processingFeePercentage = requirement.processingFee / 100;
        valuationFee = requirement.valuationFee;
        break;
      case 2:
        preApprovalFee = requirement.preApprovalFee;
        processingFeePercentage = requirement.processingFee / 100;
        valuationFee = requirement.valuationFee;
        break;

      default:
        preApprovalFee = requirement.preApprovalFee;
        processingFeePercentage = requirement.processingFee / 100;
        valuationFee = requirement.valuationFee;
        break;
    }
  }
  const processingFee = financeAmount * processingFeePercentage;
  const data = {
    preApprovalFee: preApprovalFee,
    processingFee: processingFee,
    valuationFee: valuationFee,
  };

  return data;
};
export const getLandDepartmentCharges = (loanTypeId: LoanTypeEnum, propertyValue: number, financeAmount: number) => {
  let transferFee = 0;
  const mortgageFee = financeAmount * 0.0025;
  let trusteeFee = 4000;
  const titleDeedFee = 590;
  switch (loanTypeId) {
    case LoanTypeEnum.BUY_PROPERTY_FROM_SELLER:
      transferFee = propertyValue * 0.04;
      break;
    case LoanTypeEnum.BUY_PROPERTY_FROM_DEVELOPER:
      trusteeFee = 0;
      break;

    default:
      break;
  }
  const data = {
    transferFee: transferFee,
    mortgageFee: mortgageFee,
    trusteeFee: trusteeFee,
    titleDeedFee: titleDeedFee,
  };
  return data;
};
export const getRealEstateCharges = (loanType: LoanTypeEnum, propertyValue: number) => {
  const realEstateFeePercentage = loanType === LoanTypeEnum.BUY_PROPERTY_FROM_SELLER ? 0.02 : 0;
  const realEstateFee = propertyValue * realEstateFeePercentage;

  return realEstateFee;
};

export const getLoanToValue = (residenceType: ResidenceTypeEnum, incomeProfile: IncomeProfileEnum) => {
  const totalStatus = getResidentialStatus(residenceType) + getIncomeStatus(incomeProfile);
  let loanToValue = 0;
  switch (totalStatus) {
    case 1:
      loanToValue = 0.85;
      break;
    case 2:
      loanToValue = 0.8;
      break;
    case 3:
      loanToValue = 0.8;
      break;
    case 6:
      loanToValue = 0.65;
      break;
    case 7:
      loanToValue = 0.6;
      break;
    default:
      loanToValue = 0.5;
      break;
  }
  return loanToValue;
};

export const getResidentialStatus = (residenceStatus: ResidenceTypeEnum) => {
  let status = 0;
  switch (residenceStatus) {
    case ResidenceTypeEnum.UAE_NATIONAL:
      status = 0;
      break;
    case ResidenceTypeEnum.UAE_RESIDENT:
      status = 1;
      break;
    default:
      status = 12;
      break;
  }
  return status;
};
export const getIncomeStatus = (incomeProfile: IncomeProfileEnum) => {
  let status = 0;
  switch (incomeProfile) {
    case IncomeProfileEnum.SALARIED:
      status = 1;
      break;
    case IncomeProfileEnum.SELF_EMPLOYED:
      status = 2;
      break;
    default:
      status = 6;
      break;
  }

  return status;
};

const getRate = (incomeProfile: IncomeProfileEnum, residenceType: ResidenceTypeEnum, requirement: Requirement) => {
  const residentialStatus = getResidentialStatus(residenceType);
  const incomeStatus = getIncomeStatus(incomeProfile);
  const baseRate = requirement?.rate;
  let rate = 0;
  if (residentialStatus === 12) {
    rate = baseRate / 100;
  } else {
    switch (incomeStatus) {
      case 1:
        rate = baseRate / 100;
        break;
      case 2:
        rate = baseRate / 100;
        break;
      default:
        rate = baseRate / 100;
        break;
    }
  }
  return rate;
};
