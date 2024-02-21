import { useState } from "react";
import FormInput from "../../../core/components/FormInput";

interface IProps {
  update: (e: any) => void;
}

const ImportStoryForm = ({ update }: IProps) => {
  const [fileJson, setFileJson] = useState("");
  const [invalidJson, setInvalidJson] = useState("");

  const handleUpdate = (e: any) => {
    const value = e.target.value;
    setFileJson(value);
    update && update(value);
    try {
      JSON.parse(value);
      setInvalidJson("");
    } catch {
      setInvalidJson("JSON atual inválido!");
    }
  };

  return (
    <>
      <FormInput
        type="textarea"
        label=""
        field="fileJson"
        value={fileJson}
        rows={10}
        placeholder='{"story":"123456"}'
        onTextAreaChange={handleUpdate}
      />
      <span className="text-danger">{invalidJson}</span>
    </>
  );
};

export default ImportStoryForm;
