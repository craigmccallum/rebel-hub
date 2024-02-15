import { UnexpectedError } from '~/common/errors';

export const generateId = <TType extends string>(type: TType): `${TType}-${string}` => {
  if (!type) {
    throw new UnexpectedError('An ID type must be provided');
  }
  const random = Math.random().toString().slice(2, 10);
  return `${type}-${Date.now().toString()}-${random}`;
};
