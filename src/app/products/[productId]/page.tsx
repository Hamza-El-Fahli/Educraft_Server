export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  return <h1>About the product {params.productId}</h1>;
}
