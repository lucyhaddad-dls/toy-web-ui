import { http, HttpResponse } from "msw";
import type { User } from "../model_utils/models";

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
