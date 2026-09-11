"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { NotificationItem } from "@/types";
import { NotificationFormFields } from "./NotificationFormFields";

interface EditNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: NotificationItem | null;
  onUpdate: (id: string, updates: Partial<NotificationItem>) => Promise<void>;
}

export function EditNotificationModal({
  isOpen,
  onClose,
  notification,
  onUpdate,
}: EditNotificationModalProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<string>("info");
  const [targetRole, setTargetRole] = useState<string>("all");
  const [link, setLink] = useState("");
  const [isRead, setIsRead] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (notification) {
      setTitle(notification.title);
      setMessage(notification.message);
      setType(notification.type);
      setTargetRole(notification.targetRole || "all");
      setLink(notification.link || "");
      setIsRead(notification.isRead);
    }
  }, [notification]);

  if (!notification) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await onUpdate(notification.id, {
        title: title.trim(),
        message: message.trim(),
        type,
        targetRole,
        link: link.trim() || undefined,
        isRead,
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Notification" maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-3.5">
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
        <div className="flex items-center gap-2 pt-1 text-xs">
          <input
            type="checkbox"
            id="edit-read-toggle"
            checked={isRead}
            onChange={(e) => setIsRead(e.target.checked)}
            className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="edit-read-toggle" className="font-semibold text-foreground cursor-pointer">
            Mark as already read
          </label>
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" size="sm" disabled={submitting}>
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
