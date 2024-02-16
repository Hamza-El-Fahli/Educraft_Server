"use client";

export default function ErrorBoundry({ error }: { error: Error }) {
  return <h1>{error.message}</h1>;
}
