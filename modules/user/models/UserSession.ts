export default interface UserSession {
    id: number;
    userId: number;
    platform: UserSessionPlatform;
    ipAddress: string;
    deviceType: string;
    os: string;
    version: string;
    lastActiveAt: number;
    createdAt: number
}

export type UserSessionPlatform = "DESKTOP" | "PHONE";
