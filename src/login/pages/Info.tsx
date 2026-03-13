import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template: Template_base, classes } = props;
    const Template = Template_base as any;
    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;
    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            displayInfo={
                (!skipLink && pageRedirectUri !== undefined) ||
                actionUri !== undefined ||
                (client !== undefined && client.baseUrl !== undefined)
            }
            headerNode={messageHeader !== undefined ? messageHeader : message.summary}
            headerDescriptionNode={<></>}
            infoNode={
                <div id="kc-registration" className="text-center text-sm text-slate-500">
                    <span>
                        {!skipLink && pageRedirectUri !== undefined ? (
                            <a href={pageRedirectUri} className="text-blue-600 font-semibold hover:underline">
                                {msg("backToLogin")}
                            </a>
                        ) : actionUri !== undefined ? (
                            <a href={actionUri} className="text-blue-600 font-semibold hover:underline">
                                {msg("proceedWithAction")}
                            </a>
                        ) : client !== undefined && client.baseUrl !== undefined ? (
                            <a href={client.baseUrl} className="text-blue-600 font-semibold hover:underline">
                                {msg("backToLogin")}
                            </a>
                        ) : null}
                    </span>
                </div>
            }
        >
            <div id="kc-info-message" className="text-center space-y-6 flex flex-col items-center">
                <div className="bg-blue-50 text-blue-600 p-4 rounded-full inline-block mb-4 shadow-sm border border-blue-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                
                <p className="text-slate-600 font-medium whitespace-pre-line">
                    {message.summary}
                </p>

                {requiredActions !== undefined && (
                    <div className="pt-4 w-full">
                        <b className="block text-sm text-slate-500 uppercase tracking-wider mb-2">
                            {msg("requiredActionTitle" as any)}
                        </b>
                        <p className="text-slate-700">
                            {requiredActions.map(reqAction => (
                                <span key={reqAction}>
                                    {msg(`requiredAction.${reqAction}` as any)}
                                </span>
                            ))}
                        </p>
                    </div>
                )}
            </div>
        </Template>
    );
}
