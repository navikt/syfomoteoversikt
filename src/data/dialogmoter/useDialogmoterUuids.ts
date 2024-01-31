import { useState } from "react";

export function useDialogmoterUuids() {
  const [dialogmoterUuids, setDialogmoterUuids] = useState<string[]>([]);
  const removeDialogmoteUuid = (dialogmoteUuidToRemove: string) => {
    setDialogmoterUuids(() =>
      dialogmoterUuids.filter((uuid) => uuid !== dialogmoteUuidToRemove)
    );
  };

  const modifyDialogmoterUuids = (dialogmoteUuid: string) => {
    if (isSelected(dialogmoteUuid)) {
      removeDialogmoteUuid(dialogmoteUuid);
    } else {
      setDialogmoterUuids(() => [...dialogmoterUuids, dialogmoteUuid]);
    }
  };

  const isSelected = (dialogmoteUuid: string): boolean => {
    return dialogmoterUuids.includes(dialogmoteUuid);
  };

  return {
    dialogmoterUuids,
    modifyDialogmoterUuids,
    isSelected,
  };
}
