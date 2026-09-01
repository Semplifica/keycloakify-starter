import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useEffect, useState } from "react";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        headerDescriptionNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props as any;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr } = i18n;
    const currentLanguageTag = (i18n as any).currentLanguageTag;

    const { realm, message, isAppInitiatedAction } = kcContext;
    const [isMessageVisible, setIsMessageVisible] = useState(true);

    useEffect(() => {
        setIsMessageVisible(true);
    }, [message]);

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, [documentTitle, realm.displayName, msgStr]);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 text-slate-900">
            <div className="w-full max-w-[480px]">
                <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col">
                    <div className="p-8 md:p-12 flex-grow">
                        {/* Header Node / Page Title */}
                        {headerNode && (
                            <div className="mb-8 text-center space-y-4">
                                <h2 className="text-3xl font-light text-slate-700">
                                    {headerNode}
                                </h2>
                                <p className="text-slate-400 text-sm max-w-[280px] mx-auto leading-relaxed">
                                    {headerDescriptionNode ?? msg("loginPageInstructions")}
                                </p>
                            </div>
                        )}

                        {/* App Message (Error/Success) */}
                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && isMessageVisible && (
                            <div className={clsx(
                                "mb-6 flex overflow-hidden rounded-md border-l-4 shadow-sm animate-in fade-in slide-in-from-top-1 duration-300",
                                message.type === "error" ? "bg-red-50 border-red-500 text-red-900" : 
                                message.type === "success" ? "bg-green-50 border-green-500 text-green-900" : 
                                "bg-amber-50 border-amber-500 text-amber-900"
                            )}>
                                <div className="flex items-start p-4 w-full">
                                    <div className="flex-shrink-0 mr-3 mt-0.5">
                                        {message.type === "error" && (
                                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                            </svg>
                                        )}
                                        {message.type === "success" && (
                                            <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                            </svg>
                                        )}
                                        {(message.type === "info" || message.type === "warning") && (
                                            <svg className="h-5 w-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm font-semibold leading-none mb-1">
                                            {message.type === "error" ? "Attenzione" : 
                                             message.type === "success" ? "Operazione completata" : 
                                             "Informazione"}
                                        </p>
                                        <p className="text-sm opacity-90 leading-relaxed" dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                                    </div>
                                    <button 
                                        onClick={() => setIsMessageVisible(false)}
                                        className="flex-shrink-0 ml-4 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Required fields note (displayRequiredFields contract — e.g. first-broker update-profile form) */}
                        {displayRequiredFields && (
                            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                                {msg("requiredFields")}
                            </p>
                        )}

                        {/* Main Content */}
                        {children}

                        {/* Social Providers */}
                        {socialProvidersNode}

                        {/* Info / Registration */}
                        {displayInfo && (
                            <div className="mt-8 pt-8 border-t border-slate-100 text-center text-sm text-slate-500">
                                {infoNode}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer / Language Selector (Optional) */}
                {realm.internationalizationEnabled && ((realm as any).supportedLocales?.length ?? 0) > 1 && (
                    <footer className="mt-6 text-center text-xs text-slate-400 uppercase tracking-widest">
                        <div className="flex justify-center gap-4">
                            {(realm as any).supportedLocales?.map(({ languageTag, url, label }: { languageTag: string; url: string; label: string }) => (
                                <a 
                                    key={languageTag} 
                                    href={url} 
                                    className={clsx("hover:text-slate-600 transition-colors", currentLanguageTag === languageTag && "text-blue-600 font-bold")}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </footer>
                )}
            </div>
        </div>
    );
}
