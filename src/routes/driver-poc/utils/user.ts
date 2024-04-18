export enum Scope {
  ROLE_PAYMENT_OFFICER = "ROLE_PAYMENT_OFFICER",
  ROLE_ENROLLMENT_OFFICER = "ROLE_ENROLLMENT_OFFICER",
  ROLE_REGISTRY_OFFICER = "ROLE_REGISTRY_OFFICER",
}

export interface Role {
  email: string,
  name: string | null,
  roles: string[]
}

export const getRole = () => {
  const user = sessionStorage.getItem("user");
  if (user) {
    try {
      return (JSON.parse(user) as Role).roles[0];
    } catch (e) {
      return null;
    }
  }
};
