import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNT } from "@/constants";
import { UserApiLimit } from "@prisma/client";

export const increaseApiLimit = async () => {
    const {userId} = auth();

    if(!userId)
    {
        return;
    }
    //CHECKING IF USER API LIMIT FOR THE LOGGED IN USER ALREADY EXISTS.
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId,
        }
    });

    //IF IT EXISTS:
    if(userApiLimit)
    {
        await prismadb.userApiLimit.update({
            where: {
                userId: userId
            },
            data: {
                count: userApiLimit.count + 1
            }
        });
    }
    //IF NOT THEN CREATE A NEW DOCUMENT
    else
    {
        await prismadb.userApiLimit.create({
            data: { userId: userId, count: 1}
        });
    }
};

//CREATING ANOTHER UTIL TO CHECK WETHER CURRENT USER HAS REACHED THE LIMIT OF HIS FREE LIMIT
export const checkApiLimit = async ()=> {
    const {userId} = auth();
    //IF NO USER ID MEANS NO LOGGED IN USER SO RETURN
    if(!userId)
    {
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId,
        }
    });

    //NOW IF THE CURRENT USER DOES NOT HAVE A PI LIMIT WHICH MEANS HE IS A NEW USER OR ELSE HE HASN'T REACHED THE MAX API REQ COUNT THEN
    //LET HIM ACCESS OUR APP ELSE BLOCK HIM/HER

    if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNT)
    {
        return true;
    }
    else
    {
        return false;
    }

    
};

export const getApiLimitCount = async ()=> {
    const {userId} = auth();
    //IF NO USER ID MEANS NO LOGGED IN USER SO RETURN
    if(!userId)
    {
        return 0;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId,
        }
    });

    //NOW IF THE CURRENT USER DOES NOT HAVE A PI LIMIT WHICH MEANS HE IS A NEW USER OR ELSE HE HASN'T REACHED THE MAX API REQ COUNT THEN
    //LET HIM ACCESS OUR APP ELSE BLOCK HIM/HER

    if(!userApiLimit)
    {
        return 0;
    }
    return userApiLimit.count;

    
};