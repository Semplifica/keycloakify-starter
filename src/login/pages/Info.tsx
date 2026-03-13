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
                (client !== undefined && client.baseUrl !== undefined)
            }
            headerNode={messageHeader !== undefined ? messageHeader : msg("infoTitle" as any)}
            headerDescriptionNode={requiredActions !== undefined ? msg("infoRequiredActionInstructions" as any) : message.summary}
            infoNode={
                <div id="kc-registration" className="text-center text-sm text-slate-500">
                    <span>
                        {!skipLink && pageRedirectUri !== undefined ? (
                            <a href={pageRedirectUri} className="text-blue-600 font-semibold hover:underline">
                                {msg("backToLogin")}
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
                <div className="bg-blue-50 text-blue-600 p-4 rounded-full inline-block shadow-sm border border-blue-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                {requiredActions !== undefined && (
                    <div className="w-full text-left bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-3">
                        <b className="block text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-2">
                            {msg("requiredActionTitle" as any)}
                        </b>
                        <ul className="space-y-2">
                            {requiredActions.map(reqAction => (
                                <li key={reqAction} className="flex items-center gap-3 text-slate-700 font-medium">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                    {msg(`requiredAction.${reqAction}` as any)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {actionUri !== undefined && (
                    <div className="w-full pt-2">
                        <a 
                            href={actionUri} 
                            className="w-full flex items-center justify-center gap-4 py-3 px-6 bg-[#0066cc] hover:bg-[#0055aa] text-white rounded transition-all shadow-lg hover:shadow-xl active:scale-[0.98] font-bold"
                        >
                            {msg("proceedWithAction")}
                        </a>
                    </div>
                )}
            </div>
        </Template>
    );
}
