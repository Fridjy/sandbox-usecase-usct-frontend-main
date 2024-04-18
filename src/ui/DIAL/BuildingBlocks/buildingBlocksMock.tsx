import { BUILDING_BLOCK } from "../../../routes/usct/utils";

export const bbDescriptionMock: Record<BUILDING_BLOCK, string> = {
  [BUILDING_BLOCK.CONSENT]:
    "Manages a set of policies allowing users to determine the information that will be accessible to specific potential information consumers, for which purpose, for how long and whether this information can be shared further.",
  [BUILDING_BLOCK.IDENTITY]:
    "Enables unique identification of users, organizations and other entities.",
  [BUILDING_BLOCK.INFORMATION_MEDIATOR]:
    "Provides a gateway between external digital applications and other ICT Building Blocks, thereby ensuring interoperability and implementation of standards, which is essential for integrating various ICT Building Blocks and applications.",
  [BUILDING_BLOCK.DIGITAL_REGISTRIES]:
    "Registries are centrally managed databases that uniquely identify persons, vendors, facilities, procedures, products and sites related to an organization, industry or activity.",
  [BUILDING_BLOCK.MESSAGING]:
    "Facilitates notifications, alerts and two-way communications between applications and communications services, including SMS, unstructured supplementary service data, IVR, email and social media platforms.",
  [BUILDING_BLOCK.PAYMENT]:
    "Implements financial transactions such as remittances, insurance claims, product purchases and payments of service fees, along with the logging of related transactional information. It also provides utilities for tracking costs and extracting audit trials.",
  [BUILDING_BLOCK.REGISTRATION]:
    "Records identifiers and other general information about a person, place or other entity, typically for the purpose of registration or enrollment in specific services or programmes and tracking of that entity over time.",
  [BUILDING_BLOCK.SCHEDULING]:
    "Provides an engine for setting up events based on regular intervals or specific combinations of status of several parameters in order to trigger specific tasks in an automated business process.",
  [BUILDING_BLOCK.WORKFLOW]:
    "Helps to optimize business processes by specifying rules that govern the sequence of activities to be executed as well as the type of information exchanged in order to orchestrate the process flow from its initiation to completion.",
};
