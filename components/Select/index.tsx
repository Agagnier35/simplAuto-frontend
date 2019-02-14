import React from 'react';
import { Dropdown as BootStrapDropdown } from 'react-bootstrap';
import { multi, MultiProps } from '../../lib/MultiLang';
import Translations from '../../lib/MultiLang/locales/types';

export interface SelectProps {
  options: any[]; // What is being looped on
  handleChange: (...params: any) => void; // Function called when an element is clicked
  accessor: string; // The key of the item to display in the list items
  label: string; // The value of the hovering label
  disabled: boolean; // Blocks input if true
  translations: Translations;
}

interface SelectState {
  selectedValue: string;
}

class Select extends React.Component<SelectProps & MultiProps, SelectState> {
  state = {
    selectedValue: '',
  };

  handleSelect = (option: any) => {
    const { accessor, handleChange } = this.props;
    this.setState({ selectedValue: option[accessor] }, () => {
      handleChange(option);
    });
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
            {selectedValue.length > 0 ? selectedValue : general.defaultDropdown}
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