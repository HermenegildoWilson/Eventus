function isEmpty(value) {
  return value === undefined || value === null || value === '';
}

function getMissingFields(data, requiredFields) {
  return requiredFields.filter((field) => isEmpty(data[field]));
}

module.exports = { isEmpty, getMissingFields };
