import { createGetKcContextMock } from "keycloakify/login/KcContext";
import type { DeepPartial } from "keycloakify/tools/DeepPartial";
import { kcEnvDefaults, themeNames } from "../kc.gen";
import type {
    KcContext,
    KcContextExtension,
    KcContextExtensionPerPage
} from "./KcContext";
import KcPage from "./KcPage";

const kcContextExtension: KcContextExtension = {
    themeName: themeNames[0],
    properties: {
        ...kcEnvDefaults
    }
};
const kcContextExtensionPerPage: KcContextExtensionPerPage = {};
const locale = {
    currentLanguageTag: "it"
};

const isStorybook = window.location.pathname.includes("iframe.html");

export const { getKcContextMock } = createGetKcContextMock({
    kcContextExtension,
    kcContextExtensionPerPage,
    overrides: {
        locale
    },
    overridesPerPage: {
        "login.ftl": {
            url: {
                registrationUrl: isStorybook
                    ? "/iframe.html?args=&id=login-register-ftl--default&viewMode=story"
                    : "?page=register.ftl",
                loginResetCredentialsUrl: isStorybook
                    ? "/iframe.html?args=&id=login-login-reset-password-ftl--default&viewMode=story"
                    : "?page=login-reset-password.ftl"
            },
            social: {
                providers: [
                    {
                        alias: "cie",
                        displayName: "CIE",
                        loginUrl:
                            "https://idserver.servizicie.interno.gov.it/idp/profile/SAML2/Redirect/SSO"
                    }
                ]
            }
        },
        "register.ftl": {
            url: {
                loginUrl: isStorybook
                    ? "/iframe.html?args=&id=login-login-ftl--default&viewMode=story"
                    : "?page=login.ftl"
            }
        },
        "login-reset-password.ftl": {
            url: {
                loginUrl: isStorybook
                    ? "/iframe.html?args=&id=login-login-ftl--default&viewMode=story"
                    : "?page=login.ftl"
            }
        }
    }
});

export function createKcPageStory<PageId extends KcContext["pageId"]>(params: {
    pageId: PageId;
}) {
    const { pageId } = params;

    function KcPageStory(props: {
        kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
    }) {
        const { kcContext: overrides } = props;

        const kcContextMock = getKcContextMock({
            pageId,
            overrides
        });

        return <KcPage kcContext={kcContextMock} />;
    }

    return { KcPageStory };
}
