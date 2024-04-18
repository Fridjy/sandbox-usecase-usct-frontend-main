import { Beneficiary, Candidate, Package } from "./types";

export default abstract class BaseProvider {
  abstract getCandidateList(): Promise<Candidate[]>;
  abstract getPackages(): Promise<Package[]>;
  abstract getCandidateInfo(id: number): Promise<Candidate>;
  abstract enrollCandidate(
    candidate: Candidate,
    enrolledPackage: Package,
  ): Promise<Beneficiary>;
  abstract getBeneficiariesList(): Promise<Beneficiary[]>;
  abstract validateBeneficiaries(
    beneficiares: Beneficiary[],
  ): Promise<Beneficiary[]>;
  abstract executePayments(beneficiaries: Beneficiary[]): Promise<string>;
  abstract getRoles(): Promise<string>;
  abstract createCandidate(candidate: Candidate): Promise<Candidate>;
  abstract updateCandidate(candidate: Candidate): Promise<Candidate>;
  abstract deleteCandidate(id: number): Promise<string>;
  abstract requestConsent(candidate: Candidate): Promise<boolean>
  abstract getAuthMode(): Promise<string>;
}
