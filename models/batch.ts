export class FeathersBatch<T> {
  public total: number;
  public limit: number;
  public skip: number;
  public data: T[];
}
