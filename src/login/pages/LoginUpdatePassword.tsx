import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template: Template_base, classes } = props;
    const Template = Template_base as any;
    const { url, messagesPerField, isAppInitiatedAction } = kcContext;
    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            displayInfo={isAppInitiatedAction}
            headerNode={msg("updatePasswordTitle")}
            headerDescriptionNode={<></>}
            infoNode={
                isAppInitiatedAction ? (
                    <div className="text-center text-sm">
                        <button 
                            type="submit" 
                            name="cancel-aia" 
                            value="true" 
                            form="kc-passwd-update-form"
                            className="text-blue-600 font-semibold hover:underline bg-transparent border-none cursor-pointer"
                        >
                            {msg("doCancel")}
                        </button>
                    </div>
                ) : null
            }
        >
            <form id="kc-passwd-update-form" action={url.loginAction} method="post" className="space-y-6">
                <input
                    type="text"
                    id="username"
                    name="username"
                    defaultValue={(kcContext as any).username ?? ""}
                    autoComplete="username"
                    readOnly={true}
                    style={{ display: "none" }}
                />
                
                <div className="space-y-2">
                    <label htmlFor="password-new" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {msg("passwordNew")}
                    </label>
                    <input
                        type="password"
                        id="password-new"
                        name="password-new"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        autoFocus
                        autoComplete="new-password"
                        aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                    />
                    {messagesPerField.existsError("password") && (
                        <span id="input-error-password" className="text-xs text-red-500 mt-1 block" aria-live="polite" dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("password")) }} />
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="password-confirm" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {msg("passwordConfirm")}
                    </label>
                    <input
                        type="password"
                        id="password-confirm"
                        name="password-confirm"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        autoComplete="new-password"
                        aria-invalid={messagesPerField.existsError("password-confirm")}
                    />
                    {messagesPerField.existsError("password-confirm") && (
                        <span id="input-error-password-confirm" className="text-xs text-red-500 mt-1 block" aria-live="polite" dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("password-confirm")) }} />
                    )}
                </div>

                <div id="kc-form-buttons" className="pt-4">
                    <button
                        className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#0066cc] hover:bg-[#0055aa] text-white rounded transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        type="submit"
                        value="true"
                    >
                        <span className="text-lg font-bold tracking-tight">{msg("doSubmit")}</span>
                    </button>
                </div>
            </form>
        </Template>
    );
}
