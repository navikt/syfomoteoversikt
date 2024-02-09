import { useState } from "react";

export function useDialogmoterUuids() {
  const [dialogmoterUuids, setDialogmoterUuids] = useState<string[]>([]);

  function modifyDialogmoterUuids(dialogmoteUuid: string) {
    if (isSelected(dialogmoteUuid)) {
      setDialogmoterUuids(
        dialogmoterUuids.filter((uuid) => uuid !== dialogmoteUuid)
      );
    } else {
      setDialogmoterUuids(() => [...dialogmoterUuids, dialogmoteUuid]);
    }
  }

  function isSelected(dialogmoteUuid: string): boolean {
    return dialogmoterUuids.includes(dialogmoteUuid);
  }

  function clearSelected(): void {
    setDialogmoterUuids([]);
  }

  return {
    dialogmoterUuids,
    modifyDialogmoterUuids,
    isSelected,
    clearSelected,
  };
}
