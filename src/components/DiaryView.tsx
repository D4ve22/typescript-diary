import { useState } from "react";
import Filters from "./Filters";
import CreateView from "./CreateView";
import ListView from "./ListView";
import Entry from "../Entry";

export default function DiaryView() {
  const [entries, setEntries] = useState<Entry[]>(Entry.getEntries());
  const [currentEntryCount, setCurrentEntryCount] = useState<number>(0);
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);
  return (
    <>
      <div className="row">
        <div className="col d-flex align-items-center">
          Displaying {currentEntryCount} of {entries.length} total{" "}
          {entries.length == 1 ? "entry" : "entries"}
        </div>
        <div className="col">
          <Filters
            filterEnabled={filterEnabled}
            setFilterEnabled={setFilterEnabled}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <CreateView setEntries={setEntries} />
        </div>
      </div>
      <ListView
        entries={entries}
        setEntries={setEntries}
        filterEnabled={filterEnabled}
        setCurrentEntryCount={setCurrentEntryCount}
      />
    </>
  );
}
