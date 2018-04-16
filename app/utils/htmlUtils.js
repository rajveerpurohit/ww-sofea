export const addClass = (element, className) => {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ' ' + className;
  }
};
export const removeClass = (element, className) => {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

export const getScript = (url, callback) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  // most browsers;
  script.onload = callback;
  // IE 6 & 7
  script.onreadystatechange = function () { 
    if (this.readyState == 'complete') {
      callback();
    }
  };
  document.getElementsByTagName('head')[0].appendChild(script);
};
