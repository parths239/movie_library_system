"use server"

import { db } from "@/database/drizzle";
import {eq} from 'drizzle-orm'
import {users} from '@/database/schema'
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import  config  from "../config";

export const signInWithCredentials = async ({ email, password }: Pick<AuthCredentials, 'email' | 'password'>) => {

    const ip = (await headers()).get('x-forwarded-for') || "127.0.0.1"

    const {success} = await ratelimit.limit(ip)

    if(!success)return redirect('/too-fast')

    try {

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })
        
        if(result.error){
            return {
                success: false,
                error: result.error
            }
        }

        return {
            success: true
        }

    } catch (error) {

        console.log({
            success: false,
            error: `Failed to sign in user ${error}`
        })

        return {
            success: false,
            error: `Failed to sign in user ${error}`
        }
        
    }

}

export const signUp = async (params: AuthCredentials) => {

    const {fullName, email, password, universityId, universityCard} = params;

    const ip = (await headers()).get('x-forwarded-for') || "127.0.0.1"

    const {success} = await ratelimit.limit(ip)

    if(!success)return redirect('/too-fast')

    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if(user.length>0){

        return {
            success: false,
            error: 'User already exists'
        }

    }

     const hashedPassword = await hash(password, 10);

     try {

        await db.insert(users).values({
            fullName,
            email,
            password: hashedPassword,
            universityId,
            universityCard
        }).execute();

        await workflowClient.trigger({
            url: `${config.env.prodApiEndpoint}/api/workflow/onboarding`,
            body:{
                email, 
                fullName
            }
        })


        await signInWithCredentials({email, password});

        return {
            success: true
        }


        
     } catch (error) {

        console.log({
            success: false,
            error: `Failed to create user ${error}`
        })

        return {
            success: false,
            error: `Failed to create user ${error}`
        }

        
     }

}
