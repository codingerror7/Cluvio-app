import React from "react";
import Button from "./Button";
import Card from "./Card";

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }) => {
  return (
    <Card interactive={false} className="p-8 text-center border border-dashed border-[var(--border-strong)] bg-[var(--surface-strong)]/40 rounded-[var(--radius-lg)]">
      {Icon && (
        <div className="icon-tile mx-auto mb-4 border border-dashed border-[var(--border-strong)]">
          <Icon size={20} className="text-[var(--muted)]" />
        </div>
      )}
      <h3 className="text-base font-semibold text-[var(--foreground)]">{title}</h3>
      {description && <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[var(--muted)]">{description}</p>}
      {actionLabel && (
        <Button size="sm" className="mt-5 sm:w-auto" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};

export default EmptyState;
