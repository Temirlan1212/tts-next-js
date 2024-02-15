// export const imageToText = async ({ file }: { file: File }) => {
//   const formData = new FormData();
//   formData.append("image", file);
//   const response = await fetch("http://35.184.61.173/api/v1/image/", {
//     method: "POST",
//     body: formData,
//   });

//   console.log(await response.json());
//   return await response.json();
// };

export const imageToText = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch("/api/generate/image-to-text", {
    method: "POST",
    body: formData,
  });

  return await response.json();
};
