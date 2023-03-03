import { ConflictError } from './ConflictError';
import { PrismaClientError } from './PrismaClientError';

export class UniqueConstraintError extends ConflictError {
  constructor(e: PrismaClientError) {
    const uniquefield = e.meta.target;

    super(`A record with this ${uniquefield} already exists`);
  }
}
