import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template: Template_base, classes } = props;
    const Template = Template_base as any;

    const { url, messagesPerField, auth } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={true}
            headerNode={msg("resetPasswordTitle")}
            headerDescriptionNode={msg("resetPasswordInstructions")}
            infoNode={
                <div id="kc-registration" className="text-center text-sm text-slate-500">
                    <a 
                        href={url.loginUrl} 
                        target={window.location.pathname.includes("iframe.html") ? "_top" : undefined}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        {msg("backToLogin")}
                    </a>
                </div>
            }
        >
            <form id="kc-reset-password-form" action={url.loginAction} method="post" className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="username" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {msg("email")}
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        defaultValue={auth?.attemptedUsername ?? ""}
                        autoFocus
                        autoComplete="username"
                        aria-invalid={messagesPerField.existsError("username")}
                    />
                    {messagesPerField.existsError("username") && (
                        <span
                            id="input-error-username"
                            className="text-xs text-red-500 mt-1 block"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("username"))
                            }}
                        />
                    )}
                </div>

                <div id="kc-form-buttons" className="pt-4">
                    <button
                        className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#0066cc] hover:bg-[#0055aa] text-white rounded transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        type="submit"
                    >
                        <div className="flex items-center justify-center bg-white/10 rounded-sm p-1.5 pointer-events-none text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="w-[1px] h-8 bg-white/30 pointer-events-none" />
                        <span className="text-lg font-bold tracking-tight">{msg("sendInstructions")}</span>
                    </button>
                </div>
            </form>
        </Template>
    );
}
