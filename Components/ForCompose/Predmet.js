import styles from "./Predmet.module.css";
import { Input, InputWrapper, MultiSelect } from "@mantine/core";
export default function Predmet(props) {
  
  function handleSubmit(params) {
    params.preventDefault();
    props.handleSubmit(params, "predmety");
  }
  function handleNewTeacher(props){
    params.preventDefault();
    props.handleSubmit(params, "ucitele");
  }
  return (
    <div className={styles.predmet}>
      <InputWrapper id="" required label="Název předmětu">
        <Input id="" placeholder="např. Ekonomika" />
      </InputWrapper>
      <InputWrapper id="" required label="Popis předmětu">
        <Input id="" placeholder="např. ABCD" />
      </InputWrapper>
      <MultiSelect
        label="Vyučující"
        data={["Jan Brichta", " Julie Vidlařová", "Jiří Sedláček"]}
        placeholder="Select items"
        searchable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={handleNewTeacher}
      />
    </div>
  );
}
