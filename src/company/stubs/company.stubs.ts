import { Company } from "../models/company.model";

export const companyStubs = (): Partial<Company> => {
  return {
    id: 1,
    name: "building",
    phone: "998947091973",
    email: "building@gmail.uz",
    address: "chilonzor",
  };
};
