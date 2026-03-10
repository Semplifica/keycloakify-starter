import type { Meta, StoryObj } from "../kc.gen";
import { createKcPageStory } from "./KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-reset-password.ftl" });

const meta = {
    title: "login/login-reset-password.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

export const WithEmail: Story = {
    args: {
        kcContext: {
            auth: {
                attemptedUsername: "test@example.com"
            }
        }
    }
};

export const WithError: Story = {
    args: {
        kcContext: {
            messagesPerField: {
                existsError: (field: string) => field === "username",
                get: (field: string) => field === "username" ? "Utente non trovato." : ""
            }
        }
    }
};
