'use client'
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  })

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.googleClientId,
      clientSecret: process.env.googleClientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.settings.readonly"
        }
      },
      authorizationUrl: GOOGLE_AUTHORIZATION_URL,
      accessTokenUrl: 'https://oauth2.googleapis.com/token'
    })
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'google') {
        if (!user.email.endsWith('ilbcedu.com')) {
        //if(profile.email_verified && profile.email.endsWith("@ilbcedu.com")){
          console.log("you are not allowed to proceed")
          return false;
        } else {
          const data = {
            name: user.name,
            email: user.email,
            google_id: account.providerAccountId,
            avatar: user.image,
            access_token: account.access_token,
            refresh_token: account.refresh_token
          };
          try {
            const response = await fetch("https://edtech.ilbc.edu.mm/api/google/login", {
              method: "POST", // or 'PUT'
              //mode: 'cors',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data),
            });
            const result = await response.json();
            // console.log("server returned teacher token", result);
            if (result) {
              user.customToken = result?.token;
              user.userId = result?.data?.id
              user.access_token = result?.data?.access_token
              user.refreshTokenn = result?.data?.refresh_token
            }
            return true;
          } catch (error) {
            console.error("Error:", error);
          }
          //return user;
        }
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: false,
    async jwt({ token, user, account }) {
      //console.log("token=>", token, "user=>", user, "account=>", account);
      if (user) {
        token.customToken = user.customToken
        token.userId = user.userId
        token.access_token = user.access_token
        token.accessTokenExpires = Date.now() + account.expires_at * 1000;
      }
      if (account) {
        token.refreshTokenn = account.refresh_token
      }
      if (Date.now() < token.accessTokenExpires) {
        return token;
      } else {
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.googleClientId,
              client_secret: process.env.googleClientSecret,
              grant_type: "refresh_token",
              refresh_token: token.refreshTokenn,
            }),
            method: "POST",
          })

          const tokens = await response.json()
          if (!response.ok) throw tokens
          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refreshTokenn,
          }
        } catch (error) {
          console.error("Error refreshing access token", error)
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" }
        }
      }
    },
    async session({ session, token, user }) {
      //https://github.com/nextauthjs/next-auth/discussions/1290
      // the token object is what returned from the `jwt` callback, it has the `accessToken` that we assigned before
      // Assign the accessToken to the `session` object, so it will be available on our app through `useSession` hooks
      //console.log("session=>", session, token)
      if (token) {
        session.accessToken = token.access_token
        session.refreshToken = token.refreshTokenn
        session.customToken = token.customToken
        session.userId = token.userId
      }
      return session
    }
  }
}
export default NextAuth(authOptions)