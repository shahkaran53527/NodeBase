import { sendWorkflowExecution } from "@/inngest/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const workflowId = url.searchParams.get("workflowId");
    if (!workflowId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required query parameter 'workflowId'",
        },
        {
          status: 400,
        }
      );
    }
    const body = await req.json();

    const stripeData = {
      eventId: body.id,
      eventType: body.type,
      timestamp: body.created,
      livemode: body.livemode,
      raw: body.data?.object,
    };

    await sendWorkflowExecution({
      workflowId,
      initialData: {
        stripeData,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Stripe webhook error: ", error);
    return NextResponse.json(
      { success: false, error: "Failed to process Stripe event" },
      { status: 500 }
    );
  }
}
