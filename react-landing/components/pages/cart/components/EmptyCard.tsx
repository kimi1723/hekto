import Image from "next/image";

import Section from "@/components/shared/Section/Index";
import Heading from "@/components/shared/Typography/Heading";
import ButtonLink from "@/components/shared/ButtonLink/Index";

import emptyCart from "@/assets/cart/empty-cart.png";

const EmptyCart = () => (
  <Section className="flex flex-col items-center gap-8 my-20" el="div">
    <Image src={emptyCart} alt="" height={286.5} width={387} />
    <Heading variant="tertiary" el="h1">
      Your cart is empty
    </Heading>
    <ButtonLink href="/products">Start Shopping</ButtonLink>
  </Section>
);

export default EmptyCart;
