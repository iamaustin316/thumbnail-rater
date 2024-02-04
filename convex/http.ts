import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
    path: "/stripe",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const signature = request.headers.get('stripe-signature') as string;
    })
})

http.route({
    path: "/clerk",
    method: "POST",
    handler: httpAction(async(ctx, request) => {
        const payloadString = await request.text();
        const headPayload = request.headers;
        try {
            const result = await ctx.runAction(internal.clerk.fulfill, {
                payload: payloadString,
                headers: {
                    'svix-id': headPayload.get('svix-id')!,
                    'svix-timestamp': headPayload.get('svix-timestamp')!,
                    'svix-signature': headPayload.get('svix-signature')!,
                }
            })
            switch(result.type) {
                case 'user.created':
                    await ctx.runMutation(internal.users.createUser,{
                        email: result.data.email_addresses[0]?.email_address,
                        userId: result.data.id
                    })
            }
            return new Response(null, {
                status: 200
            })
        } catch(err) {
            return new Response("Webhook Error", {
                status: 400
            })
        }
    })
})

export default http;