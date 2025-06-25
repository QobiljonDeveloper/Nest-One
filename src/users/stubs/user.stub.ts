import { User } from "../models/user.model";

export const userStub = (): Partial<User> => {
  return {
    id: 1,
    name: "user1",
    email: "user@mail.uz",
    password: "1234567689",
    is_active: true,
  };
};
