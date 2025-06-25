import { JwtService } from "@nestjs/jwt";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { Test } from "@nestjs/testing";
import { User } from "../models/user.model";
import { userStub } from "../stubs/user.stub";
import { CreateUserDto } from "../dto/create-user.dto";

jest.mock("../users.service");

describe("Users controller", () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();

    usersService = moduleRef.get(UsersService);
    usersController = moduleRef.get(UsersController);

    jest.clearAllMocks();
  });

  it("User controller should be defined", () => {
    expect(usersController).toBeDefined();
  });

  it("User service should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("findAll", () => {
    describe("when findAll is called", () => {
      let users: User[];
      beforeAll(async () => {
        users = await usersController.findAll();
      });
      test("then it should call findAll service", () => {
        expect(usersService.findAll).toHaveBeenCalled();
      });
      test("then it should return users list", () => {
        console.log(users);
        expect(users).toEqual([userStub()]);
      });
    });
  });
  //   describe("findOne", () => {
  //     describe("when findOne is called", () => {
  //       let user: User | null;
  //       beforeAll(async () => {
  //         user = await usersController.findOne(String(userStub().id));
  //       });
  //       test("then it should call findOne service", () => {
  //         expect(usersService.findOne).toHaveBeenCalledWith(
  //           String(userStub().id)
  //         );
  //       });
  //       test("then it should return user", () => {
  //         console.log(user);
  //         expect(user).toEqual(userStub());
  //       });
  //     });
  //   });

  describe("Create User", () => {
    describe("when findOne is called", () => {
      let user: User | null;
      let createUserDto: CreateUserDto;
      beforeAll(async () => {
        createUserDto = {
          name: userStub().name!,
          email: userStub().email!,
          password: userStub().password!,
          value: "user",
        };
        user = await usersController.create(createUserDto);
      });
      test("then it should call create service", () => {
        expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      });
      test("then it should return user", () => {
        console.log(user);
        expect(user).toEqual(userStub());
      });
    });
  });
});
