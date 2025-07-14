import Entry from "../Entry";
import KeywordsField from "./KeywordsField";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemProps } from "./ListItem";

interface EditViewProps extends ListItemProps {
  toggleShowEdit: () => void;
}

export default function EditView(props: EditViewProps) {
  const [keywords, setKeywords] = useState<string[]>(props.entry.keywords);

  function handleDelete() {
    if (props.entry.delete()) {
      props.setEntries(Entry.getEntries());
      props.toggleShowEdit();
    }
  }

  function handleCancel() {
    props.setEntries(Entry.getEntries());
    props.toggleShowEdit();
  }

  function handleFormData(formData: FormData) {
    const title = formData.get("title") as string;
    const dateString = formData.get("date") as string;
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    date.setFullYear(year);
    const text = formData.get("text") as string;
    if (
      props.entry.update({
        title: title,
        text: text,
        date: date,
        keywords: keywords,
      })
    ) {
      props.setEntries(Entry.getEntries());
      props.toggleShowEdit();
    }
  }

  //Formatted date entry in format YYYY-MM-DD in correct timezone to use as default value for the form
  const formattedDate: string = new Date(
    props.entry.date.getTime() -
      props.entry.date.getTimezoneOffset() * 60 * 1000
  )
    .toISOString()
    .split("T")[0];

  return (
    <>
      <>
        <div className="card">
          <div className="card-body">
            <form className="row g-3" action={handleFormData}>
              <div className="col-6 d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-secondary card-link"
                  onClick={handleCancel}
                >
                  <ArrowBackIcon />
                </button>
              </div>
              <div className="col-6 text-end">
                <button type="submit" className="btn btn-primary card-link">
                  <SaveIcon />
                </button>
                <button
                  type="button"
                  className="btn btn-danger card-link"
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                </button>
              </div>

              <div className="col-8">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  id="title"
                  defaultValue={props.entry.title}
                />
              </div>
              <div className="col-4">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  id="date"
                  defaultValue={formattedDate}
                />
              </div>
              <div className="col-12">
                <label htmlFor="text" className="form-label">
                  Text
                </label>

                <textarea
                  className="form-control"
                  id="text"
                  name="text"
                  rows={5}
                  defaultValue={props.entry.text}
                ></textarea>
              </div>
              <div className="col-12">
                <label htmlFor="keywords" className="form-label">
                  Keywords
                </label>
                <KeywordsField
                  keywords={props.entry.keywords}
                  setKeywords={setKeywords}
                />
              </div>
            </form>
          </div>
        </div>
        <br />
      </>
    </>
  );
}
