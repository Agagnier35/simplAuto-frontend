import Carousel from 'react-bootstrap/Carousel'
class CustomCarousel extends React.Component {
  constructor(props: any, context: any) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
    };
  }
  handleSelect(selectedIndex: any) {
    this.setState({
      index: selectedIndex,
      });
  }

  render() {
    let sources = ["https://theme.zdassets.com/theme_assets/22351/0a5c59c344538bf6ed384ba542670d4443357575.png"];
    if (this.props.items != null)
    {
      sources = this.props.items;
    }
    return (
      <Carousel onChange={this.handleSelect} interval={false}>
        {sources.map(item => { return ( <Carousel.Item> <img className="d-block w-100"src={item}/></Carousel.Item> )})}
        </Carousel>
      );
  }
}
export default CustomCarousel;