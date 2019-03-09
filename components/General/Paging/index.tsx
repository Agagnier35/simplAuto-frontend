import React, { useState } from 'react';
import { multi } from '../../../lib/MultiLang';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PagingViewProps {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  maxItems: number;
  itemsByPage: number;
}

const PagingView = ({
  setPageIndex,
  maxItems,
  itemsByPage,
}: PagingViewProps) => {
  const [pageNumber, setPageNumber] = useState(1);

  let pageTracker = 1;

  function onNext() {
    if (maxItems > pageNumber * itemsByPage) {
      pageTracker = pageNumber + 1;
      setPageIndex(pageTracker - 1);
      setPageNumber(pageTracker);
    }
  }

  function onBack() {
    if (pageNumber > 1) {
      pageTracker = pageNumber - 1;
    }
    setPageIndex(pageTracker - 1);
    setPageNumber(pageTracker);
  }

  return (
    <ButtonToolbar>
      <Button variant="light" onClick={onBack}>
        <FaArrowLeft />
      </Button>
      {pageNumber}
      <Button variant="light" onClick={onNext}>
        <FaArrowRight />
      </Button>
    </ButtonToolbar>
  );
};

export default multi(PagingView);
