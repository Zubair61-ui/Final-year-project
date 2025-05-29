export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert">
        <h2>1. Information We Collect</h2>
        <p>We collect information that you provide directly to us, including:</p>
        <ul>
          <li>Account information</li>
          <li>Course content and materials</li>
          <li>Usage information</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and maintain our services</li>
          <li>Improve and personalize your experience</li>
          <li>Communicate with you</li>
        </ul>

        {/* Add more sections as needed */}
      </div>
    </div>
  );
}