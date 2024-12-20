export const removeProtocols = (url) => {
  return url.replace(/^https?\:\/\//i, "");
};

export const nutralizeTitle = (title) => {
  return title
    .toLocaleLowerCase()
    .split(" ")
    .join("-")
    .replace(/[.*+?^$/{}()!%#>@=:;'|[\]\\]/g, "");
};

export const getBase64 = () => {
  const file = event.target.files[0];
  if (typeof file === "undefined") return;

  // setImg(event.target.files[0]);

  let self = this;

  let reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function () {
    // // console.log(reader.result);
    setBase64(reader.result);
  };
  reader.onerror = function (error) {
    // // console.log("Error: ", error);
  };
};
