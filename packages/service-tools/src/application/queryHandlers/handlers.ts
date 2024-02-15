/**
 * Given parseData, getDTO and parseDTO functions, creates a standardised query handler
 * which abstracts the plumbing required to call/chain these functions.
 *
 * Additionally, provides strict TS guard rails which ensure each functions conform to the
 * currently accepted standards.
 */
export const createQueryHandler =
  <TData extends Record<string, unknown>, TDTO extends Record<string, unknown>>(handlerFns: {
    parseData: (args: { data: TData }) => TData;
    getDTO: (args: { data: TData }) => Promise<TDTO>;
    parseDTO: (args: { dto: TDTO }) => TDTO;
  }) =>
  async (queryData: TData): Promise<TDTO> => {
    const { parseData, getDTO, parseDTO } = handlerFns;

    const data = parseData({ data: queryData });
    const dto = await getDTO({ data });
    return parseDTO({ dto });
  };
