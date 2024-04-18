import { faker } from '@faker-js/faker';
import { isEmptyArray } from 'formik';
import ObjectToTree from '../../objectToTree';
import MockProvider from './MockProvider';
import { Beneficiary, Candidate, Package } from './types';

export default class StorageProvider extends MockProvider {
    objectToTree = new ObjectToTree();
    candidateList: Candidate[] = [];
    packagesList: Package[] = [];
    beneficiaryList: Beneficiary[] = [];
    requestConsent(candidate: Candidate) {
        return new Promise <boolean> ((resolve) =>
            setTimeout(async () => {
                const consent = await this.getLocalStorageItem("consent");
                resolve((consent)?true:false),
                1000
            })
        );
    }
    getAuthMode(): Promise<string> {
        return new Promise <string> ((resolve) =>
            setTimeout(async () => {
                resolve(await this.getLocalStorageItem("authMode") as string),
                1000
            })
        );
    }
    getCandidateList() {
        return new Promise < Candidate[] > ((resolve) =>
            setTimeout(async () => {
                this.candidateList = await this.getLocalStorageObject("candidates") as Candidate[];
                this.candidateList.sort((a, b) => {
                    return a.id - b.id;
                });
                resolve(this.candidateList);
            }, 1000)
        );
    }
    getPackages() {
        return new Promise < Package[] > ((resolve) =>
            setTimeout(async () => {
                resolve(await this.getLocalStorageObject("packages") as Package[]),
                1000
            })
        );
    }
    getCandidateInfo(id: number) {
        return new Promise < Candidate > ((resolve, reject) => {
            setTimeout(async () => {
                const candidates = await this.getLocalStorageObject("candidates") as Candidate[];
                const candidate = candidates.find(
                    (candidate) => candidate.id === id
                );
                if (candidate) {
                    resolve(candidate);
                } else {
                    reject('No Candidate with ID');
                }
            }, 1000);
        });
    }
    enrollCandidate(
        candidate: Candidate,
        enrolledPackage: Package
    ) {
        const enrolledCandidate: Beneficiary = {
            id: faker.number.int(),
            paymentStatus: 'INITIATE',
            person: candidate.person,
            enrolledPackage,
        };
        this.candidateList = [...this.candidateList].filter(
            (c) => c.person.id !== candidate.id
        );
        this.beneficiaryList = [...this.beneficiaryList, enrolledCandidate];
        return new Promise < Beneficiary > ((resolve) =>
            setTimeout(() => resolve(enrolledCandidate), 1000)
        );
    }
    getBeneficiariesList() {
        return new Promise < Beneficiary[] > ((resolve) =>
            setTimeout(async () => {
                resolve(await this.getLocalStorageObject("beneficiaries") as Beneficiary[]),
                1000
            })
        );
    }
    validateBeneficiaries(beneficiaries: Beneficiary[]) {
        return new Promise < Beneficiary[] > ((resolve) => {
            setTimeout(() => resolve(beneficiaries), 1000);
        });
    }
    executePayments() {
        return new Promise < string > ((resolve) => {
            setTimeout(() => resolve('String'), 1000);
        });
    }
    getRoles(): Promise < string > {
        return new Promise < string > ((resolve) => {
            resolve('ROLE_PAYMENT_OFFICER');
        });
    }

    createCandidate(candidate: Candidate) {
        return new Promise < Candidate > (async (resolve) => {
            var candidateList = await this.getLocalStorageObject("candidates") as Candidate[];
            if (!isEmptyArray(candidateList)) {
                candidate.id = candidateList[candidateList.length - 1].id + 1;
                candidateList.push(candidate);
            }
            else {
                candidate.id = 1;
                candidateList = [candidate];
            }
            this.setLocalStorageObject("candidates", candidateList);
            resolve(candidate);
        });
    }

    updateCandidate(candidate: Candidate) {
        return new Promise < Candidate > ((resolve) => {
            resolve(candidate);
        });
    }

    deleteCandidate(candidateId: number) {
        return new Promise < string > ((resolve) => {
            resolve('Successfully deleted candidate with id ' + candidateId + '!');
        });
    }

    getLocalStorageItem(key: string) {
        return new Promise < string > (async (resolve) => {
            var item = localStorage.getItem(key);
            if (!item) {
                item = await this.getMockItem(key);
                this.setLocalStorageItem(key, item);
            }
            resolve(item);
        })
    };

    setLocalStorageItem(key: string, value: string) {
        localStorage.setItem(key,value);
    }

    getLocalStorageObject(key: string) {
        return new Promise < object > (async (resolve) => {
            var item = await this.getLocalStorageItem(key);
            resolve(this.objectToTree.compose(JSON.parse(item)));
        })
    };

    setLocalStorageObject(key: string, object: object) {
        localStorage.setItem(key, JSON.stringify(this.objectToTree.decompose(object)));
    }

    removeLocalStorageItem(key: string) {
        localStorage.removeItem(key);
        return new Promise < string > ((resolve) => {
            resolve("Removed " + key);
        });
    }
}