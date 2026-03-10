import type { Meta, StoryObj } from "../kc.gen";
import { createKcPageStory } from "./KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "register.ftl" });

const meta = {
    title: "login/register.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

export const WithEmailError: Story = {
    args: {
        kcContext: {
            messagesPerField: {
                existsError: (field: string) => field === "email",
                get: (field: string) => field === "email" ? "Indirizzo email già registrato." : ""
            }
        }
    }
};

export const WithPasswordMismatch: Story = {
    args: {
        kcContext: {
            messagesPerField: {
                existsError: (field: string) => field === "password-confirm",
                get: (field: string) => field === "password-confirm" ? "Le password non corrispondono." : ""
            }
        }
    }
};

export const WithGlobalError: Story = {
    args: {
        kcContext: {
            message: {
                summary: "Si è verificato un errore durante la registrazione. Riprova più tardi.",
                type: "error"
            }
        }
    }
};

export const WithMultipleErrors: Story = {
    args: {
        kcContext: {
            messagesPerField: {
                existsError: (field: string) => ["firstName", "lastName", "email"].includes(field),
                get: (field: string) => {
                    const errors: Record<string, string> = {
                        firstName: "Il nome è obbligatorio.",
                        lastName: "Il cognome è obbligatorio.",
                        email: "Inserisci un indirizzo email valido."
                    };
                    return errors[field] ?? "";
                }
            }
        }
    }
};
