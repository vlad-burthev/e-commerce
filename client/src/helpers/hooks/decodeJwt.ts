import jwt_decode from "jwt-decode";

export const decodeJwt = (token: string) => {
  const { user } = jwt_decode(`Bearer ${token}`);
  return user;
};
