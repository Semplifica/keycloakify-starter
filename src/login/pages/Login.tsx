import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { useEffect, useReducer, useState } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const [activeTab, setActiveTab] = useState<"login" | "cie">("login");

    const cieProvider = social?.providers?.find(p => p.alias.toLowerCase().includes("cie") || p.displayName.toLowerCase().includes("cie"));

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container">
                    <div id="kc-registration">
                        <span>
                            {msg("noAccount")}{" "}
                            <a tabIndex={8} href={url.registrationUrl} className="text-blue-600 hover:underline">
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                </div>
            }
        >
            <div id="kc-form" className="flex flex-col h-full">
                {/* Tabs */}
                <div className="flex border-b border-slate-200 mb-8">
                    <button
                        onClick={() => setActiveTab("login")}
                        className={clsx(
                            "flex-1 py-4 text-sm font-medium transition-all border-b-2 uppercase tracking-wider",
                            activeTab === "login" 
                                ? "border-blue-600 text-blue-600" 
                                : "border-transparent text-slate-400 hover:text-slate-600"
                        )}
                    >
                        {msg("loginTabLabel")}
                    </button>
                    <button
                        onClick={() => setActiveTab("cie")}
                        className={clsx(
                            "flex-1 py-4 text-sm font-medium transition-all border-b-2 uppercase tracking-wider",
                            activeTab === "cie" 
                                ? "border-blue-600 text-blue-600" 
                                : "border-transparent text-slate-400 hover:text-slate-600"
                        )}
                    >
                        {msg("cieTabLabel")}
                    </button>
                </div>

                <div id="kc-form-wrapper" className="flex-grow">
                    {activeTab === "login" ? (
                        realm.password && (
                            <form
                                id="kc-form-login"
                                onSubmit={() => {
                                    setIsLoginButtonDisabled(true);
                                    return true;
                                }}
                                action={url.loginAction}
                                method="post"
                                className="space-y-6"
                            >
                                {!usernameHidden && (
                                    <div className="space-y-2">
                                        <label htmlFor="username" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            {msg("email")}
                                        </label>
                                        <input
                                            tabIndex={2}
                                            id="username"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            type="text"
                                            autoFocus
                                            autoComplete="username"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                        />
                                        {messagesPerField.existsError("username", "password") && (
                                            <span
                                                id="input-error"
                                                className="text-xs text-red-500 mt-1 block"
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                }}
                                            />
                                        )}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        {msg("password")}
                                    </label>
                                    <PasswordWrapper passwordInputId="password" msgStr={msgStr}>
                                        <input
                                            tabIndex={3}
                                            id="password"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                        />
                                    </PasswordWrapper>
                                    {usernameHidden && messagesPerField.existsError("username", "password") && (
                                        <span
                                            id="input-error"
                                            className="text-xs text-red-500 mt-1 block"
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="flex items-center justify-between py-2">
                                    {realm.rememberMe && !usernameHidden && (
                                        <label className="flex items-center space-x-2 cursor-pointer group">
                                            <input
                                                tabIndex={5}
                                                id="rememberMe"
                                                name="rememberMe"
                                                type="checkbox"
                                                defaultChecked={!!login.rememberMe}
                                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
                                                {msg("rememberMe")}
                                            </span>
                                        </label>
                                    )}
                                    {realm.resetPasswordAllowed && (
                                        <a tabIndex={6} href={url.loginResetCredentialsUrl} className="text-sm text-blue-600 hover:underline">
                                            {msg("doForgotPassword")}
                                        </a>
                                    )}
                                </div>

                                <div id="kc-form-buttons" className="pt-4">
                                    <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                    <button
                                        tabIndex={7}
                                        disabled={isLoginButtonDisabled}
                                        className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#0066cc] hover:bg-[#0055aa] text-white rounded transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                        name="login"
                                        id="kc-login"
                                        type="submit"
                                    >
                                        <div className="flex items-center justify-center bg-white/10 rounded-sm p-1.5 pointer-events-none text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                        <div className="w-[1px] h-8 bg-white/30 pointer-events-none" />
                                        <span className="text-lg font-bold tracking-tight pointer-events-none">{msg("doLogIn")}</span>
                                    </button>
                                </div>
                            </form>
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center p-4 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <p className="text-slate-600 text-sm text-center leading-relaxed">
                                {msg("cieInstructions")}
                            </p>
                            
                            <a
                                href={cieProvider?.loginUrl ?? "#"}
                                className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#0066cc] hover:bg-[#0055aa] text-white rounded transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] cursor-pointer"
                            >
                                <div className="flex items-center justify-center bg-white/10 rounded-sm p-1.5 pointer-events-none text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.333 0 4 1 4 3" />
                                    </svg>
                                </div>
                                <div className="w-[1px] h-8 bg-white/30 pointer-events-none" />
                                <span className="text-lg font-bold tracking-tight pointer-events-none">{msg("cieButtonLabel")}</span>
                            </a>

                            <div className="pt-8 text-center">
                                <a href="https://www.cartaidentita.interno.gov.it/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                    {msg("noCieLink")}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Template>
    );
}

function PasswordWrapper(props: { passwordInputId: string; children: JSX.Element; msgStr: I18n["msgStr"] }) {
    const { passwordInputId, children, msgStr } = props;

    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);

    useEffect(() => {
        const passwordInputElement = document.getElementById(passwordInputId);

        assert(passwordInputElement instanceof HTMLInputElement);

        passwordInputElement.type = isPasswordRevealed ? "text" : "password";
    }, [isPasswordRevealed]);

    return (
        <div className="relative">
            {children}
            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                onClick={toggleIsPasswordRevealed}
            >
                {isPasswordRevealed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                )}
            </button>
        </div>
    );
}
