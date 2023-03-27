export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
