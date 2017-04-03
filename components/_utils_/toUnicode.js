const toUnicode = (theString) => {
  let unicodeString = '';
  for (let i = 0; i < theString.length; i += 1) {
    let theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
    while (theUnicode.length < 4) {
      theUnicode = `0${theUnicode}`;
    }
    theUnicode = `\\${theUnicode}`;
    unicodeString += theUnicode;
  }
  return unicodeString;
};

export default toUnicode;
