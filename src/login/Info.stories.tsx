import type { Meta, StoryObj } from "../kc.gen";
import { createKcPageStory } from "./KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "info.ftl" });

const meta = {
    title: "login/info.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

export const WithRequiredActions: Story = {
    args: {
        kcContext: {
            message: {
                summary: "You need to perform the following actions to proceed:"
            },
            requiredActions: ["UPDATE_PASSWORD", "VERIFY_EMAIL"],
            client: {
                baseUrl: "http://localhost:3000/"
            }
        }
    }
};
