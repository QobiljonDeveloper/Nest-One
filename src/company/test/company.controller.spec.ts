import { Test } from "@nestjs/testing";
import { CompanyController } from "../company.controller";
import { CompanyService } from "../company.service";
import { companyStubs } from "../stubs/company.stubs";
import { Company } from "../models/company.model";

jest.mock("../company.service");

describe("CompanyController", () => {
  let companyController: CompanyController;
  let companyService: jest.Mocked<CompanyService>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService],
    }).compile();

    companyController = moduleRef.get(CompanyController);
    companyService = moduleRef.get(CompanyService);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(companyController).toBeDefined();
    expect(companyService).toBeDefined();
  });

  describe("getAllCompanies", () => {
    let result: Company[];
    beforeAll(async () => {
      result = await companyController.getAllCompanies();
    });

    it("should call companyService.getAllCompanies", () => {
      expect(companyService.getAllCompanies).toHaveBeenCalled();
    });

    it("should return an array of companies", () => {
      expect(result).toEqual([companyStubs()]);
    });
  });

  describe("getCompanyById", () => {
    let result: Company | null;
    const companyId = 1;

    beforeAll(async () => {
      result = await companyController.getCompanyById(companyId);
    });

    it("should call companyService.getCompanyById with correct id", () => {
      expect(companyService.getCompanyById).toHaveBeenCalledWith(companyId);
    });

    it("should return the company", () => {
      expect(result).toEqual(companyStubs());
    });
  });

  describe("createCompany", () => {
    let result: Company;
    const dto = {
      name: "building",
      phone: "998947091973",
      email: "building@gmail.uz",
      address: "chilonzor",
    };

    beforeAll(async () => {
      result = await companyController.createCompany(dto);
    });

    it("should call companyService.createCompany with dto", () => {
      expect(companyService.createCompany).toHaveBeenCalledWith(dto);
    });

    it("should return the created company", () => {
      expect(result).toEqual(companyStubs());
    });
  });

  describe("deleteCompanyById", () => {
    let result: string;
    const companyId = 1;

    beforeAll(async () => {
      result = await companyController.deleteCompanyById(companyId);
    });

    it("should call companyService.deleteCompanyById with correct id", () => {
      expect(companyService.deleteCompanyById).toHaveBeenCalledWith(companyId);
    });

    it("should return the deleted company", () => {
      expect(result).toEqual(companyStubs());
    });
  });
  describe("updateCompanyById", () => {
    let result: Company;
    const companyId = 1;
    const updateDto = {
      name: "Updated Co",
      phone: "998900000000",
      email: "updated@example.com",
      address: "Olmazor",
    };

    beforeAll(async () => {
      result = await companyController.updateCompanyById(updateDto, companyId);
    });

    it("should call companyService.updateCompanyById with correct id and dto", () => {
      expect(companyService.updateCompanyById).toHaveBeenCalledWith(
        companyId,
        updateDto
      );
    });

    it("should return the updated company", () => {
      expect(result).toEqual(companyStubs());
    });
  });
});
