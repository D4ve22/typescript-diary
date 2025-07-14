import { Autocomplete, Chip, TextField } from "@mui/material";
import Entry from "../Entry";

interface KeywordsFieldProps {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

export default function KeywordsField(props: KeywordsFieldProps) {
  return (
    <Autocomplete
      id="keywords"
      multiple
      options={Entry.getAllKeywords()}
      defaultValue={props.keywords}
      // Updates the keywords value in the EditView
      onChange={(_, value) => props.setKeywords(value)}
      freeSolo
      renderValue={(value: readonly string[], getItemProps) =>
        value.map((option: string, index: number) => {
          const { key, ...itemProps } = getItemProps({ index });
          return (
            <Chip label={option} variant="outlined" key={key} {...itemProps} />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Type keyword and press Enter..."
          className="form-control"
          // Prevents the submit of the form when user presses enter while in text field
          // Implemented to prevent unintentional submit behavior, when user presses enter without entering keyword
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
            }
          }}
        />
      )}
    />
  );
}
