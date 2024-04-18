import { ReactComponent as AC_AC_CIDiagram } from "@assets/diagrams/AC_AC_CI.svg";
import { ReactComponent as AuthorisationDiagram } from "@assets/diagrams/AUTHORISATION.svg";
import { ReactComponent as EligibilityDiagram } from "@assets/diagrams/ELIGIBILITY.svg";
import { ReactComponent as MessagingDiagram } from "@assets/diagrams/MESSAGING.svg";
import { ReactComponent as PaymentHistoryDiagram } from "@assets/diagrams/PAYMENT_HISTORY.svg";
import { ReactComponent as PaymentMethodDiagram } from "@assets/diagrams/PAYMENT_METHOD.svg";
import { ReactComponent as PersonalInfoApplicantDiagram } from "@assets/diagrams/PERSONAL_INFO_APPLICANT.svg";
import { ReactComponent as PersonalInfoServantDiagram } from "@assets/diagrams/PERSONAL_INFO_SERVANT.svg";
import { ReactComponent as PersonalInfoValidationDiagram } from "@assets/diagrams/PERSONAL_INFO_VALIDATION.svg";
import { ReactComponent as ProgramInfoDiagram } from "@assets/diagrams/PROGRAM_INFORMATION.svg";
import { ReactComponent as ProgramRelatedInfoApplicantDiagram } from "@assets/diagrams/PROGRAM_RELATED_INFO_APPLICANT.svg";
import { ReactComponent as ProgramRelatedInfoServantDiagram } from "@assets/diagrams/PROGRAM_RELATED_INFO_SERVANT.svg";
import { ReactComponent as RequestingInfoDiagram } from "@assets/diagrams/REQUESTING_INFO.svg";
import { ReactComponent as ServiceAuthorisationDiagram } from "@assets/diagrams/SERVICE_AUTHORISATION.svg";
import { BUILDING_BLOCK } from "./utils";

export enum EUserType {
  CITIZEN_SERVANT = "CITIZEN_SERVANT",
  CITIZEN = "CITIZEN",
}

export enum ContextualTitle {
  REQUESTING_INFO = "Requesting Info",
  PERSONAL_INFO = "Personal Info",
  PROGRAM_RELATED_INFORMATION = "Program Related Info",
  ASSIGNED_CANDIDATES = "Assigned Candidates",
  CANDIDATE_LIST = "Candidate List",
  ASSIGNED_CASES = "Assigned Cases",
  CASE_INFORMATION = "Case Information",
  PROGRAM_INFORMATION = "Program Information",
  BANK_INFO = "Bank Info",
  REQUEST_ASSIGN_CANDIDATES = "Request Assign Candidates",
  SCHEDULING_AND_REGISTRATION = "Scheduling and Registration",
  MESSAGING = "Messaging",
  FEEDBACK = "Feedback",
  CONVERSATIONS = "Conversations",
  LOG_IN = "Log In",
  ELIGIBILITY_STATUS = "Eligibility Status",
  VALIDATING_INFO = "Validating Info",
  CHOOSING_PAYMENT_METHOD = "Choosing Payment Method",
  PAYMENT_HISTORY = "Payment History",
  CASE_LIST = "Case List",
}

type ContextualContentValue<T> =
  | T
  | { [EUserType.CITIZEN]: T; [EUserType.CITIZEN_SERVANT]: T };

type TDiagramSvg = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

interface IContextualContent {
  title: string;
  diagram: ContextualContentValue<TDiagramSvg>;
  activeBuildingBlocks: ContextualContentValue<BUILDING_BLOCK[]>;
  bulletpoints: ContextualContentValue<string[]>;
}

export interface INormalizedContextualContent {
  title: string;
  diagram: TDiagramSvg;
  activeBuildingBlocks: BUILDING_BLOCK[];
  bulletpoints: string[];
}

export const ContextualHelpContent: Record<
  ContextualTitle,
  IContextualContent
> = {
  [ContextualTitle.REQUESTING_INFO]: {
    title: "Requesting Info",
    diagram: RequestingInfoDiagram,
    activeBuildingBlocks: [
      BUILDING_BLOCK.DIGITAL_REGISTRIES,
      BUILDING_BLOCK.WORKFLOW,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
    ],
    bulletpoints: [
      "The Workflow Building Block coordinates that flow of information between Building Blocks such as Digital Registries to determine eligibility status.",
      "Additionally, the information Mediator Building Block ensure secure communication between the Building Blocks and services.",
    ],
  },
  [ContextualTitle.PERSONAL_INFO]: {
    title: "Personal Info",
    diagram: {
      [EUserType.CITIZEN]: PersonalInfoApplicantDiagram,
      [EUserType.CITIZEN_SERVANT]: PersonalInfoServantDiagram,
    },
    activeBuildingBlocks: [
      BUILDING_BLOCK.DIGITAL_REGISTRIES,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
      BUILDING_BLOCK.WORKFLOW,
    ],
    bulletpoints: [
      "The Workflow Building Block collaborates with multiple Digital Registries Building Blocks to retrieve essential applicant information from different databases. While the information Mediator can be used to manage the flow of information between different systems. The information is securely displayed, using the Building Blocks.",
    ],
  },
  [ContextualTitle.PROGRAM_RELATED_INFORMATION]: {
    title: "Program Related Info",
    diagram: {
      [EUserType.CITIZEN]: ProgramRelatedInfoApplicantDiagram,
      [EUserType.CITIZEN_SERVANT]: ProgramRelatedInfoServantDiagram,
    },
    activeBuildingBlocks: {
      [EUserType.CITIZEN]: [
        BUILDING_BLOCK.DIGITAL_REGISTRIES,
        BUILDING_BLOCK.INFORMATION_MEDIATOR,
      ],
      [EUserType.CITIZEN_SERVANT]: [BUILDING_BLOCK.DIGITAL_REGISTRIES],
    },
    bulletpoints: {
      [EUserType.CITIZEN]: [
        "The Digital Registries Building Block retrives information about a candidate that is stored in an internal database.",
        "The Information Mediator Building Block securely facilitates communication between Building Blocks within different databases.",
      ],
      [EUserType.CITIZEN_SERVANT]: [
        "The Digital Registries Building Block retrives information about a program for the applicant that is stored in an internal database.",
        "The Information Mediator Building Block securely facilitates communication between Building Blocks within different databases.",
      ],
    },
  },
  [ContextualTitle.ASSIGNED_CANDIDATES]: {
    title: "Assigned Candidates",
    diagram: AC_AC_CIDiagram,
    activeBuildingBlocks: [BUILDING_BLOCK.DIGITAL_REGISTRIES],
    bulletpoints: [
      "The Digital Registries building block sends the data about the case and person which can then be displayed in the application.”",
    ],
  },
  [ContextualTitle.CANDIDATE_LIST]: {
    title: "Candidate List",
    diagram: AC_AC_CIDiagram,
    activeBuildingBlocks: [BUILDING_BLOCK.DIGITAL_REGISTRIES],
    bulletpoints: [
      "The Digital Registries Building Block send the data about that case/person that can then be displayed in the application",
    ],
  },
  [ContextualTitle.CASE_LIST]: {
    title: "Case List",
    diagram: ProgramRelatedInfoServantDiagram,
    activeBuildingBlocks: [BUILDING_BLOCK.DIGITAL_REGISTRIES],
    bulletpoints: [
      "The Digital Registries Building Block send the data about that case/person that can then be displayed in the application",
    ],
  },
  [ContextualTitle.ASSIGNED_CASES]: {
    title: "Assigned Cases",
    diagram: AC_AC_CIDiagram,
    activeBuildingBlocks: [BUILDING_BLOCK.DIGITAL_REGISTRIES],
    bulletpoints: [
      "The Digital Registries Building Block send the data about that case/person that can then be displayed in the application",
    ],
  },
  [ContextualTitle.CASE_INFORMATION]: {
    title: "Case Information",
    diagram: AC_AC_CIDiagram,
    activeBuildingBlocks: [BUILDING_BLOCK.DIGITAL_REGISTRIES],
    bulletpoints: [
      "The Digital Registries Building Block send the data about that case/person that can then be displayed in the application",
    ],
  },
  [ContextualTitle.PROGRAM_INFORMATION]: {
    title: "Program Information",
    diagram: ProgramInfoDiagram,
    activeBuildingBlocks: [
      BUILDING_BLOCK.DIGITAL_REGISTRIES,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
      BUILDING_BLOCK.WORKFLOW,
    ],
    bulletpoints: [
      "Multiple Digital Registries Building Blocks can be used for retrieving information  such as program list, eligibility and package information.",
      "If there is any information coming from external databases, the Information Mediator and Workflow Building Block will coordinate the various calls to different services and assembling the data into a format that the application can present to the user.",
    ],
  },
  [ContextualTitle.BANK_INFO]: {
    title: "Bank Info",
    diagram: {
      [EUserType.CITIZEN]: ServiceAuthorisationDiagram,
      [EUserType.CITIZEN_SERVANT]: ServiceAuthorisationDiagram,
    },
    activeBuildingBlocks: [
      BUILDING_BLOCK.PAYMENT,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
      BUILDING_BLOCK.WORKFLOW,
    ],
    bulletpoints: [
      "The Payment Building Block is used to retrieve bank account details for payment purposes.",
      "The Information Mediator Building Block and Workflow Building Block collaborate to ensure secure communication.",
    ],
  },
  [ContextualTitle.REQUEST_ASSIGN_CANDIDATES]: {
    title: "Request Assign Candidates",
    diagram: {
      [EUserType.CITIZEN]: PersonalInfoServantDiagram,
      [EUserType.CITIZEN_SERVANT]: PersonalInfoServantDiagram,
    },
    activeBuildingBlocks: [
      BUILDING_BLOCK.DIGITAL_REGISTRIES,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
      BUILDING_BLOCK.WORKFLOW,
    ],
    bulletpoints: [
      "The Workflow Building Block helps identify the information needed to determine the eligibility status, and communicates with Digital Registries Building Blocks to obtain the necessary information.",
      "The Information Mediator Building Block ensure secure communication between the Building Blocks and services. While Ulson request to assign the candidates.",
    ],
  },
  [ContextualTitle.SCHEDULING_AND_REGISTRATION]: {
    title: "Scheduling and Registration",
    diagram: PersonalInfoServantDiagram,
    activeBuildingBlocks: [
      BUILDING_BLOCK.PAYMENT,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
      BUILDING_BLOCK.WORKFLOW,
      BUILDING_BLOCK.SCHEDULING,
      BUILDING_BLOCK.REGISTRATION,
    ],
    bulletpoints: [
      "The Scheduling Building Block enables the creation of schedules for each payment and triggers the payments at the specified times. The Registration Building Block is responsible for registering users into the Unconditional Social Cash Transfer Program. The Workflow Building Block creates the logic that coordinates the different Building Blocks, ensuring they are triggered and perform their respective roles.",
    ],
  },
  [ContextualTitle.MESSAGING]: {
    title: "Messaging",
    diagram: MessagingDiagram,
    activeBuildingBlocks: [
      BUILDING_BLOCK.DIGITAL_REGISTRIES,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
      BUILDING_BLOCK.WORKFLOW,
      BUILDING_BLOCK.MESSAGING,
    ],
    bulletpoints: [
      "The Messaging Building Block facilitates communication between a Ulson or Service Employee and Applicant.",
      "The Workflow Building Block coordinates the Building Blocks based on user actions.",
      "The Digital Registries Building Block  stores the messages sent by applicants and Ulsons.",
      "The Information Mediator and Security Building Block collaborate to ensure secure communication.",
    ],
  },
  [ContextualTitle.CONVERSATIONS]: {
    title: "Conversations",
    diagram: MessagingDiagram,
    activeBuildingBlocks: [
      BUILDING_BLOCK.DIGITAL_REGISTRIES,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
      BUILDING_BLOCK.WORKFLOW,
      BUILDING_BLOCK.MESSAGING,
    ],
    bulletpoints: [
      "The Messaging Building Block facilitates communication between a Ulson or Service Employee and Applicant.",
      "The Workflow Building Block coordinates the Building Blocks based on user actions.",
      "The Digital Registries Building Block  stores the messages sent by applicants and Ulsons.",
      "The Information Mediator and Security Building Block collaborate to ensure secure communication.",
    ],
  },
  [ContextualTitle.FEEDBACK]: {
    title: "Feedback",
    diagram: MessagingDiagram,
    activeBuildingBlocks: [
      BUILDING_BLOCK.DIGITAL_REGISTRIES,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
      BUILDING_BLOCK.WORKFLOW,
      BUILDING_BLOCK.MESSAGING,
    ],
    bulletpoints: [
      "The Messaging Building Block facilitates communication between a Ulson or Service Employee and Applicant.",
      "The Workflow Building Block coordinates the Building Blocks based on user actions.",
      "The Digital Registries Building Block stores the messages sent by applicants and Ulsons.",
      "The Information Mediator and Security Building Block collaborate to ensure secure communication.",
    ],
  },
  [ContextualTitle.LOG_IN]: {
    title: "Log In",
    diagram: AuthorisationDiagram,
    activeBuildingBlocks: [
      BUILDING_BLOCK.IDENTITY,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
    ],
    bulletpoints: [
      "Authorization Services verifies the user's identity and authorizes access. The authorization services can call the ID building block to validate the user's identity.",
      "Additionally, the Information Mediator Building Block ensure secure communication between the Building Blocks and services.",
    ],
  },
  [ContextualTitle.ELIGIBILITY_STATUS]: {
    title: "Eligibility Status",
    diagram: EligibilityDiagram,
    activeBuildingBlocks: [
      BUILDING_BLOCK.DIGITAL_REGISTRIES,
      BUILDING_BLOCK.WORKFLOW,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
    ],
    bulletpoints: [
      "The Workflow Building Block triggers the Digital Registries Building Blocks to analyze the applicant's information and determine their eligibility status.",
      "The Information Mediator Building Block ensures secure communication between the Building Blocks.",
      "Together, these building blocks provide a secure and efficient eligibility status page for users.",
    ],
  },
  [ContextualTitle.VALIDATING_INFO]: {
    title: "Validating Info",
    diagram: PersonalInfoValidationDiagram,
    activeBuildingBlocks: [
      BUILDING_BLOCK.DIGITAL_REGISTRIES,
      BUILDING_BLOCK.WORKFLOW,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
      BUILDING_BLOCK.REGISTRATION,
    ],
    bulletpoints: [
      "The Workflow Building Block coordinates the Digital Registries Building Blocks to collect and analyze the applicant's information and determine which information needs to be updated. Registration Building block registers the reviewed content into Digital Registries Building Block. Additionally, the Information Mediator Building Block ensure secure communication between the Building Blocks and services.",
    ],
  },
  [ContextualTitle.CHOOSING_PAYMENT_METHOD]: {
    title: "Choosing Payment Method",
    diagram: PaymentMethodDiagram,
    activeBuildingBlocks: [
      BUILDING_BLOCK.DIGITAL_REGISTRIES,
      BUILDING_BLOCK.WORKFLOW,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
      BUILDING_BLOCK.REGISTRATION,
      BUILDING_BLOCK.CONSENT,
      BUILDING_BLOCK.PAYMENT,
    ],
    bulletpoints: [
      "The Payment Method Building Block offers the applicant a selection of available payment methods. The Digital Registries Building Block pulls and provides information about the available payment methods to be displayed to the applicant. The Registries Building Block registers the chosen method with the applicant's consent.",
      "The Workflow building block is used to coordinate the flow of information between these Building Blocks.",
      "The Information Mediator ensures secure communication between the Building Blocks and services.",
    ],
  },
  [ContextualTitle.PAYMENT_HISTORY]: {
    title: "Payment History",
    diagram: PaymentHistoryDiagram,
    activeBuildingBlocks: [
      BUILDING_BLOCK.DIGITAL_REGISTRIES,
      BUILDING_BLOCK.WORKFLOW,
      BUILDING_BLOCK.INFORMATION_MEDIATOR,
      BUILDING_BLOCK.PAYMENT,
    ],
    bulletpoints: [
      "The Digital Registries Building Block and Payment Building Block collaborate to provide information about the payment history.",
      "The Information Mediator Building Block and Workflow Building Block collaborate to ensure secure communication between Building Block while coordinating various Building Block during the process.",
    ],
  },
};

export const getContextContent = (
  key: ContextualTitle,
  userType?: EUserType | null,
): INormalizedContextualContent => {
  const content = ContextualHelpContent[key];
  return Object.entries(content).reduce((acc, [key, value]) => {
    if (value[EUserType.CITIZEN] && !userType) {
      throw new Error(
        "Key-value pair has user type differences, but no usertype argument!",
      );
    }
    if (
      value[EUserType.CITIZEN] &&
      value[EUserType.CITIZEN_SERVANT] &&
      userType
    ) {
      return { ...acc, [key]: value[userType] };
    }
    return { ...acc, [key]: value };
  }, {} as INormalizedContextualContent);
};
