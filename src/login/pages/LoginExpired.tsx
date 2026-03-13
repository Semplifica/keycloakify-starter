import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template: Template_base, classes } = props;
    const Template = Template_base as any;
    const { url } = kcContext;
    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            displayInfo={false}
            headerNode={msg("pageExpiredTitle")}
            headerDescriptionNode={msg("pageExpiredInstructions" as any)}
        >
            <div className="text-center space-y-6 flex flex-col items-center">
                <div className="bg-yellow-50 text-yellow-600 p-4 rounded-full inline-block shadow-sm border border-yellow-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <div className="w-full pt-2">
                    <a 
                        id="loginRestartLink" 
                        href={url.loginRestartFlowUrl} 
                        target={window.location.pathname.includes("iframe.html") ? "_top" : undefined}
                        className="w-full flex items-center justify-center gap-4 py-3 px-6 bg-[#0066cc] hover:bg-[#0055aa] text-white rounded transition-all shadow-lg hover:shadow-xl active:scale-[0.98] font-bold"
                    >
                        {msg("backToLogin")}
                    </a>
                </div>
            </div>
        </Template>
    );
}
