import AuthResponse from "./AuthResponse";

export default interface TokenData {
    refreshedAt: number;
    value: AuthResponse;
}