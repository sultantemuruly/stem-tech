import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { TextEncoder } from "util";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");

    const dataPath = path.join(process.cwd(), "data.txt");
    const rawData = fs.readFileSync(dataPath, "utf-8");

    if (!query) {
      return NextResponse.json(
        { error: "No query parameter provided." },
        { status: 400 }
      );
    }

    const chat = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      maxTokens: 100,
      streaming: true,
    });

    const encoder = new TextEncoder();
    const stream = await chat.stream([
      [
        "system",
        `
You are Sultan Temuruly's AI assistant. Only use the information provided below to answer user questions. 
If a question is unrelated to this data, respond with:

"I'm sorry, I can only answer questions related to Sultan or his work."

Here is the information you can use:
---
${rawData}
---
    `.trim(),
      ],
      ["human", query],
    ]);

    const responseStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk?.content ?? "";
            controller.enqueue(
              encoder.encode(JSON.stringify({ message: text }) + "\n")
            );
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(responseStream, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error during stream:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching the response." },
      { status: 500 }
    );
  }
}
