import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Welcome home</h1>

      <Link href="/blog">Blog</Link>
      <br />
      <Link href="/profile">profile</Link>
      <br />
      <Link href="/products">products</Link>
      <br />
      <Link href="/order-product">order</Link>
      <br />
      <Link href="/login">login</Link>
      <br />
    </>
  );
}
