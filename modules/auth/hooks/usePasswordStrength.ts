import { useState } from 'react';

export enum PASSWORD_STRENGTH {
  weak = 'Very Weak',
  fair = 'Weak',
  average = 'Medium',
  good = 'Strong',
  strong = 'Very Strong',
}

export const PASSWORD_VALIDATION: {
  general: RegExp;
  letters: RegExp;
  numeric: RegExp;
  specialChars: RegExp;
  numberOfChars: RegExp;
  length: RegExp;
} = {
  general: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
  letters: /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]+/g,
  numeric: /[0-9]/g,
  specialChars: /[^\w\s]/g, // /[#?!@$%^&*-]/g
  numberOfChars: /.{8,}/g,
  length: /.{12,}/g,
};

export type PasswordTracker = {
  letters: RegExpMatchArray | null;
  number: RegExpMatchArray | null;
  specialChar: RegExpMatchArray | null;
  eightCharsOrGreater: RegExpMatchArray | null;
  long: RegExpMatchArray | null;
};

export function usePasswordStrength() {
  const [password, setPassword] = useState<string>('');
  const [meter, setMeter] = useState<boolean>(false);

  const passwordTracker: PasswordTracker = {
    letters: password.match(PASSWORD_VALIDATION.letters),
    number: password.match(PASSWORD_VALIDATION.numeric),
    specialChar: password.match(PASSWORD_VALIDATION.specialChars),
    eightCharsOrGreater: password.match(PASSWORD_VALIDATION.numberOfChars),
    long: password.match(PASSWORD_VALIDATION.length),
  };

  const passwordStrength: number = Object.values(passwordTracker).filter(
    (value) => value,
  ).length;

  const passwordMessage = () => {
    switch (passwordStrength) {
      case 1:
        return PASSWORD_STRENGTH.weak;
      case 2:
        return PASSWORD_STRENGTH.fair;
      case 3:
        return PASSWORD_STRENGTH.average;
      case 4:
        return PASSWORD_STRENGTH.good;
      case 5:
        return PASSWORD_STRENGTH.strong;
      default:
        return '';
    }
  };

  return {
    meter,
    passwordStrength,
    passwordTracker,
    passwordMessage,
    setMeter,
    setPassword,
  };
}
