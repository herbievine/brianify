import type React from "react";
import { useFormik } from "formik";
import Field from "./Field";
import Button from "./Button";
import { useSongDataStore } from "../hooks/useSongDataStore";

interface ISongFormProps {
  onSubmit: (values: { title: string; artist: string }) => void;
}

const SongForm: React.FC<ISongFormProps> = ({ onSubmit }) => {
  const { songData, clearSongData } = useSongDataStore((s) => s);
  const { values, touched, errors, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        title: "",
        artist: "",
      },
      validateOnBlur: true,
      validate(values) {
        const errors: { title?: string; artist?: string } = {};

        if (values.title === "") {
          errors.title = "Title is required";
        }

        return errors;
      },
      onSubmit,
    });

  return (
    <div className="w-full flex flex-col">
      <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
        <div className="w-full flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <Field
            id="title"
            label="Song Title"
            value={values.title}
            placeholder="Black or White"
            hasError={touched.title && !!errors.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Field
            id="artist"
            label="Song Artist (optional)"
            value={values.artist}
            placeholder="Michael Jackson"
            hasError={touched.artist && !!errors.artist}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex justify-evenly items-center space-x-4">
          <Button label="Submit" type="submit" />
          {(songData.itunesId || songData.youtubeId) && (
            <Button onClick={clearSongData} label="Cancel" />
          )}
        </div>
        {/* <Button label="Submit" onClick={() => null} type="submit" /> */}
      </form>
    </div>
  );
};

export default SongForm;
