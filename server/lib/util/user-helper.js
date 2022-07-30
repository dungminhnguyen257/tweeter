"use strict";

const Chance = require("chance"),
  chance = new Chance();

const md5 = require("md5");

module.exports = {
  generateRandomUser: () => {
    const gender = chance.gender();
    const firstName = chance.first({ gender: gender });
    const lastName = chance.last();
    const userName = firstName + " " + lastName;

    let userHandle = "@";
    if (Math.random() > 0.5) {
      let prefix = chance.prefix({ gender: gender });
      prefix = prefix.replace(".", "");
      userHandle += prefix;
    }

    userHandle += lastName;

    if (Math.random() > 0.5) {
      const suffix = Math.round(Math.random() * 100);
      userHandle += suffix;
    }

    const avatars = {
      Female: ["/images/simpson1.png", "/images/simpson3.png"],
      Male: ["/images/simpson2.png", "/images/simpson4.png"],
    };

    const avatarArray = avatars[gender];
    const userAvatar =
      avatarArray[Math.floor(Math.random() * avatarArray.length)];

    return {
      name: userName,
      handle: userHandle,
      avatars: userAvatar,
    };
  },
};
