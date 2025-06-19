import { useState } from "react";
import Entry from "../Entry";
import EditView from "./EditView";
import PostAddIcon from "@mui/icons-material/PostAdd";

interface CreateViewProps {
  setEntries: (entries: Entry[]) => void;
}

export default function CreateButton(props: CreateViewProps) {
  const [newEntry, setNewEntry] = useState<Entry | undefined>(undefined);

  function handleNewEntry(): void {
    setNewEntry(
      Entry.createEntry(
        "New entry",
        "This is the standard description of the new entry",
        new Date(),
        []
      )
    );
  }

  function toggleShowEdit() {
    setNewEntry(undefined);
  }

  return (
    <>
      {newEntry ? (
        <EditView
          entry={newEntry}
          toggleShowEdit={toggleShowEdit}
          setEntries={props.setEntries}
        />
      ) : (
        <>
          <button className="btn btn-primary w-100" onClick={handleNewEntry}>
            <PostAddIcon />
          </button>
          <br />
          <br />
        </>
      )}
    </>
  );
}
