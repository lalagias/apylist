import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does APY List source and verify its data?",
    answer:
      "We aggregate data from trusted platforms like DeFiLlama and cross-reference it to ensure accuracy. Our team continuously monitors data integrity.",
  },
  {
    question: "What makes APY List different from other yield aggregators?",
    answer:
      "Our platform offers advanced filtering options, AI-driven risk analysis, APY predictions, and in-depth project insights that go beyond basic data aggregation.",
  },
  {
    question: "Can I customize alerts for specific APY changes or risk levels?",
    answer:
      "Yes, as a premium user, you can set up custom alerts for APY thresholds, risk score changes, or project updates to stay ahead in your investments.",
  },
  {
    question: "How reliable are the APY predictions and risk assessments?",
    answer:
      "Our predictions use AI models that analyze historical data, market trends, and project performance. While they provide valuable insights, they should be used alongside your research.",
  },
  {
    question: "What are the benefits of the data export feature?",
    answer:
      "Our export feature allows you to download filtered data in CSV or JSON formats for in-depth analysis using your preferred financial tools or software.",
  },
  {
    question: "How frequently is data updated on APY List?",
    answer:
      "We update our data multiple times daily to ensure that you have access to the most current information available in the market.",
  },
  {
    question: "What kind of historical data can I access?",
    answer:
      "You can view historical APY trends, TVL changes, and project performance metrics over different time frames, such as 7-day, 30-day, and inception-to-date periods.",
  },
  {
    question: "Are there any limitations for free users?",
    answer:
      "Free users have access to basic project cards and limited information. Advanced filtering, detailed analytics, risk scores, and data export are exclusive to premium users.",
  },
  {
    question: "What happens if a project I'm tracking changes significantly?",
    answer:
      "Our platform will update its metrics in real time. Premium users can set alerts to be notified of significant changes, such as large TVL fluctuations or APY adjustments.",
  },
  {
    question: "How can I leverage APY List to manage impermanent loss risk?",
    answer:
      "Our risk assessment tools highlight pools with potential impermanent loss, helping you make informed decisions based on asset exposure and historical volatility.",
  },
  {
    question: "Does APY List support multi-chain analysis?",
    answer:
      "Yes, our platform aggregates data from multiple blockchains, allowing you to analyze and compare opportunities across ecosystems like Ethereum, Solana, and more.",
  },
  {
    question: "Can I integrate APY List data with my own analytics platform?",
    answer:
      "Currently, data export is the best way to integrate our data into your own analytics environment. We plan to explore API access for premium users in the future.",
  },
  {
    question: "How does the platform handle projects with high volatility?",
    answer:
      "We flag projects with high volatility and provide a confidence score based on our risk assessment models, so you can weigh potential rewards against the risks.",
  },
  {
    question: "What’s included in the Lifetime Access plan?",
    answer:
      "Lifetime Access provides unlimited use of all premium features, including future updates and new functionalities, without recurring fees.",
  },
  {
    question:
      "Do you have an educational section for understanding yield strategies?",
    answer:
      "Our blog offers research articles, advanced yield farming strategies, and market analysis to help you optimize your investments.",
  },
  {
    question: "How do I know if a staking provider is trustworthy?",
    answer:
      "APY List includes TVL and project reputation metrics, but we recommend doing additional due diligence on any provider before committing funds.",
  },
  {
    question: "Can I compare multiple opportunities side-by-side?",
    answer:
      "Yes, our premium feature allows you to select multiple yield opportunities and compare them on key metrics such as APY, risk level, and historical performance.",
  },
  {
    question: "Is there a way to track changes in a project’s APY over time?",
    answer:
      "Our historical data graphs provide a visual representation of APY changes over 7-day, 30-day, and other customizable periods.",
  },
  {
    question: "How does APY List ensure data security?",
    answer:
      "We use secure protocols for data transmission and do not store sensitive user data. Any data export or API use is done with user consent and encrypted pathways.",
  },
  {
    question: "What is the refund policy for premium subscriptions?",
    answer:
      "We offer a refund within the first 7 days if you’re not satisfied with the premium features. Please contact support for assistance.",
  },
  {
    question:
      "Will I lose access to my saved filters if I downgrade my subscription?",
    answer:
      "Yes, saved filters and alerts are part of the premium plan. If you downgrade, you will lose access to these features, but your data will be saved if you choose to re-upgrade.",
  },
  {
    question: "Can I share my account with others?",
    answer:
      "No, sharing accounts is against our terms of service. We encourage each user to maintain a separate account for personalized features and data security.",
  },
  {
    question: "What kind of support do premium users receive?",
    answer:
      "Premium users get priority support, including faster response times and access to our team for troubleshooting or questions about the platform.",
  },
  {
    question: "Do you plan to add more chains and projects in the future?",
    answer:
      "Yes, we continuously expand our platform to include more blockchains and projects as the DeFi ecosystem grows. Stay tuned for updates!",
  },
];

export default function FAQ() {
  return (
    <section
      className="min-h-screen flex flex-col gap-8 items-center justify-center p-10 max-w-7xl mx-auto"
      id="faq"
    >
      <h3 className="text-6xl font-bold text-center">
        Frequently Asked Questions (FAQ)
      </h3>
      <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
