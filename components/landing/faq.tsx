import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is APY?",
    answer:
      "APY stands for Annual Percentage Yield. It's the real rate of return earned on a savings deposit or investment taking into account the effect of compounding interest.",
  },
  {
    question: "How does APY List find the best rates?",
    answer:
      "Our AI-powered system continuously scans trusted financial platforms and institutions to find and update the most competitive APY rates in real-time.",
  },
  {
    question: "Is APY List free to use?",
    answer:
      "Yes, our basic service is free. We also offer premium features for users who want more advanced filtering and alert options.",
  },
  {
    question: "How often are the APY rates updated?",
    answer:
      "Our system updates rates in real-time as soon as new information becomes available from our sources.",
  },
];

export default function FAQ() {
  return (
    <section className="h-screen flex flex-col gap-8 items-center justify-center p-10 max-w-7xl mx-auto">
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
