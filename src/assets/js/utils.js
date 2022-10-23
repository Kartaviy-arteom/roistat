export function onlyNumbers(val) {
    return val
        .toString()
        .replace(/\D/g, '');
}

export function prettyPhone(rawPhoneNumber) {
    return onlyNumbers(rawPhoneNumber).replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
}
