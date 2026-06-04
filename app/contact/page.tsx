import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-16">

          <Image
            src="/iLinq-logo.png"
            alt="iLinq.Team"
            width={200}
            height={200}
            className="mx-auto mb-6"
          />

          <h1 className="text-5xl font-bold mb-4">
            Contact Us
          </h1>

          <p className="text-xl text-gray-400">
            We'd love to hear from you.
          </p>

        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">

          <div className="bg-[#08142f] border border-blue-900 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">📧</div>

            <h3 className="font-bold text-xl mb-2">
              Email
            </h3>

            <p className="text-gray-400">
              iits.solutions.2019@gmail.com
            </p>
          </div>

          <div className="bg-[#08142f] border border-blue-900 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">📍</div>

            <h3 className="font-bold text-xl mb-2">
              Location
            </h3>

            <p className="text-gray-400">
              Sialkot, Punjab, Pakistan
            </p>
          </div>

          <div className="bg-[#08142f] border border-blue-900 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">⏱️</div>

            <h3 className="font-bold text-xl mb-2">
              Response Time
            </h3>

            <p className="text-gray-400">
              Usually within 24-48 hours
            </p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="bg-[#08142f] border border-blue-900 rounded-xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Send Us a Message
          </h2>

          <form className="space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-lg bg-black border border-blue-900"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-lg bg-black border border-blue-900"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full p-4 rounded-lg bg-black border border-blue-900"
            />

            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full p-4 rounded-lg bg-black border border-blue-900"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>
    </main>
  );
}