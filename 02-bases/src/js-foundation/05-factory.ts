
// const { getUUID } = require('../plugins/get-id.plugin');
// const { getAge } = require('../plugins/get-age.plugin');
// const { getAge, getUUID } = require('../plugins');
interface buildMakePersonOptions {
  getUUID: () => string;
  getAge: (birthdate: string) => number;
}

interface personOptions {
  name: string;
  birthdate: string;
}

export const buildMakePerson = ({ getUUID, getAge }: buildMakePersonOptions) => {

  return ({ name, birthdate }:personOptions) => {

    return {
      id: getUUID(),
      name: name,
      birthdate: birthdate,
      age: getAge(birthdate),
    }
  }

}


// const obj = { name: 'John', birthdate: '1985-10-21' };

// const john = buildPerson( obj );


// console.log(john);
