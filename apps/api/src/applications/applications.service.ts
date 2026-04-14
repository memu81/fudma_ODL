import { Injectable, NotFoundException } from "@nestjs/common";
import { ApplicationStatus } from "../common/application-status.enum";
import { CreateApplicationDto } from "./dto/create-application.dto";

interface ApplicationRecord {
  id: string;
  applicationNumber: string;
  applicantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  programId: string;
  session: string;
  status: ApplicationStatus;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
}

type ApplicationSummary = Pick<
  ApplicationRecord,
  "id" | "applicationNumber" | "status" | "programId" | "session" | "updatedAt"
>;

@Injectable()
export class ApplicationsService {
  private readonly records: ApplicationRecord[] = [];

  private generateApplicationNumber(): string {
    const sequence = (this.records.length + 1).toString().padStart(5, "0");
    return `FUDMA-ODL-${new Date().getFullYear()}-${sequence}`;
  }

  saveDraft(applicantId: string, payload: CreateApplicationDto): ApplicationRecord {
    const now = new Date().toISOString();
    const existing = this.records.find(
      (record) =>
        record.applicantId === applicantId &&
        record.programId === payload.programId &&
        record.session === payload.session &&
        record.status === ApplicationStatus.DRAFT,
    );

    if (existing) {
      existing.firstName = payload.firstName;
      existing.lastName = payload.lastName;
      existing.email = payload.email.toLowerCase();
      existing.phoneNumber = payload.phoneNumber;
      existing.updatedAt = now;
      return existing;
    }

    const record: ApplicationRecord = {
      id: `app_${Date.now()}`,
      applicationNumber: this.generateApplicationNumber(),
      applicantId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email.toLowerCase(),
      phoneNumber: payload.phoneNumber,
      programId: payload.programId,
      session: payload.session,
      status: ApplicationStatus.DRAFT,
      createdAt: now,
      updatedAt: now,
    };
    this.records.push(record);
    return record;
  }

  submit(applicantId: string, id: string): ApplicationRecord {
    const record = this.records.find(
      (item) => item.id === id && item.applicantId === applicantId,
    );
    if (!record) {
      throw new NotFoundException("Application not found");
    }

    record.status = ApplicationStatus.SUBMITTED;
    record.submittedAt = new Date().toISOString();
    record.updatedAt = record.submittedAt;
    return record;
  }

  findByUser(applicantId: string): ApplicationSummary[] {
    return this.records
      .filter((record) => record.applicantId === applicantId)
      .map((record) => ({
        id: record.id,
        applicationNumber: record.applicationNumber,
        status: record.status,
        programId: record.programId,
        session: record.session,
        updatedAt: record.updatedAt,
      }));
  }

  findForReview(): ApplicationRecord[] {
    return this.records.filter((record) =>
      [ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_REVIEW].includes(record.status),
    );
  }

  getOneByNumber(requesterId: string, requesterRole: string, applicationNumber: string): ApplicationRecord {
    const found = this.records.find(
      (record) => record.applicationNumber === applicationNumber,
    );
    if (!found) {
      throw new NotFoundException("Application not found");
    }
    if (requesterRole === "APPLICANT" && found.applicantId !== requesterId) {
      throw new NotFoundException("Application not found");
    }
    return found;
  }
}
