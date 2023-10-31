export const convertToBase64 = (fileList) => {

  const file = fileList[0]

    return new Promise((resolve, reject) => {


      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };