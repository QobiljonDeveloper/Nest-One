import { companyStubs } from "../stubs/company.stubs";

export const CompanyService = jest.fn().mockReturnValue({
  createCompany: jest.fn().mockResolvedValue(companyStubs()),
  getAllCompanies: jest.fn().mockResolvedValue([companyStubs()]),
  getCompanyById: jest.fn().mockResolvedValue(companyStubs()),
  deleteCompanyById: jest.fn().mockResolvedValue(companyStubs()),
  updateCompanyById: jest.fn().mockResolvedValue(companyStubs()),
});
