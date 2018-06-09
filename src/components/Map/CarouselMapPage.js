import React from 'react';
import Carousel from 'nuka-carousel';
import Mypic from '../../images/gifticon.png';
const DOMAIN = 'http://localhost:3000';

export default class CarouselMapPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dateTime: new Date()
    };
  }

  render() {
    const {images} = this.props

    // Show default image if no images from user
    if (images.length < 1) {
      return (
        <div className="text-center default_pic">
          <img width="300px" height="300px" className="rounded" src={Mypic}/>
        </div>
      )
    }

    return (
      <Carousel width="300px">
        {
          images.map(
            image => (
              <img key={image.id} width="300px" height="300px"
                className="rounded" src={`${DOMAIN}${image.photo_url}`}/>
            )
          )
        }
      </Carousel>);

  }
}
