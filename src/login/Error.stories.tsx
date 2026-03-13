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
                summary: "Questo è un messaggio di errore personalizzato per scopi di test."
            },
            client: {
                baseUrl: "http://localhost:3000/"
            }
        }
    }
};
