import { Typography } from "@mui/material"
import { initBackButton } from "@telegram-apps/sdk";

const Task = () => {
  const [backButton] = initBackButton();
  backButton.show();
  return <Typography variant="h3" component="p">Coming soon!</Typography>
}

export default Task