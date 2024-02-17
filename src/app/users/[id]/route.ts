import { userData } from "../usersData";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const users = userData;
  const myuser = users.find((user) => user.id === params.id);

  return Response.json(myuser || { found: false });
}
