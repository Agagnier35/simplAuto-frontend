import Carousel from 'react-bootstrap/Carousel'
import React from 'react';

interface CustomCarouselProps {
  items: string[]
}

interface CustomCarouselState {
  index: number
}

class CustomCarousel extends React.Component<CustomCarouselProps, CustomCarouselState> {
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
    let sources = ["https://theme.zdassets.com/theme_assets/22351/0a5c59c344538bf6ed384ba542670d4443357575.png"];
    if (this.props.items && this.props.items.length > 0) {
      sources = this.props.items;
    }
    return (
      <Carousel className="carousel" onChange={this.handleSelect} interval={0}>
        {sources.map(item => { return (<Carousel.Item> <img className="d-block w-100" src={item} /></Carousel.Item>) })}
      </Carousel>
    );
  }
}
export default CustomCarousel;