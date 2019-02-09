import React, { ReactNode } from 'react';
import Translations from './locales/types';

// Initialize the context
const MultiLangContext = React.createContext({});

const MultiLangConsumer = MultiLangContext.Consumer;

interface MultiLangProps {
  initialLocale: string;
  children: ReactNode;
}

interface MultiLangState {
  currentLocale: string;
}

export enum Languages {
  French = 'fr',
  English = 'en',
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other"
}

export interface MultiProps {
  translations: Translations;
  changeLocale: (locale: string) => void;
  currentLocale: string;
}

export default class MultiLang extends React.Component<
  MultiLangProps,
  MultiLangState
> {
  constructor(props: MultiLangProps) {
    super(props);
    this.state = {
      currentLocale: 'en',
    };

    this.changeLocale = this.changeLocale.bind(this);
  }

  componentDidMount() {
    const { initialLocale } = this.props;
    this.setState({ currentLocale: initialLocale });
  }

  changeLocale(language: Languages) {
    this.setState({ currentLocale: language });
  }

  public render() {
    const { children } = this.props;
    const { currentLocale } = this.state;
    const translations = require(`./locales/${currentLocale}.ts`);

    return (
      <MultiLangContext.Provider
        value={{ translations, currentLocale, changeLocale: this.changeLocale }}
      >
        {children}
      </MultiLangContext.Provider>
    );
  }
}

// HOC for exposing the translations
// Should be used 99% of the time
export const multi = (WrappedComponent: any) => (props: any) => {
  return (
    <MultiLangConsumer>
      {({ translations, currentLocale }: any) => (
        <WrappedComponent
          {...props}
          translations={translations}
          currentLocale={currentLocale}
        />
      )}
    </MultiLangConsumer>
  );
};

// HOC for exposing the translations and the updater function
// ** Only use when you need to change the locale
export const multiUpdater = (WrappedComponent: any) => (props: any) => {
  return (
    <MultiLangConsumer>
      {({ translations, changeLocale, currentLocale }: any) => (
        <WrappedComponent
          {...props}
          translations={translations}
          changeLocale={changeLocale}
          currentLocale={currentLocale}
        />
      )}
    </MultiLangConsumer>
  );
};
