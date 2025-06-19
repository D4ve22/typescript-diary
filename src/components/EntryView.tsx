import { useState } from "react";
import Entry, { EntryProps } from "../Entry";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { ListItemProps } from "./ListItem";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface EntryViewProps extends ListItemProps {
  toggleShowEdit: () => void;
}

const dateFormatter = new Intl.DateTimeFormat("de-DE");

export default function EntryView(props: EntryViewProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const expandable = props.entry.text.length > 250;

  function toggleExpanded() {
    setExpanded((prev) => !prev);
  }

  function toggleFavorite(): void {
    if (props.entry.toggleFavorite()) {
      props.setEntries(Entry.getEntries());
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <h5 className="card-title">{props.entry.title}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Created on {dateFormatter.format(props.entry.date)}
              </h6>
            </div>
            <div className="col-6 text-end">
              <button
                className="btn btn-primary card-link"
                onClick={props.toggleShowEdit}
              >
                <EditIcon />
              </button>
              <button
                className={
                  props.entry.isFavorite
                    ? "btn btn-danger card-link"
                    : "btn btn-secondary card-link"
                }
                onClick={toggleFavorite}
              >
                {props.entry.isFavorite ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </button>
            </div>
          </div>
          <div className="row">
            <Stack direction="row" spacing={1}>
              {props.entry.keywords.map((keyword, index) => (
                <Chip
                  key={index}
                  label={keyword}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Stack>
          </div>
          <br />
          <div className="row">
            <p className="card-text">
              {expandable && !expanded
                ? props.entry.text.slice(0, 250) + "..."
                : props.entry.text}
            </p>
          </div>
          <div className="row text-center">
            {expandable ? (
              <IconButton size="small" onClick={toggleExpanded}>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export type { EntryProps };
