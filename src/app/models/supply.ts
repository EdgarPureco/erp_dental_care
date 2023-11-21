export interface Supply {
  name: string;
  cost: number;
  price: number;
  is_salable: boolean;
  buy_unit: string;
  use_unit: string;
  equivalence: number;
  image: string;
}

export function createSupply(obj: any, image: any) {

  const supply: Supply = {
    name: obj.name,
    cost: obj.cost,
    price: obj.price,
    is_salable: obj.is_salable,
    buy_unit: obj.buy_unit,
    use_unit: obj.use_unit,
    equivalence: obj.equivalence,
    image: image,
  };
  return supply
}