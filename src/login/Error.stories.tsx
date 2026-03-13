import type { Meta, StoryObj } from "../kc.gen";
import { createKcPageStory } from "./KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "error.ftl" });

const meta = {
    title: "login/error.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

export const WithCustomError: Story = {
    args: {
        kcContext: {
            message: {
                summary: "This is a custom error message for testing purposes."
            },
            client: {
                baseUrl: "http://localhost:3000/"
            }
        }
    }
};
