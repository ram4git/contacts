export function formatPhoneNumber(phone) {
  phone = phone.replace(/[^\d]/g, '')
  if (phone.length == 10) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
  }
  return null
}

export function sortAlphabetically(sortField) {
  return function (a, b) {
    if (a[sortField] < b[sortField]) {
      return -1
    }
    if (a[sortField] > b[sortField]) {
      return 1
    }
    return 0
  }
}
