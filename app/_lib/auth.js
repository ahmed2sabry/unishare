// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";

// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
//   callbacks: {
//     authorized({ auth, request }) {
//       return !!auth?.user;
//     },
//     async signIn({ user, account, profile }) {
//       try {
//         const existGuest = await getGuest(user.email);
//         if (!existGuest)
//           // await registerUser({ email: user.email, fullName: user.name });
//           return true;
//       } catch {
//         return false;
//       }
//     },
//     async session({ session, user }) {
//       //   const guest = await getGuest(session.user.email);
//       session.user.guestId = guest.id;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "auth/login",
//   },
// });
