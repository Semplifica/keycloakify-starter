import type { ReactElement, ReactNode } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

/**
 * The theme `Template` accepts an extra `headerDescriptionNode` prop (see ../Template.tsx)
 * that the keycloakify `TemplateProps` type does not declare. It is modelled explicitly
 * here (instead of casting to `any`) so that passing it stays type-checked.
 */
type ThemedTemplateProps = TemplateProps<KcContext, I18n> & {
    headerDescriptionNode?: ReactNode;
};
type ThemedTemplate = (props: ThemedTemplateProps) => ReactElement | null;

const buttonPrimaryClass =
    "w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#0066cc] hover:bg-[#0055aa] text-white rounded transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] cursor-pointer";
const buttonSecondaryClass =
    "w-full flex items-center justify-center py-3 px-6 bg-white border border-slate-200 text-slate-600 rounded font-semibold hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer";

/**
 * Themed page for `login-idp-link-confirm.ftl` (first-broker login).
 *
 * Keycloak renders this page when the user authenticates through an IdP (CIE) whose
 * email matches an already existing local account. The user either links the CIE to
 * that account (`submitAction=linkAccount`, followed by password re-authentication)
 * or reviews the profile with another email (`submitAction=updateProfile`).
 */
export default function LoginIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template: Template_base, classes } = props;
    const Template = Template_base as unknown as ThemedTemplate;

    const { url, auth } = kcContext;
    const { msg } = i18n;

    const existingAccount = auth?.attemptedUsername;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("confirmLinkIdpTitle")}
            headerDescriptionNode={
                <>
                    <span className="block">{msg("confirmLinkIdpDescription")}</span>
                    {existingAccount !== undefined && existingAccount !== "" && (
                        <span className="mt-2 block font-semibold text-slate-500">{msg("confirmLinkIdpAccountHint", existingAccount)}</span>
                    )}
                </>
            }
        >
            {/* Informational (non-error) notice: linking the CIE requires the existing account password. */}
            <div className="mb-6 flex overflow-hidden rounded-md border-l-4 border-amber-500 bg-amber-50 shadow-sm">
                <div className="flex items-start p-4 w-full">
                    <div className="flex-shrink-0 mr-3 mt-0.5">
                        <svg className="h-5 w-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm font-semibold leading-none mb-1 text-amber-900">{msg("confirmLinkIdpNoticeTitle")}</p>
                        <p className="text-sm text-amber-900 opacity-90 leading-relaxed">{msg("confirmLinkIdpPasswordNotice")}</p>
                    </div>
                </div>
            </div>

            <form id="kc-idp-link-confirm-form" action={url.loginAction} method="post" className="space-y-3">
                <button type="submit" name="submitAction" id="linkAccount" value="linkAccount" className={buttonPrimaryClass}>
                    <span className="text-lg font-bold tracking-tight">{msg("confirmLinkIdpContinue")}</span>
                </button>
                <button type="submit" name="submitAction" id="updateProfile" value="updateProfile" formNoValidate={true} className={buttonSecondaryClass}>
                    {msg("confirmLinkIdpReviewProfile")}
                </button>
            </form>
        </Template>
    );
}
