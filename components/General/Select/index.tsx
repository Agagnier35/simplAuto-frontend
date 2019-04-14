import React from 'react';
import { Dropdown as BootStrapDropdown } from 'react-bootstrap';
import { multi, MultiProps } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';

export interface SelectProps extends MultiProps {
  options: any[]; // What is being looped on
  handleChange: (...params: any) => void; // Function called when an element is clicked
  accessor: string; // The key of the item to display in the list items
  label: string; // The value of the hovering label
  disabled: boolean; // Blocks input if true
  defaultValue?: any; // Default value
  translations: Translations;
  reset?: boolean;
  selected?: any; // Initial selected object
}

interface SelectState {
  selectedValue: string;
  resetValue: boolean;
}

class Select extends React.Component<SelectProps, SelectState> {
  constructor(props: SelectProps) {
    super(props);
    if (this.props.selected) {
      if (this.props.reset) {
        this.state = {
          selectedValue: this.props.selected[this.props.accessor],
          resetValue: this.props.reset,
        };
      } else {
        this.state = {
          selectedValue: this.props.selected[this.props.accessor],
          resetValue: false,
        };
      }
    } else if (this.props.reset) {
      this.state = {
        selectedValue: '',
        resetValue: true,
      };
    } else {
      this.state = {
        selectedValue: '',
        resetValue: false,
      };
    }
  }

  componentDidUpdate(prevProps: SelectProps) {
    if (
      prevProps &&
      prevProps.selected &&
      prevProps.selected !== this.props.selected &&
      this.state.resetValue
    ) {
      this.setState({ selectedValue: '' });
    }
  }

  handleSelect = (option: any) => {
    const { accessor, handleChange } = this.props;
    if (option['id'] !== '0') {
      this.setState({ selectedValue: option[accessor] }, () => {});
    } else {
      this.setState({ selectedValue: '' });
    }
    handleChange(option);
  };

  public render() {
    const {
      label,
      options,
      accessor,
      disabled,
      translations: { general },
    } = this.props;
    const { selectedValue } = this.state;

    return (
      <label>
        {label}
        <BootStrapDropdown>
          <BootStrapDropdown.Toggle
            disabled={disabled}
            variant="secondary"
            id="dropdown-basic"
          >
            {console.log('this.props')}
            {console.log(this.props)}
            {selectedValue !== ''
              ? selectedValue
              : this.props.defaultValue
              ? this.props.defaultValue.name
              : general.defaultDropdown}
          </BootStrapDropdown.Toggle>
          <BootStrapDropdown.Menu>
            {options.map((option, index) => (
              <BootStrapDropdown.Item
                key={index}
                onClick={() => this.handleSelect(option)}
              >
                {option[accessor]}
              </BootStrapDropdown.Item>
            ))}
          </BootStrapDropdown.Menu>
        </BootStrapDropdown>
      </label>
    );
  }
}

export default multi(Select);
