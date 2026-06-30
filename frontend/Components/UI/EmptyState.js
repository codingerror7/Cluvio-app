import React from "react";
import Button from "./Button";
import Card from "./Card";

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }) => {
  return (
    <Card interactive={false} className="p-8 text-center">
      {Icon && (
        <div className="icon-tile mx-auto mb-5">
          <Icon size={22} />
        </div>
      )}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      {description && <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/58">{description}</p>}
      {actionLabel && (
        <Button className="mt-6 sm:w-auto" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};

export default EmptyState;
