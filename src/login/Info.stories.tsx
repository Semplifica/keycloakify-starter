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
            requiredActions: ["UPDATE_PASSWORD", "VERIFY_EMAIL"],
            actionUri: "#",
            client: {
                baseUrl: "http://localhost:3000/"
            }
        }
    }
};
