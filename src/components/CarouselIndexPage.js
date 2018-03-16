import React from 'react';
import Carousel from 'nuka-carousel';
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
      <img width="250px" height="250px" src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1" />
      </div>
      )
    }

    return (
        <Carousel  width="250px" >
          {
            images.map(
              image => (
                  <img  width="250px" height="250px" src={`${DOMAIN}${image.photo_url}`} />
              )
            )
          }
      </Carousel>
    );


  }
}
