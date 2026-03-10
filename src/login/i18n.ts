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
            showPassword: "Mostra password",
            registerTitle: "Registrazione",
            firstName: "Nome",
            lastName: "Cognome",
            passwordConfirm: "Conferma password",
            backToLogin: "Torna alla login",
            tipoUtente: "Tipo Utente",
            tipoUtente_1: "cliente dello studio",
            tipoUtente_2: "dipendente di un cliente di studio",
            tipoUtente_3: "funzionario di banca",
            doRegister: "Registrati",
            alreadyRegistered: "Sei già registrato?",
            requiredFields: "Campi obbligatori",
            noAccount: "Non hai un account?",
            resetPasswordTitle: "Password dimenticata?",
            emailOrUsername: "Email o nome utente",
            resetPasswordInstructions: "Inserisci il tuo indirizzo email e ti invieremo le istruzioni su come creare una nuova password.",
            sendInstructions: "Invia istruzioni",
            registerPageInstructions: "Compila i campi sottostanti per creare il tuo account."
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
            showPassword: "Show password",
            registerTitle: "Registration",
            firstName: "First name",
            lastName: "Last name",
            passwordConfirm: "Confirm password",
            backToLogin: "Back to login",
            tipoUtente: "User Type",
            tipoUtente_1: "studio client",
            tipoUtente_2: "employee of a studio client",
            tipoUtente_3: "bank officer",
            doRegister: "Register",
            alreadyRegistered: "Already registered?",
            requiredFields: "Required fields",
            noAccount: "Don't have an account?",
            resetPasswordTitle: "Forgot Your Password?",
            emailOrUsername: "Email or username",
            resetPasswordInstructions: "Enter your username or email address and we will send you instructions on how to create a new password.",
            sendInstructions: "Submit",
            registerPageInstructions: "Fill in the fields below to create your account."
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };

