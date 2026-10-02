import Link from "next/link";
import type { QueryFilter } from "mongoose";
import {
  Badge,
  EmptyState,
  PageHeader,
  Select,
  Table,
  Td,
  Th,
} from "@/components/admin/ui";
import { requirePermission } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import {
  Registration,
  registrantName,
  type RegistrationDoc,
} from "@/lib/models/Registration";
import {
  ENQUIRY_STATUSES,
  ENQUIRY_STATUS_LABEL,
  type EnquiryStatus,
} from "@/lib/constants";
import { formatNaira } from "@/lib/money";

const PAGE_SIZE = 25;

export const metadata = { title: "Registrations" };

const STATUS_TONE: Record<EnquiryStatus, "ok" | "warn" | "alert" | "neutral"> = {
  new: "warn",
  reviewing: "neutral",
  approved: "ok",
  declined: "alert",
};

export default async function RegistrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  await requirePermission("enquiries:read");
  const params = await searchParams;

  const status = ENQUIRY_STATUSES.includes(params.status as EnquiryStatus)
    ? (params.status as EnquiryStatus)
    : "";
  const page = Math.max(1, Number(params.page) || 1);

  await connectDb();

  const filter: QueryFilter<RegistrationDoc> = {};
  if (status) filter.status = status;

  const [registrations, total, newCount] = await Promise.all([
    Registration.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    Registration.countDocuments(filter),
    Registration.countDocuments({ status: "new" }),
  ]);

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageHref = (target: number) =>
    `/admin/registrations?${new URLSearchParams({ ...(status ? { status } : {}), page: String(target) })}`;

  return (
    <>
      <PageHeader
        title="Membership registrations"
        description={
          newCount > 0
            ? `${newCount} awaiting review. Approving one seeds a pending member record from the form.`
            : "Membership registration forms submitted through the public site."
        }
      />

      <form
        method="GET"
        action="/admin/registrations"
        className="mb-8 flex flex-wrap items-end gap-4 border-b border-rule pb-8"
      >
        <div className="w-full sm:w-64">
          <label htmlFor="status" className="label-sm block text-ink-soft">
            Status
          </label>
          <Select id="status" name="status" defaultValue={status} className="mt-2">
            <option value="">All statuses</option>
            {ENQUIRY_STATUSES.map((value) => (
              <option key={value} value={value}>
                {ENQUIRY_STATUS_LABEL[value]}
              </option>
            ))}
          </Select>
        </div>
        <button
          type="submit"
          className="label border border-forest-900/25 px-5 py-3 text-forest-900 transition-colors hover:bg-forest-900/5"
        >
          Apply
        </button>
      </form>

      {registrations.length === 0 ? (
        <EmptyState
          title={status ? "No matching registrations" : "No registrations yet"}
          body={
            status
              ? "Nothing is at this status right now."
              : "Forms submitted at /join/register will appear here, newest first."
          }
        />
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <Th>Received</Th>
                <Th>Applicant</Th>
                <Th>Department</Th>
                <Th align="right">Monthly</Th>
                <Th>Status</Th>
                <Th>Receipt</Th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration) => {
                const id = String(registration._id);
                return (
                  <tr key={id}>
                    <Td>
                      <span className="tnum">
                        {registration.createdAt.toLocaleDateString("en-NG", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="label-sm mt-1 block text-ink-faint">
                        {registration.reference}
                      </span>
                    </Td>
                    <Td>
                      <div className="flex items-center gap-3">
                        {/* Served from an authenticated route; next/image cannot forward the session. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/admin/registrations/${id}/photo`}
                          alt=""
                          loading="lazy"
                          className="aspect-[7/9] w-9 shrink-0 border border-rule bg-paper-alt object-cover"
                        />
                        <div className="min-w-0">
                          <Link
                            href={`/admin/registrations/${id}`}
                            className="text-forest-900 underline-offset-4 hover:underline"
                          >
                            {registrantName(registration)}
                          </Link>
                          <span className="label-sm mt-1 block break-all text-ink-faint">
                            {registration.email}
                          </span>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <span className="text-[0.875rem]">{registration.department}</span>
                    </Td>
                    <Td align="right">
                      <span className="tnum">
                        {formatNaira(registration.monthlyContributionKobo)}
                      </span>
                    </Td>
                    <Td>
                      <Badge tone={STATUS_TONE[registration.status]}>
                        {ENQUIRY_STATUS_LABEL[registration.status]}
                      </Badge>
                    </Td>
                    <Td>
                      {registration.applicantMail === "sent" ? (
                        <span className="label-sm text-ok">Sent</span>
                      ) : registration.applicantMail === "failed" ? (
                        <span className="label-sm text-alert">Failed</span>
                      ) : (
                        <span className="label-sm text-ink-faint">
                          {registration.applicantMail}
                        </span>
                      )}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {pageCount > 1 ? (
            <nav
              aria-label="Pagination"
              className="mt-8 flex items-center justify-between gap-4"
            >
              <span className="label-sm text-ink-faint">
                Page {page} of {pageCount}
              </span>
              <div className="flex gap-3">
                {page > 1 ? (
                  <Link
                    href={pageHref(page - 1)}
                    className="label-sm border border-forest-900/25 px-4 py-2.5 text-forest-900 hover:bg-forest-900/5"
                  >
                    Previous
                  </Link>
                ) : null}
                {page < pageCount ? (
                  <Link
                    href={pageHref(page + 1)}
                    className="label-sm border border-forest-900/25 px-4 py-2.5 text-forest-900 hover:bg-forest-900/5"
                  >
                    Next
                  </Link>
                ) : null}
              </div>
            </nav>
          ) : null}
        </>
      )}
    </>
  );
}
