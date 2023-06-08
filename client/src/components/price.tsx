export const Price = ({ price }: any) => {
  return <>{`€${Number(price).toFixed(2)}`}</>;
};
