import { User } from "@/types";

export function getUser(): User | null {
  const userString = localStorage.getItem('user');
  if (userString === null) {
    return null;
  }
  return JSON.parse(userString) as User;
}
