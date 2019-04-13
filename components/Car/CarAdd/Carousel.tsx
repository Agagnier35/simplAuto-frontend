import Carousel from 'react-bootstrap/Carousel';
import React from 'react';

interface CustomCarouselProps {
  items: string[];
}

interface CustomCarouselState {
  index: number;
}

class CustomCarousel extends React.Component<
  CustomCarouselProps,
  CustomCarouselState
> {
  constructor(props: any, context: any) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
    };
  }
  handleSelect() {
    this.setState({
      index: 0,
    });
  }

  render() {
    return (
      <Carousel className="carousel" onChange={this.handleSelect} interval={0}>
        {this.props.items.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={item} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
}
export default CustomCarousel;
