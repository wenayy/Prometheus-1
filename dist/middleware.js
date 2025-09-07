export function middleware(req, res, next) {
    const t = Date.now();
    next();
    const k = Date.now();
    console.log((((k - t) / 1000).toFixed(3)));
}
//# sourceMappingURL=middleware.js.map