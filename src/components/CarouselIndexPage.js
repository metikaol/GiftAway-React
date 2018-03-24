import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import Carousel from 'nuka-carousel';
import Mypic from './gifticon.png';
const DOMAIN = 'http://localhost:3000';

export default class CarouselIndexPage extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      dateTime: new Date()
    };
  }

  render() {
    console.log(this.props.images)
    const { images } = this.props
    console.log('image',images)

    if(images.length < 1){
      return (
      <div>
        <img width="250px" height="250px" src={Mypic} />
        {/* <img width="250px" height="250px" src="http://localhost:3001/src/components/gifticon.png" /> */}
      </div>
      )
    }

    return (
        <Carousel  width="250px" >
          {
            images.map(
              image => (
                  <img key={image.id} width="250px" height="250px" src={`${DOMAIN}${image.photo_url}`} />
              )
            )
          }
      </Carousel>
    );


  }
}
