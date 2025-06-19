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
          placeholder="Add new keywords by pressing enter..."
          className="form-control"
        />
      )}
    />
  );
}
