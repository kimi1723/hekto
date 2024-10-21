import Heading from "@/components/shared/Typography/Heading";
import ButtonLink from "@/components/shared/ButtonLink/Index";
import Subtitle from "@/components/shared/Typography/Subtitle";

const EmptyWishlist = () => (
  <div className="relative top-1/2 flex flex-col items-center gap-8">
    <Heading variant="primary">No favorites yet!</Heading>
    <ButtonLink href="/products">
      <Subtitle el="span">View products</Subtitle>
    </ButtonLink>
  </div>
);

export default EmptyWishlist;
