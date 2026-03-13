import type { Meta, StoryObj } from "../kc.gen";
import { createKcPageStory } from "./KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-update-password.ftl" });

const meta = {
    title: "login/login-update-password.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

export const WithAppInitiatedAction: Story = {
    args: {
        kcContext: {
            isAppInitiatedAction: true,
            username: "testuser"
        }
    }
};

export const WithError: Story = {
    args: {
        kcContext: {
            messagesPerField: {
                existsError: (field: string) => field === "password" || field === "password-confirm",
                get: (field: string) => field === "password" ? "Password non valida" : "Le password non coincidono",
                printIfExists: (field: string, cssClass: string) => cssClass
            } as any
        }
    }
};
