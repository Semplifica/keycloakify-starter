import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import type { JSX } from "keycloakify/tools/JSX";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

type UpdateProfileProps = PageProps<Extract<KcContext, { pageId: "login-update-profile.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function UpdateProfile(props: UpdateProfileProps) {
    const { kcContext, i18n, doUseDefaultCss, Template: Template_base, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;
    const Template = Template_base as any;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { messagesPerField, url, isAppInitiatedAction } = kcContext;

    const { msg } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayRequiredFields={true}
            displayMessage={messagesPerField.exists("global")}
            headerNode={msg("loginProfileTitle")}
            headerDescriptionNode={<></>}
        >
            <form id="kc-update-profile-form" action={url.loginAction} method="post" className="space-y-6">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />

                <div id="kc-form-buttons" className="pt-4 space-y-3">
                    <button
                        className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#0066cc] hover:bg-[#0055aa] text-white rounded transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        type="submit"
                        disabled={!isFormSubmittable}
                    >
                        <span className="text-lg font-bold tracking-tight">{msg("doSubmit")}</span>
                    </button>
                    {isAppInitiatedAction && (
                        <button
                            className="w-full flex items-center justify-center py-3 px-6 bg-white border border-slate-200 text-slate-600 rounded font-semibold hover:bg-slate-50 hover:text-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            type="submit"
                            name="cancel-aia"
                            value="true"
                            formNoValidate={true}
                        >
                            {msg("doCancel")}
                        </button>
                    )}
                </div>
            </form>
        </Template>
    );
}
