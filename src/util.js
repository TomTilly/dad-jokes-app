function checkStatusAndParse(res) {
  if (!res.ok)
    throw new Error(`Request to API failed. Status code: ${res.status}`);

  return res.json();
}

export { checkStatusAndParse };
