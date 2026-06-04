import Image from "next/image";
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            About iLinq.Team
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A next-generation digital networking platform powered by
            NFC and QR technology.
          </p>
        </div>

        {/* What is iLinq */}
        <div className="mb-8 flex justify-center">
        <Image
          src="/iLinq-Logo.png"
          alt="iLinq.Team"
          width={480}
          height={480}
        />
      </div>
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">
            What is iLinq.Team?
          </h2>

          <p className="text-gray-300 leading-8">
            iLinq.Team is a modern digital business card and
            professional networking platform that enables
            professionals, entrepreneurs, freelancers and businesses
            to instantly share their information using NFC and QR
            technology.
            Modern digital business card platform
            Instant sharing with NFC
            Professional QR profiles
            Lead generation and analytics
            Environmentally friendly networking
          </p>
        </section>

{/* Mission & Vision */}
<section className="mt-16 mb-16">
  <div className="grid md:grid-cols-2 gap-8">

    {/* Mission */}
    <div className="bg-[#08142f] border border-blue-900 rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-4 text-blue-400">
        Our Mission
      </h2>

      <p className="text-gray-300 leading-8">
        To empower professionals and businesses with intelligent,
        environmentally friendly networking solutions that make
        connections faster, smarter, and more meaningful.
      </p>
    </div>

    {/* Vision */}
    <div className="bg-[#08142f] border border-blue-900 rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-4 text-blue-400">
        Our Vision
      </h2>

      <p className="text-gray-300 leading-8">
        To become a globally trusted digital identity and networking
        platform that transforms how people exchange information,
        generate opportunities, and build professional relationships.
      </p>
    </div>

  </div>
</section>

        {/* Mission */}
        

        {/* Vision */}
        

        {/* NFC */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">
            {/* Why NFC + QR */}
<section className="mb-20">
  <h2 className="text-3xl font-bold mb-8 text-center">
    Why NFC + QR Business Cards?
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="bg-[#08142f] border border-blue-900 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-3">
        ⚡ Instant Sharing
      </h3>
      <p className="text-gray-300">
        Share your profile instantly with a simple tap or QR scan.
      </p>
    </div>

    <div className="bg-[#08142f] border border-blue-900 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-3">
        🔄 Always Up To Date
      </h3>
      <p className="text-gray-300">
        Update your profile once and everyone always sees the latest information.
      </p>
    </div>

    <div className="bg-[#08142f] border border-blue-900 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-3">
        📊 Analytics & Insights
      </h3>
      <p className="text-gray-300">
        Track profile views, NFC taps, QR scans and lead activity.
      </p>
    </div>

    <div className="bg-[#08142f] border border-blue-900 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-3">
        🎯 Lead Generation
      </h3>
      <p className="text-gray-300">
        Convert profile visitors into valuable business leads.
      </p>
    </div>

    <div className="bg-[#08142f] border border-blue-900 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-3">
        🎨 Professional Branding
      </h3>
      <p className="text-gray-300">
        Present a consistent and professional digital identity.
      </p>
    </div>

    <div className="bg-[#08142f] border border-blue-900 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-3">
        🌱 Eco Friendly
      </h3>
      <p className="text-gray-300">
        Reduce paper waste and support sustainable business practices.
      </p>
    </div>

  </div>
</section>
          </h2>

          
        </section>

        {/* Beta */}
        <section className="mb-16">
          <div className="bg-blue-950 border border-blue-700 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-4">
              Public Beta Notice
            </h2>

            <p className="text-gray-300 leading-8">
              iLinq.Team is currently operating in a Public Beta phase.
              Features, subscription plans and integrations may be
              modified, interrupted or removed while development and
              testing continue.
            </p>
          </div>
        </section>

        {/* Company */}
        <section className="mb-16">
          <Image
          src="/iits-logo.png"
          alt="Imran IT Solutions"
          width={100}
          height={100}
          className="mb-6 rounded-full"
          />
          

          <p className="text-gray-300 leading-8">
            iLinq.Team is a product of Imran IT Solutions (IITS),
            a software development company based in Sialkot,
            Punjab, Pakistan.
          </p>

          <p className="text-gray-300 leading-8 mt-4">
            Established in 2019, IITS specializes in ERP systems,
            POS solutions, custom software development, web
            applications and business automation platforms.
          </p>
        </section>

        {/* Founder */}
        {/* Founder & Leadership */}
<section className="mb-20">
  <h2 className="text-3xl font-bold mb-8 text-center">
    Founder & Leadership
  </h2>

  <div className="bg-[#08142f] border border-blue-900 rounded-xl p-8">

    <div className="text-center">

      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-900 flex items-center justify-center text-4xl">
        
      </div>

      <h3 className="text-2xl font-bold">
        Imran Akram & Haider Imran Akram
      </h3>

      <p className="text-blue-400 mt-2">
        Founder & Managing Director
      </p>

      <p className="text-gray-300 mt-6 leading-8 max-w-3xl mx-auto">
        Founder of Imran IT Solutions (IITS) and creator of
        iLinq.Team. With extensive experience in software
        development, business automation, ERP systems,
        POS solutions and enterprise applications, he is
        committed to building innovative technologies that
        help businesses grow and connect more effectively.
      </p>

      <div className="mt-8 border-t border-blue-900 pt-6">
        <p className="italic text-gray-400">
          "Technology should simplify human connections,
          not complicate them."
        </p>
      </div>

    </div>

  </div>
</section>

      </div>
    </main>
  );
}