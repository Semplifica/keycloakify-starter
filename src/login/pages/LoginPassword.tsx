import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wider";
const inputClass =
    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";
const errorClass = "text-xs text-red-500 mt-1 block";

/**
 * Themed page for `login-password.ftl`.
 *
 * keycloakify 11.9.3 models the password-only step with this pageId (`login-password.ftl`
 * is part of LOGIN_THEME_PAGE_IDS; no `login-idp-username-form.ftl` pageId exists in the
 * library). It is the re-authentication step of the first-broker flow: after the user
 * chooses "Collega all'account esistente" on `login-idp-link-confirm.ftl`, Keycloak asks
 * for the password of the existing account. It is also used by the standalone password
 * authenticator, so the copy stays neutral and mirrors the custom Login page.
 */
export default function LoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { realm, url, auth, messagesPerField } = kcContext;
    const { msg } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const attemptedUsername = auth?.attemptedUsername;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password")}
            headerNode={msg("doLogIn")}
        >
            <form
                id="kc-form-login"
                onSubmit={() => {
                    setIsLoginButtonDisabled(true);
                }}
                action={url.loginAction}
                method="post"
                className="space-y-6"
            >
                {attemptedUsername !== undefined && attemptedUsername !== "" && (
                    <div className="space-y-2">
                        <span className={labelClass}>{msg("email")}</span>
                        <p className="px-4 py-3 bg-slate-100 border border-slate-200 rounded text-slate-600 break-all">{attemptedUsername}</p>
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="password" className={labelClass}>
                        {msg("password")}
                    </label>
                    {/* No `required`: keycloakify's own LoginPassword page does not mark the field
                        mandatory upstream, so we keep parity with the library. */}
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className={inputClass}
                        autoFocus
                        autoComplete="current-password"
                        aria-invalid={messagesPerField.existsError("password")}
                        aria-describedby={messagesPerField.existsError("password") ? "input-error-password" : undefined}
                    />
                    {messagesPerField.existsError("password") && (
                        <span
                            id="input-error-password"
                            className={errorClass}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("password")) }}
                        />
                    )}
                </div>

                {realm.resetPasswordAllowed && (
                    <div className="flex items-center justify-end">
                        <a href={url.loginResetCredentialsUrl} className="text-sm text-blue-600 hover:underline">
                            {msg("doForgotPassword")}
                        </a>
                    </div>
                )}

                <div id="kc-form-buttons" className="pt-4">
                    <button
                        disabled={isLoginButtonDisabled}
                        className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#0066cc] hover:bg-[#0055aa] text-white rounded transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        name="login"
                        id="kc-login"
                        type="submit"
                    >
                        <span className="text-lg font-bold tracking-tight">{msg("doLogIn")}</span>
                    </button>
                </div>
            </form>
        </Template>
    );
}
