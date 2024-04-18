import BaseProvider from "./BaseProvider";
import { Beneficiary, Candidate, Package } from "./types";

export default class APIProvider extends BaseProvider {
  async getAuthMode() {
    try {
      const req = await fetch(
        `/api/authmode`,
      );
      if (req.ok) return req.text() as Promise<string>;
      else throw "error"
    } catch (error) {
      return "error";
    }
  }

  async requestConsent(candidate: Candidate) {
    const req = await fetch(`/api/v1/consent`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(candidate)
  });
    return req.ok;
  }

  async getCandidateList() {
    try {
      const req = await fetch(
        `/api/v1/candidates`, {
          credentials: "include"
        }
      );
      if (req.ok) return req.json() as Promise<Candidate[]>;
      else throw "error"
    } catch (error) {
      return [];
    }
  }
  async getPackages() {
    const req = await fetch(
      `/api/v1/packages`, {
        credentials: "include"
      }
    );
    return req.json() as Promise<Package[]>;
  }
  async getCandidateInfo(id: number) {
    const req = await fetch(
      `/api/v1/candidates/${id}`, {
        credentials: "include"
      }
    );
    return req.json() as Promise<Candidate>;
  }
  async enrollCandidate(candidate: Candidate, enrolledPackage: Package) {
    const req = await fetch(
      `/api/v1/beneficiaries`,
      {
        method: "POST",
        body: JSON.stringify({
          candidateDto: candidate,
          enrolledPackage,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      },
    );
    return req.json() as Promise<Beneficiary>;
  }
  async getBeneficiariesList() {
    const req = await fetch(
      `/api/v1/beneficiaries`, {
        credentials: "include"
      }
    );
    return req.json() as Promise<Beneficiary[]>;
  }
  async validateBeneficiaries(beneficiaries: Beneficiary[]) {
    const req = await fetch(
      `/api/v1/payment/prepayment-validation`,
      {
        method: "POST",
        body: JSON.stringify({
          beneficiaries,
        }),
        credentials: "include"
      },
    );
    return req.json() as Promise<Beneficiary[]>;
  }
  async executePayments(beneficiaries: Beneficiary[]) {
    const req = await fetch(
      `/api/v1/payment/order-payment`,
      {
        method: "POST",
        body: JSON.stringify(beneficiaries),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      },
    );
    return req.text() as Promise<string>;
  }
  async getRoles() {
    const req = await fetch(
      `/api/v1/roles`,
      {
        method: "GET",
        credentials: "include"
      }
    );
    if (req.status == 401) {
      throw "loginRequired"
    } else {
      return req.text() as Promise<string>;
    }
  }
  async createCandidate(candidate: Candidate) {
    const req = await fetch(
      `/api/v1/candidates`,
      {
        method: "POST",
        body: JSON.stringify(candidate),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      },
    );
    return req.json() as Promise<Candidate>;
  }

  async updateCandidate(candidate: Candidate) {
    const req = await fetch(
      `/api/v1/candidates/${
        candidate.person.id
      }`,
      {
        method: "PUT",
        body: JSON.stringify(candidate),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      },
    );
    return req.json() as Promise<Candidate>;
  }

  async deleteCandidate(id: number) {
    const req = await fetch(
      `/api/v1/candidates/${id}`,
      {
        method: "DELETE",
        credentials: "include"
      },
    );
    return req.json() as Promise<string>;
  }
}
