/**
 * No-op form action (QA 2026-11-11). Passing a function as `action` makes React render a
 * non-submitting action in the server HTML, so a form submitted before hydration no longer
 * does a native GET that puts the typed name, phone, email or comment in the page URL.
 * After hydration, the form's onSubmit (with preventDefault) handles every submit.
 */
export function blockNativeSubmit() {}
