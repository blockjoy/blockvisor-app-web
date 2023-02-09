import { faker } from '@faker-js/faker/locale/en_US';

export function generateOrganizationName() {
  return faker.company.name();
}

export function generateUserRegistrationData() {
  return {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
  };
}
