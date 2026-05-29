"use client";

import { useEffect } from "react";

import { useSession } from "next-auth/react";

export default function ManageSubscriptionPage() {

  const { data: session } =
    useSession();

  useEffect(() => {

    async function openPortal() {

      try {

        const customerId =
          session?.lemonCustomerId;

        if (!customerId) {

          alert(
            "No active subscription found."
          );

          window.location.href =
            "/renew";

          return;

        }

        const response =
          await fetch(
            "/api/customer-portal",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                customerId,

              }),

            }
          );

        const data =
          await response.json();

        if (data.url) {

          window.location.href =
            data.url;

        } else {

          alert(
            "Customer portal unavailable."
          );

        }

      } catch (error) {

        console.log(error);

        alert(
          "Something went wrong."
        );

      }

    }

    if (session) {

      openPortal();

    }

  }, [session]);

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">

      <div className="bg-[#081028] border border-white/10 rounded-3xl p-10 max-w-lg w-full text-center">

        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-8"></div>

        <h1 className="text-3xl font-bold mb-4">

          Opening Billing Portal

        </h1>

        <p className="text-gray-400 text-lg">

          Please wait while we securely connect your subscription.

        </p>

      </div>

    </main>

  );

}