type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  profile: "admin" | "user" | "prof";
};

export const userData: User[] = [
  {
    id: "NHuXe29M6l916z15w0rc",
    email: "med@mail.com",
    name: "med",
    password: "0000",
    profile: "user",
  },
  {
    id: "UsyK0Z0TVhZO0KUDfMms",
    email: "0",
    name: "TestUser",
    password: "0",
    profile: "user",
  },
  {
    id: "ouPRHjQXdM94c3l2yb9i",
    email: "0@m.com",
    name: "Test",
    password: "0",
    profile: "user",
  },
  {
    id: "yM9kKKg9oaO3MKdLrv6J",
    email: "hamza@mail.com",
    name: "Hamza",
    password: "1234",
    profile: "admin",
  },
];
