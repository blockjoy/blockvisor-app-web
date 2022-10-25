export class LoginError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  cause?: unknown;
  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }
}
