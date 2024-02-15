export default function Docs({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  if (params.slug.length === 2) {
    return <h1>Viewing docs for features {params.slug[0]}</h1>;
  }
  return <h1>Docs home page</h1>;
}
