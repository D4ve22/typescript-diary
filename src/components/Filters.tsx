import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

interface FilterProps {
  filterEnabled: boolean;
  setFilterEnabled: (filterEnabled: boolean) => void;
}

export default function Filters(props: FilterProps) {
  function handleChange() {
    props.setFilterEnabled(!props.filterEnabled);
  }
  return (
    <div className="text-end">
      <FormControlLabel
        control={
          <Switch checked={props.filterEnabled} onChange={handleChange} />
        }
        label="Show only favorites"
      />
    </div>
  );
}
