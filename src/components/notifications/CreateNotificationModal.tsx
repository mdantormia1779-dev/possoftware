"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { NotificationItem } from "@/types";
import { NotificationFormFields } from "./NotificationFormFields";

interface CreateNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (item: Partial<NotificationItem>) => Promise<void>;
  defaultRole?: string;
}

export function CreateNotificationModal({
  isOpen,
  onClose,
  onCreate,
  defaultRole = "all",
}: CreateNotificationModalProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<string>("info");
  const [targetRole, setTargetRole] = useState<string>(defaultRole);
  const [link, setLink] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await onCreate({
        title: title.trim(),
        message: message.trim(),
        type,
        targetRole,
        link: link.trim() || undefined,
        time: "Just now",
      });
      setTitle("");
      setMessage("");
      setLink("");
      setType("info");
      setTargetRole(defaultRole);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Notification" maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <NotificationFormFields
          title={title}
          setTitle={setTitle}
          type={type}
          setType={setType}
          targetRole={targetRole}
          setTargetRole={setTargetRole}
          message={message}
          setMessage={setMessage}
          link={link}
          setLink={setLink}
        />
        <div className="flex justify-end gap-2 pt-3 border-t border-border">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" disabled={submitting}>
            {submitting ? "Creating..." : "Create Notification"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
