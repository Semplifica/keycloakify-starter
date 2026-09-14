import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

const linkClass = "text-blue-600 font-semibold hover:underline";

/**
 * Themed page for `login-idp-link-email.ftl`.
 *
 * This page asks the user to verify the email before linking an IdP account.
 * Email verification is currently disabled in the realm, so the page is not
 * expected to be rendered in production: it exists for completeness and keeps
 * the same visual language as the other custom pages. The page has no form
 * (Keycloak parity): the actions are plain links to `url.loginAction`.
 */
export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, realm, brokerContext, idpAlias } = kcContext;
    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("emailLinkIdpTitle", idpAlias)}>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p id="instruction1" className="instruction">
                    {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
                </p>
                <p id="instruction2" className="instruction">
                    {msg("emailLinkIdp2")}{" "}
                    <a href={url.loginAction} className={linkClass}>
                        {msg("doClickHere")}
                    </a>{" "}
                    {msg("emailLinkIdp3")}
                </p>
                <p id="instruction3" className="instruction">
                    {msg("emailLinkIdp4")}{" "}
                    <a href={url.loginAction} className={linkClass}>
                        {msg("doClickHere")}
                    </a>{" "}
                    {msg("emailLinkIdp5")}
                </p>
            </div>
        </Template>
    );
}
