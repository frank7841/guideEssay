import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// import Select, { SelectChangeEvent } from '@mui/material/Select';

interface PROPS {
  subject: { academicLevel: string; _id: string; amount: string };
}
export default function PriceCard(props: PROPS) {
  const { subject } = props;
  // const [essay, setEssay] = React.useState('');

  // const handleChange = (event: SelectChangeEvent) => {
  //   setEssay(event.target.value);
  // };
  return (
    <Card sx={{ minWidth: 250, borderRadius: 4 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 20, fontWeight: "bold" }}
          color="text.black"
          gutterBottom
        >
          Academic Level
        </Typography>
        <Typography
          sx={{ fontSize: 24, fontWeight: "bold" }}
          color="text.##00aaee"
          gutterBottom
        >
          {subject.academicLevel}
        </Typography>
        <div className="flex flex-col">
          <List component="nav" aria-label="mailbox folders">
            <ListItem button>
              {/* <ListItemText primary="14 days" /> */}
              <ListItemText primary={`$${subject.amount}`} />
            </ListItem>
          </List>
        </div>
      </CardContent>
    </Card>
  );
}
