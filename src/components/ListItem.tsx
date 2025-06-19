import { useState } from "react";
import EditView from "./EditView";
import EntryView from "./EntryView";
import Entry, { EntryProps } from "../Entry";

interface ListItemProps extends EntryProps {
  setEntries: (entries: Entry[]) => void;
}

export default function ListItem(props: ListItemProps) {
  const [showEdit, setShowEdit] = useState(false);

  function toggleShowEdit(): void {
    setShowEdit((prev) => !prev);
  }

  return (
    <>
      {showEdit ? (
        <EditView {...props} toggleShowEdit={toggleShowEdit} />
      ) : (
        <EntryView {...props} toggleShowEdit={toggleShowEdit} />
      )}
    </>
  );
}

export type { ListItemProps };
