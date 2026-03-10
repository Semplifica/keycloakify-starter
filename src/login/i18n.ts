/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        it: {
            loginAccountTitle: "Accedi all'area riservata",
            loginPageInstructions: "Per accedere ai servizi, utilizza una delle seguenti modalità.",
            loginTabLabel: "login / password",
            cieTabLabel: "CIE",
            cieInstructions: "Accedi con CIE, la Carta d'Identità Elettronica.",
            cieButtonLabel: "Entra con CIE",
            noCieLink: "Non hai la CIE? Richiedila al tuo Comune",
            invalidUserMessage: "Nome utente o password non validi.",
            loginFailure: "Nome utente o password non validi.",
            invalidUsernameOrPasswordMessage: "Nome utente o password non validi.",
            usernameOrEmail: "Nome utente o email",
            email: "Email",
            password: "Password",
            doLogIn: "Accedi",
            doForgotPassword: "Password dimenticata?",
            loginTitle: "Accedi",
            hidePassword: "Nascondi password",
            showPassword: "Mostra password"
        },
        en: {
            loginAccountTitle: "Sign in to your account",
            loginPageInstructions: "To access the services, use one of the following methods.",
            loginTabLabel: "login / password",
            cieTabLabel: "CIE",
            cieInstructions: "Log in with CIE, the Electronic Identity Card.",
            cieButtonLabel: "Sign in with CIE",
            noCieLink: "Don't have a CIE? Request it from your Municipality",
            invalidUserMessage: "Invalid username or password.",
            loginFailure: "Invalid username or password.",
            invalidUsernameOrPasswordMessage: "Invalid username or password.",
            usernameOrEmail: "Username or email",
            email: "Email",
            password: "Password",
            doLogIn: "Sign In",
            doForgotPassword: "Forgot Password?",
            loginTitle: "Login",
            hidePassword: "Hide password",
            showPassword: "Show password"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };

