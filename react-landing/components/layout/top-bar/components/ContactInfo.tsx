import Link from "@/components/shared/inline-link/Index";
import Icon from "@/components/shared/get-svg/Index";

import { envelopeId, phoneCallId } from "@/helpers/constants/icons";

const email = "mhhasanul@gmail.com";
const tel = "(12345)67890";

const ContactInfo = () => {
  return (
    <div className="flex gap-12">
      <Link href={`mailto:${email}`} className="gap-2.5" variant="primaryLight">
        <Icon id={envelopeId} />
        {email}
      </Link>

      <Link href={`tel:${tel}`} className="gap-3" variant="primaryLight">
        <Icon id={phoneCallId} />
        {tel}
      </Link>
    </div>
  );
};

export default ContactInfo;
