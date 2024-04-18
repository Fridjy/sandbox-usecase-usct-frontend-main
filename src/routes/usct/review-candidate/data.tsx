import { ReactComponent as FileQuestionIcon } from "@assets/icons/file-question.svg";
import { ReactComponent as FileWarningIcon } from "@assets/icons/file-warning.svg";
import { ReactComponent as FileXIcon } from "@assets/icons/file-x.svg";
import { Flex, Tag, Text } from "@chakra-ui/react";
import { Candidate, ConsentStatus } from "../../driver-poc/types";

export const personData = {
  fullName: "Alcidas Thomas",
  dateOfBirth: "12/12/1975",
  phoneNumber: "(+00) 94 843 432",
  occupation: "Unemployed",
  idCode: "12345678910",
  email: "tom@myspace.com",
  socialCode: "9525206274",
  fullAddress: "Ouanaminthe 320 C",
  householdNeeds: [
    "Housing",
    "Food",
    "Health Care",
    "Education",
    "Child Care",
    "Financial Security",
    "Special Support",
  ],
};

interface BankData {
  ownerName: string;
  bankName: string;
  iban: string;
  candidate: Candidate;
}

export const bankData: BankData = {
  ownerName: "Alcidas Thomas",
  bankName: "Sunshine Bank",
  iban: "AA02300209000106531065",
  candidate: {
    id: 0,
    person: {
      id: 1,
      personalIdCode: "",
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      region: "",
      homeAddress: "",
      phoneNumber: "",
      occupation: "",
      municipality: "",
      zipCode: "",
      bankAccountOwnerName: "",
      financialAddress: "",
      iban: "",
      bankName: "",
      financialModality: "",
    },
    packages: [],
    consent: {
      id: 1,
      candidateId: 1,
      status: ConsentStatus.NOT_GRANTED,
      date: ""
    },
  },
};

export const householdData = [
  {
    name: "Priscilla Anderson",
    personalCode: "123456728910",
    relation: "Wife",
    dateOfBirth: "12/12/1975",
    reason: "Data",
    needs: [],
  },
  {
    name: "Jason Anderson",
    personalCode: "123456728910",
    relation: "Father",
    dateOfBirth: "12/12/1955",
    reason: "Data",
    needs: ["Hearing Support"],
  },
  {
    name: "Angelina Anderson",
    personalCode: "123456728910",
    relation: "Child",
    dateOfBirth: "08/10/2008",
    reason: "Data",
    needs: ["Special Care"],
  },
  {
    name: "Amelia Anderson",
    personalCode: "123456728910",
    relation: "Child",
    dateOfBirth: "12/05/2014",
    reason: "Data",
    needs: [],
  },
];

export const documentsData = [
  {
    name: "Medical Certificate",
    organization: "12345678910",
    issuedOn: "Wife",
    validUntil: "12.12.1975",
    status: (
      <Flex gap=".5rem">
        <Tag colorScheme="green" size="sm" borderRadius="full" />
        <Text>Uploaded</Text>
      </Flex>
    ),
  },
  {
    name: "Medical Certificate",

    organization: "12345678910",
    issuedOn: "Wife",
    validUntil: "12.12.1975",
    status: (
      <Flex gap=".5rem">
        <Tag colorScheme="green" size="sm" borderRadius="full" />
        <Text>Uploaded</Text>
      </Flex>
    ),
  },
  {
    name: "Medical Certificate",

    organization: "12345678910",
    issuedOn: "Wife",
    validUntil: "12.12.1975",
    status: (
      <Flex gap=".5rem">
        <Tag colorScheme="green" size="sm" borderRadius="full" />
        <Text>Uploaded</Text>
      </Flex>
    ),
  },
  {
    name: "Medical Certificate",

    organization: "12345678910",
    issuedOn: "Wife",
    validUntil: "12.12.1975",
    status: (
      <Flex gap=".5rem">
        <Tag colorScheme="green" size="sm" borderRadius="full" />
        <Text>Uploaded</Text>
      </Flex>
    ),
  },
];

export const historyData = [
  {
    title: "Registration of the Citizen",
    icon: <FileQuestionIcon />,
    events: [
      {
        name: "Interviews, Census Survey and Data Collection",
        date: "01.01.2023",
        info: "#97654321",
        completed: true,
      },
      {
        name: "Registration to the Social Registry Information System",
        date: "01.01.2023",
        info: "#97654321",
        completed: true,
      },
      {
        name: "Cross-referencing the data with other databases",
        date: "01.01.2023",
        info: "#97654321",
        completed: true,
      },
      {
        name: "Verify and Validate the information",
        date: "01.01.2023",
        info: "#97654321",
        completed: true,
      },
    ],
  },
  {
    title: "Eligibility",
    icon: <FileQuestionIcon />,
    events: [
      {
        name: "Determining Household Needs",
        date: "01.01.2023",
        info: "#97654321",
        completed: true,
      },
      {
        name: "Registration to the Social Registry Information System",
        date: "01.01.2023",
        info: "#97654321",
        completed: true,
      },
      {
        name: "Determining Eligibility of the citizen to the program",
        date: "01.01.2023",
        info: "MORE INFORMATION REQUIRED",
        completed: false,
      },
      {
        name: "Assigning the Benefit Package",
        date: "01.01.2023",
        info: "MORE INFORMATION REQUIRED",
        completed: false,
      },
    ],
  },
  {
    title: "Enrollment",
    icon: <FileWarningIcon />,
    events: [
      {
        name: "Program Enrollment Starts",
        date: "01.01.2023",
        info: "#97654321",
      },
    ],
  },
  {
    title: "Payment",
    icon: <FileXIcon />,
  },
  {
    title: "On Going Case Management",
    icon: <FileXIcon />,
  },
];

export const getHistoryData = (currentState: string | null) => {
  if (!currentState) {
    return historyData;
  }
  switch (currentState) {
    case "done":
      return historyData.map((item) => {
        return {
          ...item,
          events: item.events?.map((event) => {
            if (Object.hasOwn(event, "completed")) {
              if (event.name === "Assigning the Benefit Package") {
                return { ...event, completed: false };
              }
              return { ...event, completed: true, info: "#97654321" };
            }
            return event;
          }),
        };
      });
    case "scheduling":
      return historyData.map((item) => {
        return {
          ...item,
          events: item.events?.map((event) => {
            if (Object.hasOwn(event, "completed")) {
              return { ...event, completed: true, info: "#97654321" };
            }
            return { ...event, completed: true };
          }),
        };
      });
    default:
      return historyData;
  }
};
