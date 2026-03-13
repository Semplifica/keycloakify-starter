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
            displayInfo={true}
            headerNode={msg("pageExpiredTitle")}
            headerDescriptionNode={msg("pageExpiredInstructions" as any)}
            infoNode={
                <div id="kc-registration" className="text-center text-sm text-slate-500">
                    <span>
                        <a 
                            id="loginRestartLink" 
                            href={url.loginRestartFlowUrl} 
                            target={window.location.pathname.includes("iframe.html") ? "_top" : undefined}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            {msg("backToLogin")}
                        </a>
                    </span>
                </div>
            }
        >
            <div className="text-center flex flex-col items-center">
                <div className="bg-yellow-50 text-yellow-600 p-4 rounded-full inline-block shadow-sm border border-yellow-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
        </Template>
    );
}
