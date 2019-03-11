import React from 'react';
import { multi } from '../../../lib/MultiLang';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PagingViewProps {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  maxItems: number;
  itemsByPage: number;
}

const PagingView = ({
  pageIndex,
  setPageIndex,
  maxItems,
  itemsByPage,
}: PagingViewProps) => {
  function onNext() {
    if (maxItems > (pageIndex + 1) * itemsByPage) {
      setPageIndex(pageIndex + 1);
    }
  }

  function onBack() {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  }

  return (
    <ButtonToolbar>
      <Button variant="light" onClick={onBack}>
        <FaArrowLeft />
      </Button>
      {pageIndex + 1}
      <Button variant="light" onClick={onNext}>
        <FaArrowRight />
      </Button>
    </ButtonToolbar>
  );
};

export default multi(PagingView);
