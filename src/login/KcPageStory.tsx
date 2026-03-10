import { createGetKcContextMock } from "keycloakify/login/KcContext";
import type { DeepPartial } from "keycloakify/tools/DeepPartial";
import { kcEnvDefaults, themeNames } from "../kc.gen";
import type { KcContext, KcContextExtension, KcContextExtensionPerPage } from "./KcContext";
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

export const { getKcContextMock } = createGetKcContextMock({
    kcContextExtension,
    kcContextExtensionPerPage,
    overrides: {
        locale
    },
    overridesPerPage: {
        "login.ftl": {
            social: {
                providers: [
                    {
                        alias: "cie",
                        displayName: "CIE",
                        loginUrl: "https://idserver.servizicie.interno.gov.it/idp/profile/SAML2/Redirect/SSO"
                    }
                ]
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
