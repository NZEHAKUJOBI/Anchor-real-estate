"use client";

import { useTransition } from "react";
import Link from "next/link";
import { ButtonLink, Button } from "@/components/admin/ui";
import { toggleReadAction, deleteMailAction } from "../actions";

export function MessageActions({
  messageId,
  isRead,
  direction,
  canWrite,
}: {
  messageId: string;
  isRead: boolean;
  direction: string;
  canWrite: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleToggleRead = () => {
    startTransition(async () => {
      await toggleReadAction(messageId, !isRead);
    });
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    startTransition(async () => {
      await deleteMailAction(messageId);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {canWrite ? (
        <ButtonLink
          href={`/admin/mail/compose?replyToId=${messageId}`}
          variant="gold"
        >
          Reply to Email
        </ButtonLink>
      ) : null}

      {direction === "inbound" ? (
        <Button
          type="button"
          variant="ghost"
          disabled={isPending}
          onClick={handleToggleRead}
        >
          {isRead ? "Mark as Unread" : "Mark as Read"}
        </Button>
      ) : null}

      {canWrite ? (
        <Button
          type="button"
          variant="danger"
          disabled={isPending}
          onClick={handleDelete}
        >
          Delete
        </Button>
      ) : null}
    </div>
  );
}
