import { jwtDecode } from "jwt-decode"
import { createContext } from "react";

export const UserContext = createContext(null);

export const userDecodeToken = (theToken) => {
    const decoded = jwtDecode(theToken);
    return { role: decoded.role, userId: decoded.jti, nome: decoded.name, token: theToken }
}