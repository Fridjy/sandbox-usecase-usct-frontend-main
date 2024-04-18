import { VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { ReactComponent as ConsentIcon } from "../../assets/icons/consent.svg";
import { ReactComponent as DigitalRegistriesIcon } from "../../assets/icons/digital-registries.svg";
import { ReactComponent as InformationMediatorIcon } from "../../assets/icons/information-mediator.svg";
import { ReactComponent as MessagingIcon } from "../../assets/icons/messaging.svg";
import { ReactComponent as PassportIcon } from "../../assets/icons/passport.svg";
import { ReactComponent as PaymentIcon } from "../../assets/icons/payments.svg";
import { ReactComponent as RegistrationIcon } from "../../assets/icons/registration.svg";
import { ReactComponent as SchedulingIcon } from "../../assets/icons/scheduling.svg";
import { ReactComponent as WorkflowIcon } from "../../assets/icons/workflow.svg";
import { ContextualHelpContext } from "../../routes/usct/ContextualHelpContext";
import { ActiveBuildingBlockContext } from "../../routes/usct/USCT";
import { BUILDING_BLOCK } from "../../routes/usct/utils";
import BuildingBlock from "./BuildingBlock";

export const buildingBlocksList = [
  { label: "Consent", icon: <ConsentIcon />, id: BUILDING_BLOCK.CONSENT },
  {
    label: "Identity",
    icon: <PassportIcon />,
    id: BUILDING_BLOCK.IDENTITY,
  },
  {
    label: "Information Mediator",
    icon: <InformationMediatorIcon />,
    id: BUILDING_BLOCK.INFORMATION_MEDIATOR,
  },
  {
    label: "Digital Registries",
    icon: <DigitalRegistriesIcon />,
    id: BUILDING_BLOCK.DIGITAL_REGISTRIES,
  },
  { label: "Messaging", icon: <MessagingIcon />, id: BUILDING_BLOCK.MESSAGING },
  { label: "Payment", icon: <PaymentIcon />, id: BUILDING_BLOCK.PAYMENT },
  {
    label: "Registration",
    icon: <RegistrationIcon />,
    id: BUILDING_BLOCK.REGISTRATION,
  },
  {
    label: "Scheduling",
    icon: <SchedulingIcon />,
    id: BUILDING_BLOCK.SCHEDULING,
  },
  { label: "Workflow", icon: <WorkflowIcon />, id: BUILDING_BLOCK.WORKFLOW },
];

export default function BuildingBlockActivity() {
  const { activeLetter, activeContent } = useContext(ContextualHelpContext);
  const { activeBuildingBlocks } = useContext(ActiveBuildingBlockContext);
  const firstActiveIndex = buildingBlocksList.findIndex(
    (bb) =>
      activeContent?.activeBuildingBlocks.find(
        (activeBuildingBlock) => activeBuildingBlock === bb.id,
      ),
  );
  return (
    <VStack mb="1rem">
      {buildingBlocksList.map((buildingBlock, index) => (
        <BuildingBlock
          active={activeLetter ? false : activeBuildingBlocks[buildingBlock.id]}
          highlighted={
            !!activeContent?.activeBuildingBlocks.find(
              (bb) => bb === buildingBlock.id,
            )
          }
          tail={firstActiveIndex >= 0 && index >= firstActiveIndex}
          label={buildingBlock.label}
          icon={buildingBlock.icon}
          key={buildingBlock.id}
          id={buildingBlock.id}
        />
      ))}
    </VStack>
  );
}
