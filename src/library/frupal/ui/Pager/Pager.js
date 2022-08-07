import React, { useState, useEffect, useContext } from "react";
import { Token } from "../../modules/Authorization/Token";
import { Json } from "../../modules/Json";

const Pager = ({
  pageContents,
  url,
  type,
  pagination,
  buttonClass,
  previousButton,
  nextButton,
  className,
  enablePageOne,
}) => {
  const location = new URL(window.location);

  /* Pager types are similar to Drupal Views' approach and options are:
  1. mini; equivalent to mini-pager in views
  2. more; Simple adds the next list to the bottom of current items.
  3. infinite; extra type to allow infinite loading. Pagination count may be optionally specified.
  4. constant; Print a one time specified list.
  Since JsonApi pagination is an async call, full pager similar to Drupal Views isn't implemented at the moment for efficiency reason on my part.
  Default is always mini when none, or an unknown type is specified.
  */

  /* Props definations 
    pageContents: Data from server
    url: Destination Url to fetch data
    type: Pager Type. mini/ more/ infinite/ constant
    pagination: Number of data content per page
    buttonClass: Styling for pager button imported as CSS classes
    previousButton: Previous button label
    nextButton Next button label
    className: Pager UI CSS classes for styling
    enablePageOne: By default, "page=1" is ignored in url injection. Set prop as true to inject this in URL when on page one.
  */

  const { token } = useContext(Token);
  const [perPageCount, setPerPageCount] = useState(10);
  let pageParam = location.searchParams.has("page")
    ? location.searchParams.get("page") * 1
    : 0;
  const [pageNumber, setPageNumber] = useState(pageParam ? pageParam : 1);

  const [pagerer, setPagerer] = useState({
    direction: pageParam > 1 ? "+-" : "+",
    trigger: "",
  });
  const [pageContent, setPageContent] = useState({
    previous: "",
    current: "",
    next: "",
  });
  const [firstPagerFetch, setFirstPagerFetch] = useState(true);

  const [nextActive, setNextActive] = useState(false);
  const [previousActive, setPreviousActive] = useState(false);

  useEffect(() => {
    if (pagination) {
      setPerPageCount(pagination * 1);
    }
  }, [pagination]);

  const [offset, setOffset] = useState({
    number:
      pageParam && pageParam > 1
        ? pageParam * (pagination ? pagination : perPageCount) - 3
        : 0,
    direction: "next",
  });

  //construct pager
  const thisPager = url.includes("?")
    ? url + "&page[limit]=" + perPageCount
    : url + "?page[limit]=" + perPageCount;
  const thisOffset =
    offset.number > 0
      ? thisPager + "&page[offset]=" + offset.number
      : thisPager;

  //reset mounted pager and unrelated page navigation
  useEffect(() => {
    if (url) {
      //setOffset({ number: 0, direction: "next" });
      setFirstPagerFetch(true);
      //setPagerer({ direction: "+", trigger: "" });
    }
  }, [url]);

  //use to controll rerendering on useEffects
  //triggered by pagerer which has multiple dependencies
  //const [pagererRenderer, setPagererRenderer] = useState();

  //use to controll rerendering on useEffects
  //triggered by filterUpdateTrigger which has multiple dependencies
  //const [filterUpdateTriggerRenderer, setFilterUpdateTriggerRenderer] = useState();

  // Fetch data using Json() module
  useEffect(() => {
    let isMounted = true;
    const getContent = async () => {
      Json({
        endpoint: thisOffset,
        headers: { Authorization: "Bearer " + token.key },
      }).then((outputData) => {
        if (isMounted) {
          if (outputData && outputData.data) {
            if (pagerer.direction === "+-") {
              if (outputData.data.length > 0) {
                setPageContent({ previous: "", current: outputData, next: "" });
                setPagerer({ direction: "-+-", trigger: Date.now() });
                let offsetDiff = offset.number - perPageCount;
                setOffset({
                  number: offsetDiff > 0 ? offsetDiff : 0,
                  direction: "previous",
                });
                //setFirstPagerFetch(false);
              } else {
                setOffset({ number: 0, direction: "next" });
                setPagerer({ direction: "+", trigger: "" });
                setPageNumber(1);
              }
            } else if (pagerer.direction === "-+-") {
              let thisContent = pageContent;
              thisContent.previous = outputData;
              setPageContent(thisContent);
              setPagerer({ direction: "+", trigger: Date.now() });
              setOffset({
                number: offset.number + perPageCount * 2,
                direction: "previous-",
              });
              setPreviousActive(true);
              setFirstPagerFetch(false);
            } else if (
              pagerer.direction === "+" &&
              pagerer.trigger !== "" &&
              firstPagerFetch === false
            ) {
              let thisContent = pageContent;
              if (outputData.data.length > 0) {
                thisContent.next = outputData;
                setPageContent(thisContent);
                setNextActive(true);
              } else {
                //setOffset(offset.number - perPageCount);
                if (nextActive === true) {
                  setNextActive(false);
                }
              }
            } else if (
              pagerer.direction === "-" &&
              pagerer.trigger !== "" &&
              firstPagerFetch === false
            ) {
              let thisContent = pageContent;
              if (outputData.data.length >= 0 && offset.number >= 0) {
                thisContent.previous = outputData;
                setPageContent(thisContent);
                setPreviousActive(true);
              } else {
                //setOffset({ 'number': 0, 'direction': 'next' });
                if (previousActive === true) {
                  setPreviousActive(false);
                }
              }
            } else if (outputData.data.length >= 0 && firstPagerFetch) {
              setFirstPagerFetch(false);
              setPageContent({ previous: "", current: outputData, next: "" });
            }
            /* else {
              setFirstPagerFetch(true);
              console.log(firstPagerFetch);
              setPageContent({ previous: "", current: "", next: "" });
            } */
          }
        }
      });
    };
    getContent();

    return () => {
      isMounted = false;
    };
  }, [
    pagerer,
    firstPagerFetch,
    token,
    nextActive,
    offset.number,
    pageContent,
    previousActive,
    thisOffset,
    perPageCount,
  ]);

  //use to control rerendering on useEffects
  //triggered by pageContent which has multiple dependencies
  const [pageContentRenderer, setPageContentRenderer] = useState();
  useEffect(() => {
    if (pageContentRenderer !== pageContent) {
      if (type !== "constant") {
        if (pageContent.next) {
          setNextActive(true);
        } else {
          if (pagerer.trigger === "" && firstPagerFetch === false) {
            setPagerer({ direction: "+", trigger: Date.now() });
            setOffset({
              number: offset.number + perPageCount,
              direction: "next",
            });
          } else {
            setNextActive(false);
          }
        }
        if (pageContent.previous) {
          setPreviousActive(true);
        } else {
          setPreviousActive(false);
        }
      } else {
        setNextActive(false);
        setPreviousActive(false);
      }
      setPageContentRenderer(pageContent);
    }
  }, [
    pageContent,
    firstPagerFetch,
    offset.number,
    pagerer.trigger,
    perPageCount,
    pageContentRenderer,
    type,
  ]);

  const nextPage = () => {
    let offsetValue = "";
    if (offset.direction === "next" || offset.direction === "previous-") {
      offsetValue = offset.number + perPageCount;
    } else {
      offsetValue = offset.number + perPageCount * 3;
    }
    let currentContent = pageContent.current;
    let nextContent = pageContent.next;
    if (nextContent) {
      if (offset.direction === "previous") {
        setOffset({ number: offsetValue, direction: "previous-" });
      } else {
        setOffset({ number: offsetValue, direction: "next" });
      }
      //Control current depending on the type of pager.
      let pageCurrentList =
        type === "more"
          ? {
              data:
                currentContent.data && nextContent.data
                  ? currentContent.data.concat(nextContent.data)
                  : currentContent.data && !nextContent.data
                  ? currentContent.data
                  : !currentContent.data && nextContent.data
                  ? nextContent.data
                  : null,
              included:
                currentContent.included && nextContent.included
                  ? currentContent.included.concat(nextContent.included)
                  : currentContent.included && !nextContent.included
                  ? currentContent.included
                  : !currentContent.included && nextContent.included
                  ? nextContent.data
                  : null,
              jsonapi: nextContent.jsonapi ? nextContent.jsonapi : null,
              links: nextContent.links ? nextContent.links : null,
            }
          : nextContent;
      setPageContent({
        previous: currentContent,
        current: pageCurrentList,
        next: "",
      });
      setPagerer({ direction: "+", trigger: Date.now() });
      if (pageParam) {
        location.searchParams.set("page", pageNumber + 1);
      } else {
        location.searchParams.append("page", pageNumber + 1);
      }
      window.history.pushState({}, "", location);
      setPageNumber((current) => current + 1);
    }
  };

  const previousPage = () => {
    let offsetValue = "";
    if (offset.direction === "previous" || offset.direction === "next-") {
      offsetValue = offset.number - perPageCount;
    } else {
      offsetValue = offset.number - perPageCount * 3;
    }
    let currentContent = pageContent.current;
    let previousContent = pageContent.previous;
    if (offset.direction === "next") {
      setOffset({ number: offsetValue, direction: "next-" });
    } else {
      setOffset({ number: offsetValue, direction: "previous" });
    }

    if (previousContent) {
      setPageContent({
        previous: "",
        current: previousContent,
        next: currentContent,
      });
      setPagerer({ direction: "-", trigger: Date.now() });
      if (pageParam) {
        if (enablePageOne && pageParam > 1) {
          location.searchParams.set("page", pageNumber - 1);
        } else if (pageParam > 2) {
          location.searchParams.set("page", pageNumber - 1);
        } else {
          location.searchParams.delete("page");
        }
        window.history.pushState({}, "", location);
      }
      setPageNumber((current) => current - 1);
    }
  };
  //console.log(pageContent);
  //use to control rerendering on useEffects
  //triggered by pageContent which has multiple dependencies
  const [pageContentsRenderer, setPageContentsRenderer] = useState();
  useEffect(() => {
    if (pageContents && pageContentsRenderer !== pageContent) {
      if (pageContent && pageContent.current) {
        pageContents(pageContent.current);
      } else {
        pageContents();
      }
      setPageContentsRenderer(pageContent);
    }
  }, [pageContent, pageContents, pageContentsRenderer, type]);

  //console.log(pageContent.current)
  return pageContent &&
    pageContent.current &&
    (pageContent.next || pageContent.previous) ? (
    type === "more" ? (
      <nav className={className}>
        <button
          onClick={nextPage}
          disabled={nextActive === true ? false : true}
          className={buttonClass}
        >
          {nextButton ? nextButton : "More"}
        </button>
      </nav>
    ) : (
      <nav className={className}>
        <button
          onClick={previousPage}
          disabled={previousActive === true ? false : true}
          className={buttonClass}
        >
          {previousButton ? previousButton : "<"}
        </button>
        <span>{pageNumber}</span>
        <button
          onClick={nextPage}
          disabled={nextActive === true ? false : true}
          className={buttonClass}
        >
          {nextButton ? nextButton : ">"}
        </button>
      </nav>
    )
  ) : null;
};
export default Pager;
