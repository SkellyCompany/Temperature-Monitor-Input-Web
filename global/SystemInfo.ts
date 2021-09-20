class SystemInfo {
    public static readonly swagger: string = process.env.NEXT_PUBLIC_API_URL + "/swagger"
    public static readonly gaTrackingId: string = "UA-49210928-1"

    public static isProduction() {
        return process.env.NODE_ENV === "production";
    }
}

export default SystemInfo
