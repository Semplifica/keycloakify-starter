import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { KcPage } from "./kc.gen";

import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    const pageId = (new URLSearchParams(window.location.search).get("page") as any) || "register.ftl";
    window.kcContext = getKcContextMock({
        pageId,
        overrides: {}
    });
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {!window.kcContext ? (
            <h1>No Keycloak Context</h1>
        ) : (
            <KcPage kcContext={window.kcContext} />
        )}
    </StrictMode>
);
