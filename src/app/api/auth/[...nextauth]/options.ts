import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


export const options: NextAuthOptions = {
    pages:{
        signIn:"/login",
        signOut:"/login"
    },
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID??"",
            clientSecret:process.env.GOOGLE_CLIENT_SECRET?? "",
            
        }),
        
        CredentialsProvider({
            name:"credentials",
            
            credentials: {},
                // @ts-ignore
            async authorize(credentials) {
                // @ts-ignore
                const {email,password,token,from} = credentials
                
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/login";
                    
                    const fetchUser =await fetch(apiUrl,{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            email,
                            password,
                            token,
                            from})
                    })
                    
                    if (!fetchUser.ok) {
                        const errorResponse = await fetchUser.json();
                        throw new Error(errorResponse.error);
                    }
                    const user = await fetchUser.json()
                    
                    user.authenticationMethod = 'custom'
                    
                    return user
                } catch (error) {
                    
                    throw new Error('Authentication failed '+error);
                }
            }
        
                
        })
    ],
    
    
}