import Link from "@/components/shared/inline-link/Index";
import Icon from "@/components/shared/get-svg/Index";

import { envelopeId, phoneCallId } from "@/helpers/constants/icons";

const ContactInfo = () => {
  return (
    <div className="flex gap-12">
      <Link
        href="mailto:mhhasanul@gmail.com"
        className="gap-2.5"
        variant="primaryLight"
      >
        <Icon id={envelopeId} />
        mhhasanul@gmail.com
      </Link>

      <Link href="tel:(12345)67890" className="gap-3" variant="primaryLight">
        <Icon id={phoneCallId} />
        (12345)67890
      </Link>
    </div>
  );
};

export default ContactInfo;
