import type { NodeExecutor } from "@/features/executions/type";
import { NonRetriableError } from "inngest";
import Handlebars from "handlebars";
import { discordChannel } from "@/inngest/channels/discord";
import { decode } from "html-entities";
import axios from "axios";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  return new Handlebars.SafeString(jsonString);
});

type discordData = {
  variableName?: string;
  webhookUrl?: string;
  content?: string;
  username?: string;
};

export const discordExecutor: NodeExecutor<discordData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    discordChannel().status({
      nodeId,
      status: "loading",
    })
  );

  if (!data.content) {
    await publish(
      discordChannel().status({
        nodeId,
        status: "error",
      })
    );
    throw new NonRetriableError("Discord node: Message content is missing");
  }

  const rawContent = Handlebars.compile(data.content)(context);
  const content = decode(rawContent);
  const username = data.username
    ? Handlebars.compile(data.username)(context)
    : undefined;

  try {
    if (!data.variableName) {
      await publish(
        discordChannel().status({
          nodeId,
          status: "error",
        })
      );
      throw new NonRetriableError("Discord node: Variable name not configured");
    }

    if (!data.webhookUrl) {
      await publish(
        discordChannel().status({
          nodeId,
          status: "error",
        })
      );
      throw new NonRetriableError("Discord node: Webhook URL not configured");
    }

    const result = await step.run("discord-webhook", async () => {
      await axios.post(data.webhookUrl as string, {
        json: {
          content: content.slice(0, 2000),
        },
        username,
      });

      return {
        ...context,
        [data?.variableName || "myDiscord"]: {
          messageContent: content.slice(0, 2000),
        },
      };
    });

    await publish(
      discordChannel().status({
        nodeId,
        status: "success",
      })
    );

    return result;
  } catch (error) {
    await publish(
      discordChannel().status({
        nodeId,
        status: "error",
      })
    );
    throw error;
  }
};
