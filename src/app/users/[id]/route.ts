import { userData } from "../usersData";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const users = userData;
  const myuser = users.find((user) => user.id === params.id);

  return Response.json(myuser || { found: false });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const users = userData;
  const data: any = await request.json();
  const userIndx = users.findIndex((user) => user.id == params.id);
  users[userIndx] = {
    id: params.id,
    ...data,
    profile: "user",
  };
  return Response.json(users, {
    headers: {
      "Constent-type": "text/json",
    },
    status: 201,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const users = userData;
  const userIndx = users.findIndex((user) => user.id == params.id);

  const deleted = users.splice(userIndx, 1);

  return Response.json(users, {
    headers: { "Content-type": "text/json" },
    status: 200,
  });
}