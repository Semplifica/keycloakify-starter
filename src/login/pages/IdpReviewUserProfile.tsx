import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

type LegacyReviewUser = {
    firstName?: string;
    lastName?: string;
    email?: string;
};

/**
 * Themed page for the legacy first-broker review (`idp-review-user-profile.ftl`).
 *
 * NOTE: the lscorcia CIE SAML provider (a KC 18/19-era fork) renders this page with
 * the LEGACY model (`kcContext.user.firstName` / `lastName` / `email`), NOT the
 * declarative `profile` object that keycloakify's default `IdpReviewUserProfile`
 * requires. The default page therefore breaks into an unstyled/blank form, so we
 * theme the legacy form here with the same Tailwind vocabulary as the other pages.
 */
export default function IdpReviewUserProfile(
    props: PageProps<
        Extract<KcContext, { pageId: "idp-review-user-profile.ftl" }> & {
            user?: LegacyReviewUser;
        },
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template: Template_base, classes } = props;
    const Template = Template_base as any;
    const { url, messagesPerField } = kcContext;
    const { msg } = i18n;
    const user = (kcContext.user ?? {}) as LegacyReviewUser;

    const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wider";
    const inputClass =
        "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";
    const errorClass = "text-xs text-red-500 mt-1 block";

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayRequiredFields={true}
            displayMessage={messagesPerField.exists("global")}
            headerNode={msg("loginIdpReviewProfileTitle")}
            headerDescriptionNode={<></>}
        >
            <form id="kc-idp-review-profile-form" action={url.loginAction} method="post" className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="firstName" className={labelClass}>
                        {msg("firstName")}
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className={inputClass}
                        defaultValue={user.firstName ?? ""}
                        autoComplete="given-name"
                        aria-invalid={messagesPerField.existsError("firstName")}
                    />
                    {messagesPerField.existsError("firstName") && (
                        <span id="input-error-firstName" className={errorClass} aria-live="polite" dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("firstName")) }} />
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="lastName" className={labelClass}>
                        {msg("lastName")}
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className={inputClass}
                        defaultValue={user.lastName ?? ""}
                        autoComplete="family-name"
                        aria-invalid={messagesPerField.existsError("lastName")}
                    />
                    {messagesPerField.existsError("lastName") && (
                        <span id="input-error-lastName" className={errorClass} aria-live="polite" dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("lastName")) }} />
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className={labelClass}>
                        {msg("email")}
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={inputClass}
                        defaultValue={user.email ?? ""}
                        autoComplete="email"
                        aria-invalid={messagesPerField.existsError("email")}
                    />
                    {messagesPerField.existsError("email") && (
                        <span id="input-error-email" className={errorClass} aria-live="polite" dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("email")) }} />
                    )}
                </div>

                <div id="kc-form-buttons" className="pt-4 space-y-3">
                    <button
                        type="submit"
                        name="submitAction"
                        value="submit"
                        className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#0066cc] hover:bg-[#0055aa] text-white rounded transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] cursor-pointer"
                    >
                        <span className="text-lg font-bold tracking-tight">{msg("doSubmit")}</span>
                    </button>
                    <button
                        type="submit"
                        name="submitAction"
                        value="cancel"
                        formNoValidate={true}
                        className="w-full flex items-center justify-center py-3 px-6 bg-white border border-slate-200 text-slate-600 rounded font-semibold hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer"
                    >
                        {msg("doCancel")}
                    </button>
                </div>
            </form>
        </Template>
    );
}