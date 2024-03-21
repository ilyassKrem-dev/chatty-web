export { default } from "next-auth/middleware"

export const config = {
    matcher:[
        "/tocomplete",
        "/chat",
        "/chat/:path*",
        "/profile",
        "/profile/:path*",
        "/search",
        "/search/:path*",
        "/group",
        "/group/:path*"
    ]
}