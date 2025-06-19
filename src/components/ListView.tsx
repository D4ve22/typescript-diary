import ListItem from "./ListItem";
import Entry from "../Entry";
import { useEffect, useState } from "react";

interface ListViewProps {
  entries: Entry[];
  setEntries: (entries: Entry[]) => void;
  filterEnabled: boolean;
  setCurrentEntryCount: (count: number) => void;
}

export default function ListView(props: ListViewProps) {
  const [limit, setLimit] = useState<number>(5);

  function loadMoreEntries() {
    if (!allItemsDisplayed) {
      setLimit((prev) => prev + 5);
    }
  }

  let listElements = props.entries
    .filter((entry) => !props.filterEnabled || entry.isFavorite)
    .map((entry) => {
      return (
        <ListItem key={entry.id} entry={entry} setEntries={props.setEntries} />
      );
    });

  const allItemsDisplayed = limit >= listElements.length;
  listElements = listElements.slice(0, limit);

  useEffect(() => {
    props.setCurrentEntryCount(listElements.length);
  }, [listElements.length]);

  return (
    <>
      <>{listElements}</>
      <div className="text-center">
        {!allItemsDisplayed ? (
          <button
            className="btn btn-primary card-link"
            onClick={loadMoreEntries}
          >
            Load older entries
          </button>
        ) : (
          <></>
        )}
      </div>
      <br />
    </>
  );
}
