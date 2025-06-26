import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("User (e2e)", () => {
  let app: INestApplication;
  let token: String;

  jest.setTimeout(15000);
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // app.setGlobalPrefix("api")
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    const response = await request(app.getHttpServer())
      .post("/auth/signin")
      .send({
        email: "1sad@gmail.com",
        password: "qobiljon2019",
      });

    token = response.body.token;
    console.log("token", token);
  });
  it("/users (GET) --> 200 OK", () => {
    return request(app.getHttpServer())
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("/users (GET) --> 401 OK", () => {
    return (
      request(app.getHttpServer())
        .get("/users")
        //  .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(401)
    );
  });

  it("/auth/signup (POST) --> 201", () => {
    return request(app.getHttpServer())
      .post("/auth/signup")
      .send({
        name: "user123",
        email: "user123123@gmail.com",
        password: "123456789876543",
        value: "admin",
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });

  it("/auth/signup (POST) --> 400", () => {
    return request(app.getHttpServer())
      .post("/auth/signup")
      .send({
        name: "user123",
        email: "user1231232@gmail.com",
        password: "123456789876543",
        value: "admin",
      })
      .expect("Content-Type", /json/)
      .expect(409)
      .expect({
        message: "Bunday foydalanuvchi bor",
        error: "Conflict",
        statusCode: 409,
      });
  });
});
