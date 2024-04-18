
import { faker } from "@faker-js/faker";
import ObjectToTree from "../../objectToTree";
import BaseProvider from "./BaseProvider";
import { Beneficiary, Candidate, ConsentStatus, Package } from "./types";

const localStorageVariable = "No such variable in mock storage";

const mockPackages: Package[] = [
  {
    id: 1,
    name: "Universal Basic Income (UBI)",
    description:
      "Providing a fixed cash transfer to all eligible individuals, regardless of income, for a minimum standard of living.",
    amount: 1234.5,
    currency: "EURO",
  },
  {
    id: 2,
    name: "Targeted Poverty Alleviation (TPA)",
    description:
      "Offering additional financial assistance to those living below the poverty line to alleviate poverty effectively",
    amount: 1234.5,
    currency: "EURO",
  },
  {
    id: 3,
    name: "Social Pension",
    description:
      "Ensuring economic security during retirement by providing regular cash transfers to elderly citizens.",
    amount: 1234.5,
    currency: "EURO",
  },
  {
    id: 4,
    name: "Child and Family Support (CFS)",
    description:
      "Providing financial assistance to families with children to improve child well-being and reduce child poverty.",
    amount: 1234.5,
    currency: "EURO",
  },
];

const mockCandidateList: Candidate[] = [
  {
    id: 1,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: "Bank Account",
    },
    packages: [mockPackages[0], mockPackages[1], mockPackages[3]],
    consent: {
      id: 1,
      candidateId: 1,
      status: ConsentStatus.GRANTED,
      date: "2023-11-20T12:30:00"
    },
    relative: null
  },
  {
    id: 2,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: "Bank Account",
    },
    packages: [mockPackages[1]],
    consent: {
      id: 2,
      candidateId: 2,
      status: ConsentStatus.NOT_GRANTED,
      date: ""
    },
    relative: null
  },
  {
    id: 3,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: "Bank Account",
    },
    packages: [mockPackages[1], mockPackages[3]],
    consent: null,
    relative: null
  },
  {
    id: 4,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: "Bank Account",
    },
    packages: [mockPackages[0], mockPackages[2]],
    consent: null,
    relative: null
  },
  {
    id: 5,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: "Bank Account",
    },
    packages: [],
    consent: null,
    relative: null
  },
];

mockCandidateList[0].relative = mockCandidateList[1];
mockCandidateList[1].relative = mockCandidateList[0];

const mockBeneficiaryList: Beneficiary[] = [
  {
    id: 1,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: "Bank Account",
    },
    enrolledPackage: mockPackages[2],
    paymentStatus: "INITIATE",
  },
  {
    id: 2,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: "Bank Account",
    },
    enrolledPackage: mockPackages[1],
    paymentStatus: "INITIATE",
  },
  {
    id: 3,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: "Bank Account",
    },
    enrolledPackage: mockPackages[0],
    paymentStatus: "INITIATE",
  },
  {
    id: 4,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: "Bank Account",
    },
    enrolledPackage: mockPackages[2],
    paymentStatus: "INITIATE",
  },
  {
    id: 5,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: "Bank Account",
    },
    enrolledPackage: mockPackages[3],
    paymentStatus: "INITIATE",
  },
];

export default class MockProvider extends BaseProvider {
  candidateList = [...mockCandidateList];
  packagesList: Package[] = [...mockPackages];
  beneficiaryList: Beneficiary[] = [...mockBeneficiaryList];
  requestConsent(candidate: Candidate) {
    return new Promise <boolean> ((resolve) =>
        setTimeout(async () => {
            resolve(true),
            1000
        })
    );
  }
  getAuthMode(): Promise<string> {
    return new Promise <string> ((resolve) =>
        setTimeout(async () => {
            resolve("mosip"),
            1000
        })
    );
  }
  getCandidateList() {
    return new Promise<Candidate[]>((resolve) =>
      setTimeout(() => {
        resolve(this.candidateList);
      }, 1000),
    );
  }
  getPackages() {
    return new Promise<Package[]>((resolve) =>
      setTimeout(() => resolve(this.packagesList), 1000),
    );
  }
  getCandidateInfo(id: number) {
    return new Promise<Candidate>((resolve, reject) => {
      setTimeout(() => {
        const candidate = this.candidateList.find(
          (candidate) => candidate.id === id,
        );
        if (candidate) {
          resolve(candidate);
        } else {
          reject("No Candidate with ID");
        }
      }, 1000);
    });
  }
  enrollCandidate(candidate: Candidate, enrolledPackage: Package) {
    const enrolledCandidate: Beneficiary = {
      id: faker.number.int(),
      paymentStatus: "INITIATE",
      person: candidate.person,
      enrolledPackage,
    };
    this.candidateList = [...this.candidateList].filter(
      (c) => c.person.id !== candidate.id,
    );
    this.beneficiaryList = [...this.beneficiaryList, enrolledCandidate];
    return new Promise<Beneficiary>((resolve) =>
      setTimeout(() => resolve(enrolledCandidate), 1000),
    );
  }
  getBeneficiariesList() {
    return new Promise<Beneficiary[]>((resolve) =>
      setTimeout(() => resolve(this.beneficiaryList), 1000),
    );
  }
  validateBeneficiaries(beneficiaries: Beneficiary[]) {
    return new Promise<Beneficiary[]>((resolve) => {
      setTimeout(() => resolve(beneficiaries), 1000);
    });
  }
  executePayments() {
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve("String"), 1000);
    });
  }
  getRoles(): Promise<string> {
    return new Promise<string>((resolve) => {
      resolve("ROLE_PAYMENT_OFFICER");
    });
  }

  createCandidate(candidate: Candidate) {
    return new Promise<Candidate>((resolve) => {
      resolve(candidate);
    });
  }

  updateCandidate(candidate: Candidate) {
    return new Promise<Candidate>((resolve) => {
      resolve(candidate);
    });
  }

  deleteCandidate(candidateId: number) {
    return new Promise<string>((resolve) => {
      resolve("Successfully deleted candidate with id " + candidateId + "!");
    });
  }

  getMockItem(key: string) : Promise<string> {
    const objectToTree = new ObjectToTree();
    return new Promise<string>((resolve) => {
      if (key == "candidates") resolve(JSON.stringify(objectToTree.decompose(this.candidateList)));
      else if (key == "beneficiaries") resolve(JSON.stringify(objectToTree.decompose(this.beneficiaryList)));
      else if (key == "packages") resolve(JSON.stringify(objectToTree.decompose(this.packagesList)));
      else resolve(JSON.stringify(localStorageVariable));
    });
  }
}
