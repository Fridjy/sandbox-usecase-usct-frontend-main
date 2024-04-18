import { ReactComponent as CheckIcon } from "@assets/icons/check.svg";
import { ReactComponent as X } from "@assets/icons/x.svg";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { colors } from "../../../chakra-overrides/colors";
import { Consent, ConsentStatus } from "../../driver-poc/types";

interface ConsentStatusProps {
  consent: Consent | null;
}

const statusConfig = {
  [ConsentStatus.GRANTED]: {
    icon: CheckIcon,
    title: "Granted",
    color: colors.theme.success,
  },
  [ConsentStatus.NOT_GRANTED]: {
    icon: X,
    title: "Not Granted",
    color: colors.info[600],
  }
}

export function ConsentTag({ consent }: ConsentStatusProps) {
  return (
    <Tag textColor="#FFFFFF" variant='subtle' backgroundColor={statusConfig[consent?consent.status:ConsentStatus.NOT_GRANTED].color}>
      <TagLeftIcon boxSize='12px' as={statusConfig[consent?consent.status:ConsentStatus.NOT_GRANTED].icon} />
      <TagLabel>{statusConfig[consent?consent.status:ConsentStatus.NOT_GRANTED].title}</TagLabel>
    </Tag>
  );
}
