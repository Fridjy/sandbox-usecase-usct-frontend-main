import { createContext } from "react";
import RPCProviderFactory from "./RPCProviderFactory";
import { Beneficiary, Candidate, Package } from "./types";

export default class RPC {
  RPCProviderFactory: RPCProviderFactory = new RPCProviderFactory();
  getCandidateList = () =>
    this.RPCProviderFactory.getProvider("getCandidateList").getCandidateList();
  getPackages = () =>
    this.RPCProviderFactory.getProvider("getPackages").getPackages();
  getCandidateInfo = (id: number) =>
    this.RPCProviderFactory.getProvider("getCandidateInfo").getCandidateInfo(
      id,
    );
  enrollCandidate = (candidate: Candidate, selectedPackage: Package) =>
    this.RPCProviderFactory.getProvider("enrollCandidate").enrollCandidate(
      candidate,
      selectedPackage,
    );
  getBeneficiariesList = () =>
    this.RPCProviderFactory.getProvider(
      "getBeneficiariesList",
    ).getBeneficiariesList();
  validateBeneficiaries = (beneficiaries: Beneficiary[]) =>
    this.RPCProviderFactory.getProvider(
      "validateBeneficiaries",
    ).validateBeneficiaries(beneficiaries);
  executePayments = (beneficiaries: Beneficiary[]) =>
    this.RPCProviderFactory.getProvider("executePayments").executePayments(
      beneficiaries,
    );
  getRoles = () => this.RPCProviderFactory.getProvider("getRoles").getRoles();
  createCandidate = (candidate: Candidate) =>
    this.RPCProviderFactory.getProvider("createCandidate").createCandidate(
      candidate,
    );
  updateCandidate = (candidate: Candidate) =>
    this.RPCProviderFactory.getProvider("updateCandidate").updateCandidate(
      candidate,
    );
  deleteCandidate = (id: number) =>
    this.RPCProviderFactory.getProvider("deleteCandidate").deleteCandidate(id);
  requestConsent = (candidate: Candidate) =>
    this.RPCProviderFactory.getProvider("requestConsent").requestConsent(candidate);
  getAuthMode = () =>
    this.RPCProviderFactory.getProvider("getAuthMode").getAuthMode();
}

export const RPCContext = createContext(new RPC());
