
import { doubleCsrf } from "csrf-csrf";

export function getSecret() {
    // Replace this with your actual secret retrieval logic
    return 'your-secret-key';
}
const doubleCsrfOptions = { getSecret: getSecret };
export const {
    invalidCsrfTokenError, // This is just for convenience if you plan on making your own middleware.
    generateToken, // Use this in your routes to provide a CSRF hash + token cookie and token.
    validateRequest, // Also a convenience if you plan on making your own middleware.
    doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf(doubleCsrfOptions);
