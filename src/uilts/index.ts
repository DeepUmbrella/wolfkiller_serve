export const generateCaptchaCode = (length: number = 4): string => {
  let generateBaseNumberString = Math.random()
    .toString()
    .split('.')[1]
    .slice(0, length);
  const generateBaseNumberStringLength = generateBaseNumberString.length;
  if (generateBaseNumberStringLength < length) {
    for (let index = generateBaseNumberStringLength; index <= length; index++) {
      generateBaseNumberString =
        generateBaseNumberString + Math.floor(Math.random() * 10).toString();
    }
  }
  return generateBaseNumberString;
};
