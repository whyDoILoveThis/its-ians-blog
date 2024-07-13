export const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
  };

 export const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  