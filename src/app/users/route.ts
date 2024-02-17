import { userData } from "./usersData";

export async function GET() {
  const users = userData;
  return Response.json(users);
}
