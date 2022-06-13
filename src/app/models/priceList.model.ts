export class PriceList {
  constructor(
    public priceListID: number,
    public priceListName: string,
    public extErpPriceListID: number | null
  ) {}
}
