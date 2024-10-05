import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function UpgradeCard({ img, title, desc, buttonClick }) {
  return (
    <Card sx={{ backgroundColor: "#181818", color: "#fff", borderRadius: "20px" }}>
      <CardMedia
        component="img"
        alt={title || "Image"}
        height="120"
        image={img || "/noupgrade.png"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{color: "#fff", textWrap: "nowrap"}}>
          {title || "Default Title"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#fff" }}>
          {desc || "Default description"}
        </Typography>
      </CardContent>
      <CardActions>
        <button style={{backgroundColor: "#fff", color: "#000", width: '50%', height: "4vh", border: "none", borderRadius: "3vw"}} onClick={buttonClick}>КУПИТЬ</button>
      </CardActions>
    </Card>
  );
}
