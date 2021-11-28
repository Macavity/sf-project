import { SaveButton, Toolbar } from "react-admin";

export const StageCreateToolbar = (props: any) => (
  <Toolbar {...props} >
    <SaveButton
      label="Save"
      redirect="list"
      submitOnEnter={true}
    />
    <SaveButton
      label="Save and add"
      redirect={false}
      submitOnEnter={false}
      variant="text"
    />
  </Toolbar>
);
