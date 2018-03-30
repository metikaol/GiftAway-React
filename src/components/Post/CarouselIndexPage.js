import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import Carousel from 'nuka-carousel';
import Mypic from '../../images/gifticon.png';
const DOMAIN = 'http://localhost:3000';

export default class CarouselIndexPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dateTime: new Date()
    };
  }

  render() {
    // console.log(this.props.images)
    const {images} = this.props
    // console.log('image',images)

    if (images.length < 1) {
      return (<div className="text-center default_pic">
        <img width="100%" height="280px" className="rounded" src={Mypic}/>
      </div>)
    }

    if (images.length === 1) {
      const url = `url(${DOMAIN}${images[0].photo_url})`
      return (<div className="text-center default_pic">
        <div style={{
            width: "100%",
            height: "280px",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundImage: url
          }}/>

      </div>)
    }

    return (<Carousel width="100%">
      {images.map(image => (<img key={image.id} width="410px" height="280px" className="rounded" src={`${DOMAIN}${image.photo_url}`}/>))}
    </Carousel>);

  }
}
