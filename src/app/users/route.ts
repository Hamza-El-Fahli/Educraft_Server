import { NextRequest } from "next/server";
import { userData } from "./usersData";

export async function GET(request: NextRequest) {
  const users = userData;
  const selectedParams = request.nextUrl.searchParams;
  const query: string | null = selectedParams.get("query");

  console.log(query);
  const filteredUser = query
    ? users.filter((user) => user.name.includes(query))
    : users;

  return Response.json(filteredUser);
}
