import ButtonLink from "@/components/shared/ButtonLink/Index";
import Section from "@/components/shared/Section/Index";
import Heading from "@/components/shared/Typography/Heading";

import newsletterBg from "@/public/images/home/newsletter/bg.png";
import Image from "next/image";

const Newsletter = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[457px]">
      <Image src={newsletterBg} alt="" fill className="inset-0 -z-10" />
      <Section className="flex flex-col gap-[60px] items-center my-[112px]">
        <Heading variant="secondary" className="max-w-3xl text-center">
          Get Latest Update By Subscribe 0ur Newsletter
        </Heading>

        <ButtonLink href="/newsletter">Subscribe</ButtonLink>
      </Section>
    </div>
  );
};

export default Newsletter;
