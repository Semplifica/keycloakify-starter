import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function ErrorPage(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template: Template_base, classes } = props;
    const Template = Template_base as any;
    const { message, client } = kcContext;
    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            displayInfo={client !== undefined && client.baseUrl !== undefined}
            headerNode={msg("errorTitle")}
            headerDescriptionNode={<></>}
            infoNode={
                client !== undefined && client.baseUrl !== undefined ? (
                    <div id="kc-registration" className="text-center text-sm text-slate-500">
                        <span>
                            <a id="backToApplication" href={client.baseUrl} className="text-blue-600 font-semibold hover:underline">
                                {msg("backToLogin")}
                            </a>
                        </span>
                    </div>
                ) : null
            }
        >
            <div id="kc-error-message" className="text-center space-y-6 flex flex-col items-center">
                <div className="bg-red-50 text-red-600 p-4 rounded-full inline-block mb-4 shadow-sm border border-red-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                
                <p className="text-slate-600 font-medium whitespace-pre-line">
                    {message.summary}
                </p>
            </div>
        </Template>
    );
}
