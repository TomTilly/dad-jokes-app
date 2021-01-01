function checkStatusAndParse(res) {
  if (!res.ok)
    throw new Error(
      `Request to API failed. Status code: ${res.status} \n ${res.statusText}`
    );

  return res.json();
}

export { checkStatusAndParse };
