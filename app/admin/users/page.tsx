"use client";

import {
  useEffect,
  useState,
} from "react";

export default function UsersPage() {

  const [users,
    setUsers] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  async function loadUsers() {

    try {

      const response =
        await fetch(
          "/api/admin/users"
        );

      const data =
        await response.json();

      if (data.success) {

        setUsers(
          data.users
        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadUsers();

  }, []);

  return (

    <div>

      <div className="mb-10">

        <h1 className="text-5xl font-bold mb-4">

          Users Management

        </h1>

        <p className="text-gray-400 text-xl">

          Centralized platform user management.

        </p>

      </div>

      {loading ? (

        <div className="text-gray-400">

          Loading users...

        </div>

      ) : (

        <div className="space-y-5">

          {users.length ? (

            users.map((user) => {

              const activeCard =
                user.nfcCards?.[0];

              return (

                <div
                  key={user.id}
                  className="bg-[#081028] border border-white/10 rounded-3xl p-6"
                >

                  <div className="grid md:grid-cols-5 gap-6">

                    <div>

                      <p className="text-gray-500 text-sm mb-2">

                        Name

                      </p>

                      <a
                        href={`/admin/users/${user.id}`}
                        className="text-xl font-bold hover:text-blue-400 transition"
                      >

                        {user.name || "Unknown"}

                      </a>

                    </div>

                    <div>

                      <p className="text-gray-500 text-sm mb-2">

                        Email

                      </p>

                      <p>
                        {user.email}
                      </p>

                      <p className="text-xs text-yellow-400">
                         ID: {user.id}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500 text-sm mb-2">

                        Plan

                      </p>

                      <p>

                        {activeCard?.plan || "FREE"}

                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500 text-sm mb-2">

                        Status

                      </p>

                      <p
                        className={
                          activeCard?.status === "ACTIVE"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >

                        {activeCard?.status || "INACTIVE"}

                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500 text-sm mb-2">

                        NFC Cards

                      </p>

                      <p>

                        {user.nfcCards?.length || 0}

                      </p>

                    </div>

                  </div>

                </div>

              );

            })

          ) : (

            <div className="text-gray-400">

              No users found.

            </div>

          )}

        </div>

      )}

    </div>

  );

}