import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Register(props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template: Template_base, classes } = props;
    const Template = Template_base as any;

    const { url, messagesPerField, profile, passwordRequired } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={messagesPerField.exists("global")}
            displayInfo={true}
            headerNode={msg("registerTitle")}
            headerDescriptionNode={msg("registerPageInstructions")}
            infoNode={
                <div id="kc-registration" className="text-center text-sm text-slate-500">
                    <span>
                        {msg("alreadyRegistered")}{" "}
                        <a 
                            href={url.loginUrl} 
                            target={window.location.pathname.includes("iframe.html") ? "_top" : undefined}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            {msg("doLogIn")}
                        </a>
                    </span>
                </div>
            }
        >
            <div className="flex justify-end mb-4">
                <span className="text-xs text-slate-400">
                    <span className="text-red-500 font-bold">*</span> {msg("requiredFields")}
                </span>
            </div>
            <form id="kc-register-form" action={url.registrationAction} method="post" className="space-y-4">
                <div className="space-y-1">
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {msg("email")} <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="email"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        name="email"
                        defaultValue={(profile as any)?.attributesByName?.email?.value ?? ""}
                        autoComplete="email"
                        aria-invalid={messagesPerField.existsError("email")}
                    />
                    {messagesPerField.existsError("email") && (
                        <span
                            id="input-error-email"
                            className="text-xs text-red-500 mt-1 block"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("email"))
                            }}
                        />
                    )}
                </div>

                {passwordRequired && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="password" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                {msg("password")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                name="password"
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            />
                            {messagesPerField.existsError("password") && (
                                <span
                                    id="input-error-password"
                                    className="text-xs text-red-500 mt-1 block"
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.get("password"))
                                    }}
                                />
                            )}
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="password-confirm" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                {msg("passwordConfirm")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="password-confirm"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                name="password-confirm"
                                aria-invalid={messagesPerField.existsError("password-confirm")}
                            />
                            {messagesPerField.existsError("password-confirm") && (
                                <span
                                    id="input-error-password-confirm"
                                    className="text-xs text-red-500 mt-1 block"
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.get("password-confirm"))
                                    }}
                                />
                            )}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label htmlFor="firstName" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {msg("firstName")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            name="firstName"
                            defaultValue={(profile as any)?.attributesByName?.firstName?.value ?? ""}
                            aria-invalid={messagesPerField.existsError("firstName")}
                        />
                        {messagesPerField.existsError("firstName") && (
                            <span
                                id="input-error-firstname"
                                className="text-xs text-red-500 mt-1 block"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("firstName"))
                                }}
                            />
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="lastName" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {msg("lastName")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            name="lastName"
                            defaultValue={(profile as any)?.attributesByName?.lastName?.value ?? ""}
                            aria-invalid={messagesPerField.existsError("lastName")}
                        />
                        {messagesPerField.existsError("lastName") && (
                            <span
                                id="input-error-lastname"
                                className="text-xs text-red-500 mt-1 block"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("lastName"))
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* Custom field TipoUtente */}
                <div className="space-y-1">
                    <label htmlFor="user.attributes.TipoUtente" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {msg("tipoUtente")} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            id="user.attributes.TipoUtente"
                            name="user.attributes.TipoUtente"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                            defaultValue={(profile as any)?.attributesByName?.TipoUtente?.value ?? ""}
                        >
                            <option value="" disabled>---</option>
                            <option value="1">{msg("tipoUtente_1")}</option>
                            <option value="2">{msg("tipoUtente_2")}</option>
                            <option value="3">{msg("tipoUtente_3")}</option>
                            <option value="4">{msg("tipoUtente_4")}</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div id="kc-form-buttons" className="pt-4">
                    <button
                        className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#0066cc] hover:bg-[#0055aa] text-white rounded transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        type="submit"
                    >
                         <div className="flex items-center justify-center bg-white/10 rounded-sm p-1.5 pointer-events-none text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <div className="w-[1px] h-8 bg-white/30 pointer-events-none" />
                        <span className="text-lg font-bold tracking-tight">{msg("doRegister")}</span>
                    </button>
                </div>
            </form>
        </Template>
    );
}
