import { Type } from '../../src/Utils/interface';

declare global {
  namespace Express {
    interface Request {
      user?: Type;
    }
  }
}
