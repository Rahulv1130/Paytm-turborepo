import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import db from "@repo/db"

type User = {
    id: string;
    name: string | null;
    email: string | null;
};

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: {label: "Phone number" , type: "text" , placeholder: "123123123"},
                password: {label: "Password" , type: "password" , placeholder: ".................."}
            },

            async authorize(credentials: any): Promise<User | null> {
                const hashedPassword = await bcrypt.hash(credentials.password,10);
                const existingUser = await db.user.findUnique({
                    where: {
                        number: credentials.phone
                    }
                });

                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password , existingUser.password);
                    if(passwordValidation){
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }

                    return null;
                }

                try{
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });

                    await db.balance.create({
                        data: {
                            userId: user.id,
                            amount: 0,
                            locked: 0
                        }
                    });

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email
                    }
                }catch(e){
                    console.log(e);
                }

                return null;
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({token , session} : any) {
            session.user.id = token.sub;
            return session;
        }
    }
}