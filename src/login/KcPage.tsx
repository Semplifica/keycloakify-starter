import type { ClassKey } from "keycloakify/login";
import DefaultPage from "keycloakify/login/DefaultPage";
import { Suspense, lazy } from "react";
import type { KcContext } from "./KcContext";
import Template from "./Template";
import { useI18n } from "./i18n";
import "./index.css";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginExpired = lazy(() => import("./pages/LoginExpired"));
const ErrorPage = lazy(() => import("./pages/Error"));
const Info = lazy(() => import("./pages/Info"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const UpdateProfile = lazy(() => import("./pages/UpdateProfile"));
const IdpReviewUserProfile = lazy(() => import("./pages/IdpReviewUserProfile"));
const LoginIdpLinkConfirm = lazy(() => import("./pages/LoginIdpLinkConfirm"));
const LoginIdpLinkEmail = lazy(() => import("./pages/LoginIdpLinkEmail"));
const LoginPassword = lazy(() => import("./pages/LoginPassword"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "register.ftl":
                        return (
                            <Register
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-reset-password.ftl":
                        return (
                            <LoginResetPassword
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-page-expired.ftl":
                        return (
                            <LoginExpired
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "error.ftl":
                        return (
                            <ErrorPage
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "info.ftl":
                        return (
                            <Info
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-update-password.ftl":
                        return (
                            <LoginUpdatePassword
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-update-profile.ftl":
                        return (
                            <UpdateProfile
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                    case "idp-review-user-profile.ftl":
                        return (
                            <IdpReviewUserProfile
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-idp-link-confirm.ftl":
                        return (
                            <LoginIdpLinkConfirm
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-idp-link-email.ftl":
                        return (
                            <LoginIdpLinkEmail
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-password.ftl":
                        return (
                            <LoginPassword
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    default:
                        // keycloakify 11.9.3 has no pageId type for the declarative
                        // `update-user-profile.ftl` (KC 25 renders it when the realm
                        // enables the declarative user profile, as in production).
                        // Reuse the same themed form as the legacy `login-update-profile.ftl`
                        // (UserProfileFormFields reads kcContext.profile — identical shape).
                        if ((kcContext as { pageId: string }).pageId === "update-user-profile.ftl") {
                            const updateProfileContext = kcContext as unknown as Extract<KcContext, { pageId: "login-update-profile.ftl" }>;
                            return (
                                <UpdateProfile
                                    kcContext={updateProfileContext}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                        }
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

// Intentionally empty: the equivalent styling lives in src/login/index.css, where Tailwind
// utilities are applied with higher specificity via `body.kcBodyClass` (or
// `.kcBodyClass.kcBodyClass`) instead of the `!important` overrides the `classes` map
// would require here. The object must stay because it is passed to every page.
const classes = {} satisfies { [key in ClassKey]?: string };
