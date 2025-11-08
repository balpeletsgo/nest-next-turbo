import { httpClient } from "@/lib/http-client";
import { UserResponse, WebResponse } from "@workspace/responses";

export class UserService {
  async me(token: string): Promise<WebResponse<UserResponse>> {
    const response = await httpClient.get<WebResponse<UserResponse>>(
      "/users/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  }
}

export const userService = new UserService();
