import React from "react";

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>

      <div className="space-y-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By accessing and using Apylist, you agree to be bound by these Terms
            of Service. If you do not agree to these terms, please do not use
            the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            2. Description of Service
          </h2>
          <p className="text-gray-700">
            Apylist is a web application that provides list management and
            organization services. The service may be modified, updated, or
            changed at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            3. User Responsibilities
          </h2>
          <p className="text-gray-700">
            You are responsible for maintaining the confidentiality of your
            account information and for all activities that occur under your
            account. You agree to notify us immediately of any unauthorized use
            of your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Privacy Policy</h2>
          <p className="text-gray-700">
            Your use of Apylist is also governed by our Privacy Policy. Please
            review our Privacy Policy to understand our practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            5. Intellectual Property
          </h2>
          <p className="text-gray-700">
            All content, features, and functionality of Apylist, including but
            not limited to text, graphics, logos, and software, are owned by
            Apylist and are protected by intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Termination</h2>
          <p className="text-gray-700">
            We reserve the right to terminate or suspend your account and access
            to Apylist at our sole discretion, without notice, for conduct that
            we believe violates these Terms of Service or is harmful to other
            users, us, or third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify these terms at any time. We will
            notify users of any material changes by posting the new Terms of
            Service on this page.
          </p>
        </section>
      </div>

      <footer className="text-sm text-gray-600 text-center">
        Last Updated: {new Date().toLocaleDateString()}
      </footer>
    </div>
  );
}
