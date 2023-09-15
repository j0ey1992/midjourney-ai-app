import { NextRequest, NextResponse } from "next/server"
import MyMidjourneyClient from "./client"

const client = MyMidjourneyClient()

async function handle(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  console.log("[Midjourney Route] params ", params)

  // TODO: Add authentication to protect the endpoint
  //   const authResult = auth(req);
  //   if (authResult.error) {
  //     return NextResponse.json(authResult, {
  //       status: 401,
  //     });
  //   }

  console.log(req)

  const command = `${req.nextUrl.pathname}${req.nextUrl.search}`.replaceAll(
    "/api/mymidjourney/",
    "/api/v1/midjourney/"
  )

  console.log(`[MyMidjourney Route] command ${command}`)

  try {
    const response = await client.post(command, req.body)
    return NextResponse.json({ data: response.data })
  } catch (error) {
    const traceId = crypto.randomUUID()
    console.error(
      `traceId: ${traceId}, data: ${JSON.stringify(req.body, null, 2)}`,
      error
    )
    throw new Error(`createImagine failed, traceId: ${traceId}`)
  }
}

export const GET = handle
export const POST = handle
