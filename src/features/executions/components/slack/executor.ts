import type { NodeExecutor } from "@/features/executions/type";
import { NonRetriableError } from "inngest";
import Handlebars from "handlebars";
import { slackChannel } from "@/inngest/channels/slack";
import { decode } from "html-entities";
import axios from "axios";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  return new Handlebars.SafeString(jsonString);
});

type slackData = {
  variableName?: string;
  webhookUrl?: string;
  content?: string;
};

export const slackExecutor: NodeExecutor<slackData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    slackChannel().status({
      nodeId,
      status: "loading",
    })
  );

  if (!data.content) {
    await publish(
      slackChannel().status({
        nodeId,
        status: "error",
      })
    );
    throw new NonRetriableError("slack node: Message content is missing");
  }

  const rawContent = Handlebars.compile(data.content)(context);
  const content = decode(rawContent);

  try {
    if (!data.variableName) {
      await publish(
        slackChannel().status({
          nodeId,
          status: "error",
        })
      );
      throw new NonRetriableError("slack node: Variable name not configured");
    }

    if (!data.webhookUrl) {
      await publish(
        slackChannel().status({
          nodeId,
          status: "error",
        })
      );
      throw new NonRetriableError("slack node: Webhook URL not configured");
    }

    const result = await step.run("slack-webhook", async () => {
      await axios.post(data.webhookUrl as string, {
        json: {
          content: content,
        },
      });

      return {
        ...context,
        [data.variableName || "mySlack"]: {
          messageContent: content.slice(0, 2000),
        },
      };
    });

    await publish(
      slackChannel().status({
        nodeId,
        status: "success",
      })
    );

    return result;
  } catch (error) {
    await publish(
      slackChannel().status({
        nodeId,
        status: "error",
      })
    );
    throw error;
  }
};
