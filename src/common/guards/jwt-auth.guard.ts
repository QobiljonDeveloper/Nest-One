import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    // asdf
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException({ message: "AuthHeader berilmagan" });
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer != "Bearer" || !token) {
      throw new UnauthorizedException({ message: "Bearer token aniqlanmadi" });
    }

    let decodedPayload: any;
    try {
      decodedPayload = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi authorizatsiyadan o'tmagan",
        error: error,
      });
    }

    req.user = decodedPayload;

    //  *logika
    return true;
  }
}
