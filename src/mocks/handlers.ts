import { http, HttpResponse } from "msw";


interface User {
    id: string
    firstName: string
    lastName: string
}

export const handlers = [
  http.get("/user", () => {
    const mockUser: User = {
      id: "abc-123",
      firstName: "John",
      lastName: "Maverick",
    };
    return HttpResponse.json(mockUser);
  }),
];