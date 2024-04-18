import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Dashboard } from "./driver-poc/dashboard/Dashboard";
import Login from "./driver-poc/Login";
import {
  isAllowedRoleGuard,
  isAuthenticatedGuard,
  ProtectedRoute,
} from "./driver-poc/ProtectedRoute";
import { Scope } from "./driver-poc/utils/user";
const BeneficiaryList = lazy(() => import("./driver-poc/BeneficiaryList"));
const CandidateDetail = lazy(() => import("./driver-poc/CandidateDetail"));
const CandidatesList = lazy(() => import("./driver-poc/CandidatesList"));
const DriverPoc = lazy(() => import("./driver-poc/DriverPoc"));
const USCT = lazy(() => import("./usct/USCT"));
const ActiveProgram = lazy(() => import("./usct/active-program/ActiveProgram"));
const AuthoriseCitizen = lazy(
  () => import("./usct/authorise-citizen/AuthoriseCitizen"),
);
const CandidateList = lazy(() => import("./usct/candidate-list/CandidateList"));
const CaseList = lazy(() => import("./usct/case-list/CaseList"));
const CaseManagement = lazy(
  () => import("./usct/case-management/CaseManagement"),
);
const Conversation = lazy(() => import("./usct/conversation/Conversation"));
const Enrolment = lazy(() => import("./usct/enrolment/Enrolment"));
const Info = lazy(() => import("./usct/info/Info"));
const Personal = lazy(() => import("./usct/personal/Personal"));
const ReviewCandidate = lazy(
  () => import("./usct/review-candidate/ReviewCandidate"),
);
const ReviewCase = lazy(() => import("./usct/review-case/ReviewCase"));
const Review = lazy(() => import("./usct/review/Review"));
const StartNewConversation = lazy(
  () => import("./usct/start-new-conversation/StartNewConversation"),
);
const Feedback = lazy(() => import("./usct/feedback/Feedback"));

const CreateCandidate = lazy(() => import("./driver-poc/CreateCandidate"));
const PersonalInformationEdit = lazy(
  () => import("./usct/personal/PersonalInformationEdit"),
);
const BankInformationEdit = lazy(
  () => import("./usct/personal/BankInformationEdit"),
);
export const router = createBrowserRouter([
  {
    path: "",
    children: [
      {
        path: "driver-poc/login",
        element: (
          <ProtectedRoute
            guard={() => !isAuthenticatedGuard()}
            redirect="/driver-poc"
          >
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "driver-poc",
        element: (
          <ProtectedRoute
            guard={() => isAuthenticatedGuard()}
            redirect="/driver-poc/login"
          >
            <React.Suspense>
              <DriverPoc />
            </React.Suspense>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "candidates",
            element: (
              <ProtectedRoute
                guard={() =>
                  isAllowedRoleGuard([
                    Scope.ROLE_ENROLLMENT_OFFICER,
                    Scope.ROLE_REGISTRY_OFFICER,
                  ])
                }
              >
                <CandidatesList />
              </ProtectedRoute>
            ),
          },
          {
            path: "candidate/edit/personalInformation/:id",
            element: (
              <ProtectedRoute
                guard={() =>
                  isAllowedRoleGuard([Scope.ROLE_REGISTRY_OFFICER])
                }
                redirect="/driver-poc"
              >
                <PersonalInformationEdit />
              </ProtectedRoute>
            ),
          },
          {
            path: "candidate/edit/bankInformation/:id",
            element: (
              <ProtectedRoute
                guard={() =>
                  isAllowedRoleGuard([Scope.ROLE_REGISTRY_OFFICER])
                }
                redirect="/driver-poc"
              >
                <BankInformationEdit />
              </ProtectedRoute>
            ),
          },
          {
            path: "candidate/create",
            element: (
              <ProtectedRoute
                guard={() =>
                  isAllowedRoleGuard([Scope.ROLE_REGISTRY_OFFICER])
                }
                redirect="/driver-poc"
              >
                <CreateCandidate />
              </ProtectedRoute>
            ),
          },
          {
            path: "candidate/:id",
            children: [
              {
                index: true,
                element: (
                  <ProtectedRoute
                    guard={() =>
                      isAllowedRoleGuard([
                        Scope.ROLE_ENROLLMENT_OFFICER,
                        Scope.ROLE_REGISTRY_OFFICER,
                      ])
                    }
                    redirect="/driver-poc"
                  >
                    <CandidateDetail />
                  </ProtectedRoute>
                ),
              },
            ],
          },
          {
            path: "beneficiaries",
            element: (
              <>
                <ProtectedRoute
                  guard={() => isAllowedRoleGuard([Scope.ROLE_PAYMENT_OFFICER])}
                >
                  <BeneficiaryList />
                </ProtectedRoute>
              </>
            ),
          },
        ],
      },
      {
        path: "driver-poc/*",
        element: <Navigate to="/driver-poc/dashboard" />,
      },
      {
        element: (
          <React.Suspense>
            <USCT />
          </React.Suspense>
        ),
        children: [
          {
            element: (
              <React.Suspense>
                <CaseManagement />
              </React.Suspense>
            ),
            index: true,
          },
          {
            element: (
              <React.Suspense>
                <CaseManagement />
              </React.Suspense>
            ),
            path: "case-management",
          },
          {
            element: (
              <React.Suspense>
                <CandidateList />
              </React.Suspense>
            ),
            path: "candidate-list",
          },
          {
            element: (
              <React.Suspense>
                <CaseList />
              </React.Suspense>
            ),
            path: "case-list",
          },
          {
            element: (
              <React.Suspense>
                <ReviewCandidate />
              </React.Suspense>
            ),
            path: "review-candidate/:id",
          },
          {
            element: (
              <React.Suspense>
                <Enrolment />
              </React.Suspense>
            ),
            path: "enrolment",
          },
          {
            element: (
              <React.Suspense>
                <ActiveProgram />
              </React.Suspense>
            ),
            path: "active-program",
          },
          {
            element: (
              <React.Suspense>
                <ReviewCase />
              </React.Suspense>
            ),
            path: "review-case/:id",
          },
          {
            element: (
              <React.Suspense>
                <Conversation />
              </React.Suspense>
            ),
            path: "conversation/:id",
          },
          {
            element: (
              <React.Suspense>
                <StartNewConversation />
              </React.Suspense>
            ),
            path: "new-conversation",
          },
          {
            element: (
              <React.Suspense>
                <AuthoriseCitizen />
              </React.Suspense>
            ),
            path: "authorise-citizen",
          },
          {
            element: (
              <React.Suspense>
                <Info />
              </React.Suspense>
            ),
            path: "info",
          },
          {
            element: (
              <React.Suspense>
                <Personal />
              </React.Suspense>
            ),
            path: "personal",
          },
          {
            element: (
              <React.Suspense>
                <Review />
              </React.Suspense>
            ),
            path: "review",
          },
          {
            element: (
              <React.Suspense>
                <Feedback />
              </React.Suspense>
            ),
            path: "feedback",
          },
        ],
      },
    ],
  },
]);
