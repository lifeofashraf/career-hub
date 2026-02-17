import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/builder(.*)',
    '/tracker(.*)',
    '/footprint(.*)',
    '/api/resumes(.*)',
    '/api/jobs(.*)',
    '/api/footprint(.*)',
    '/api/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
