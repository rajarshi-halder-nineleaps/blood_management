export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
export const phoneRegex = /^\d{10}$/;
export const otpRegex = /^\d{6}$/;
export const pincodeRegex = /^\d{6}$/;
export const emptyPincodeRegex = /^(\d{0}|\d{6})$/;
export const numbersOnlyRegex = /^[0-9]+$/;
export const decimalRegex = /\b\d+|\d+[.]\d{2}/;
// export const decimalRegex = /^\d+[.]\d{2}$/;
//* MAY OR MAY NOT HAVE A DECIMAL, BUT IF IT HAS A DECIMAL IT SHOULD ONLY HAVE 2 DIGITS AFTERWARDS.
// export const decimalRegex = /^[0-9]+(\.[0-9][0-9]?)?$/;
