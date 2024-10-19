type DetailProductPageProps = {
  params: { slug: string };
};

export default function DetailProductPage(props: DetailProductPageProps) {
  const { params } = props;
  console.log(params);
  console.log("wew");
  return (
    <div>
      <h1> {params.slug ? "Detail Product Page" : "Product Page"}</h1>
      {params.slug && (
        <>
          {params?.slug[0] && <p> Category: {params.slug[0]}</p>}
          {params?.slug[1] && <p> Gender: {params.slug[1]}</p>}
          {params?.slug[2] && <p> Id: {params.slug[2]}</p>}
        </>
      )}
    </div>
  );
}
