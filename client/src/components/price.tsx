export const Price = (props: { price: number | string }) => {
  return <>{`€${Number(props.price).toFixed(2)}`}</>;
};
