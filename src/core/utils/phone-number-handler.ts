import { CountryCode, getCountryCallingCode } from "libphonenumber-js";

export const phoneNumberFormatter = ({ phone, countryCode }: { phone: string, countryCode: string }) => {
    const countryDialCode = getCountryCallingCode(
        countryCode as CountryCode
    );

    const phoneWithoutZero = phone.startsWith("0")
        ? phone.slice(1)
        : phone;

    const formattedNumber = `00${countryDialCode}${phoneWithoutZero}`;
    
    return formattedNumber;
};