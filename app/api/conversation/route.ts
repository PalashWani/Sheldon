import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);


export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    //CHECK IF USER HAS REQUESTED THE API FOR LESS THAN 5 TIMES
    const freeTrial = await checkApiLimit();
    //IF NOT THEN BLOCK HIS APP, RETURN 403 AS NEXTJS AUTOMATICALLY DETECTS 403 ERROR AND DISPLAYS A
    //ERROR SCREEN FOR PRO SUBSCRIPTION MODEL
    if(!freeTrial)
    {
      return new NextResponse("Free Trial Has Expired!.", {
        status: 403
      })
    }
    
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages
    });

    await increaseApiLimit();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
