import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin:10
  },
});

export default function ContentCard({post}) {
  const classes = useStyles();
  const PF = "http://localhost:5000/images/";
  return (
    <Card  className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={PF+post.img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.desc.substring(0,200)}
          </Typography> 
          <Typography variant="body2"  component="p">
            {new Date(post.createdAt).toDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link className="link"  to={`/post/${post._id}`}>
        <Button size="small" color="primary">
          Learn More
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
