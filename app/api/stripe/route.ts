import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { subscribe } from "diagnostics_channel";

const settingsUrl = absoluteUrl("/settings");

export async function GET () {
    try{
        const {userId} = auth();
        const user = await currentUser();

        if(!user || !userId)
        {
            return new NextResponse("Unauthorized!", {status: 401});
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        })

        if(userSubscription && userSubscription.stripeCustomerId)
        {
            //We want to redierect the user to the billing page so that he can cancel his subscription
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl
            })
            
            return new NextResponse(JSON.stringify({url: stripeSession.url}));
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            //This below is our product desc and price
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data:{
                            name: "Sheldon Pro",
                            description: "Unlimited AI Generations",
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1,
                }
            ],
            //After user checksout then a web hook is generated which reads the metadata and knows
            //ki ok this user has taken the subscription
            //The web hook is written in api folder
            metadata: {
                userId,
            }
        })
        return new NextResponse(JSON.stringify({url: stripeSession.url}))
    }
    catch(error)
    {
        console.log("[STRIPE_ERROR] ", error);
        return new NextResponse("Internal error! ", {status: 500})
        
    }
}