import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {headers} from "next/headers"
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
// We are going to look for only two events inside the webhook: 1 is the cancel subscritpion or upgrade
//2 is the subscription for the very first time
export async function POST (req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event;
    try{
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    }
    catch(error: any)
    {
        return new NextResponse(` WebHook ERROR: ${error.message}`, {status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if(event.type === "checkout.session.completed")
    {
        const subscription = stripe.subscriptions.retrieve(
            session.subscription as string
        )

        if(!session?.metadata?.userId)
        {
            return new NextResponse("User Id is required!!", {status: 400});
        }

        await prismadb.userSubscription.create({
            data: {
                userId: session?.metadata?.userId,
                stripeSubscriptionId: (await subscription).id,
                stripeCustomerId: (await subscription).customer as string,
                stripePriceId: (await subscription).items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    (await subscription).current_period_end*1000
                )
            }
        })
    }

    //Another even when user renews their subscription
    if(event.type === "invoice.payment_succeeded")
    {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )
        await prismadb.userSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end*1000
                )
            }

        })
    }
    
    return new NextResponse(null, {status: 200});
}

