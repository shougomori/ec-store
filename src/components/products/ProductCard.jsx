import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import NoImage from '../../assets/img/src/no_image.png'
import { push } from "connected-react-router";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: 8,
      width: "calc(50% - 16px)",
    },
    [theme.breakpoints.up("sm")]: {
      margin: 16,
      width: "calc(33.3333% - 32px)",
    },
  },
  content: {
    display: "flex",
    padding: "16 8",
    textAlign: "left",
    "&:last-child": {
      paddingBottom: 16,
    },
  },

  media: {
    height: 0,
    paddingTop: "100%",
  },
  price: {
    color: theme.palette.secondary.dark,
    fontSize: 16,
  },
}));

const ProductCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const images = (props.images.length > 0) ? props.images : [{ path: NoImage }];
    const price = props.price.toLocaleString();
    

  return (
    <Card>
      <CardMedia image={props.images[0].path} className={classes.media} />
      <CardContent className={classes.content}>
        <Typography color="textSecondary" component="p">
          {props.name}
        </Typography>
        <Typography className={classes.price} component="p">¥{price}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
