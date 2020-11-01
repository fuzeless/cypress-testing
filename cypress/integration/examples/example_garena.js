function garenaTesting(purpose, username, password, email, retype_password = password, expect_test_success, location = 'VN', is_agree_eula = true) {
  const url = 'https://sso.garena.com/ui/register?locale=vi';

  it(purpose, () => {
    cy.visit(url);

    if (username !== '') {
      cy.get('#sso_register_form_account')
        .type(username);
    } else {
      cy.get('#sso_register_form_account')
        .focus()
        .blur();
    }

    if (password !== '') {
      cy.get('#sso_register_form_password')
        .type(password);
    } else {
      cy.get('#sso_register_form_password')
        .focus()
        .blur();
    }

    if (retype_password !== '') {
      cy.get('#sso_register_form_password_confirm')
        .type(retype_password);
    } else {
      cy.get('#sso_register_form_password_confirm')
        .focus()
        .blur();
    }

    if (email !== '') {
      cy.get('#sso_register_form_email')
        .type(email);
    } else {
      cy.get('#sso_register_form_email')
        .focus()
        .blur();
    }

    cy.get('#sso_register_form_select_country')
      .select(location);
    if (is_agree_eula) {
      cy.get('#line-terms > a')
        .click()
    }
    // cy.get('#confirm-btn')
    //   .click();

    if (expect_test_success) {
      cy.get('#msg')
        .should('not.exist');
    } else {
      cy.get('#msg')
        .should('exist');
    }
  })
}

describe('All fields are correct', () => {
  garenaTesting(
    'All fields are correct',
    'larwioerd1212',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    true,
  )
});

describe('All fields are empty', () => {
  garenaTesting(
    'All fields are empty',
    '',
    '',
    '',
    '',
    false,
  )
})

describe('One empty field', () => {
  garenaTesting(
    'Username empty',
    '',
    'samplePassd12!',
    'lmdsdapw@gmail.com',
    undefined,
    false,
  )
  garenaTesting(
    'Password empty',
    'opweaeprew',
    '',
    'lewewqspw@gmail.com',
    undefined,
    false,
  )
  garenaTesting(
    'Retype Password empty',
    'opeewewqwtoprew',
    'samplePassd12!',
    'ldsadwpw@gmail.com',
    '',
    false,
  )
  garenaTesting(
    'Email empty (optional field)',
    'opedsadwwew',
    'samplePassd12!',
    '',
    undefined,
    true,
  )
});

describe('Check minimum character for each fields', () => {
  garenaTesting(
    'Username field (5 characters)',
    'p01kd',
    'SalmplePass12!',
    'poewlkqo@gmail.com',
    undefined,
    false
  )
  garenaTesting(
    'Username field (6 characters (minimum))',
    'p01kdo',
    'SalmplePass12!',
    'poewlkqo@gmail.com',
    undefined,
    true
  )
  garenaTesting(
    'Username field (7 characters)',
    'p01kdos',
    'SalmplePass12!',
    'poewlkqo@gmail.com',
    undefined,
    true
  )
  garenaTesting(
    'Password field (7 characters)',
    'p01kdo',
    'LoS!mnE',
    'poewlkqo@gmail.com',
    undefined,
    false
  )
  garenaTesting(
    'Password field (8 characters (minimum))',
    'p01kdo',
    'LoS!mnEe',
    'poewlkqo@gmail.com',
    undefined,
    true
  )
  garenaTesting(
    'Password field (9 characters)',
    'p01kdo',
    'LoS!mnEe0',
    'poewlkqo@gmail.com',
    undefined,
    true
  )
})

describe('Check maximum character for each fields', () => {
  garenaTesting(
    'Username field (14 characters)',
    'iryn97jh08nciw',
    'Simple1!',
    'jsofja@gmail.com',
    undefined,
    true,
  )

  garenaTesting(
    'Username field (15 characters)',
    'iryn97jh08nciw3',
    'Simple1234!',
    'hofhasojda@gmail.com',
    undefined,
    true,
  )

  garenaTesting(
    'Username field (16 characters)',
    'iryn97jh08nciwas',
    'Simple1!',
    'jsofja@gmail.com',
    undefined,
    false,
  )
})

describe('Username field testing', () => {
  garenaTesting(
    'All letters',
    'lastewrder',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    true,
  )

  garenaTesting(
    'All numbers',
    '1234795873',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'One character only',
    'p',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'One character and one number',
    'p1',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'One character and one special character',
    'p!',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Letters and numbers mix',
    'djksjk121o012',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    true,
  )

  garenaTesting(
    'Username contains a space',
    'abcisa hsi',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Username contains a period at the end',
    'abc123hfisa.',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Username contains a period at the middle',
    'abc123.hfisa',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    true,
  )

  garenaTesting(
    'Username contains a period at the begin',
    '.abc123hfisa',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Username contains a dash at the middle',
    'kldskds-poqo',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    true,
  )

  garenaTesting(
    'Username contains a dash at the end',
    'abc123xyz-',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Username contains a dash at the begin',
    '-abc123xyz',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Username contains a plus at the middle',
    '123+salwabc',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Username contains a plus at the begin',
    '+123789abc',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Username contains a plus at the end',
    '123789abc+',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Username contains a slash char at the middle',
    'abc/123xyz',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Username contains a slash char at the begin',
    '/abc123xyz',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Username contains a slash char at the end',
    'abc/123xyz/',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Username contains a underscore at the end',
    'abc123xyz_',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Username contains a underscore at the middle',
    'opqqw_ksjdksja',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    true,
  )

  garenaTesting(
    'Username contains a underscore at the begin',
    '_abc123xyz',
    'saAeR21!.',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'UTF-8 characters',
    `ếôấưăấặầôươ`,
    'La!2rd1212',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Special characters only (1)',
    `!@#$%^&*()-=[]`,
    'sadowei!Q12',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )

  garenaTesting(
    'Special characters only (2)',
    `+_{}":><,.;'`,
    'sadowei!Q12',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )
})

describe('Password field testing', () => {
  garenaTesting(
    'All letters (Lowercase) (1)',
    'larwioerd1212',
    'qwertyuiopasdf',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )
  garenaTesting(
    'All letters (Lowercase) (2)',
    'larwioerd1212',
    'ghjklzxcvbnm',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )
  garenaTesting(
    'All letters (Uppercase) (1)',
    'larwioerd1212',
    'QWERTYUIOPASDF',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )
  garenaTesting(
    'All letters (Uppercase) (2)',
    'larwioerd1212',
    'GHJKLZXCVBNM',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )
  garenaTesting(
    'Lowercase and Uppercase mixed',
    'larwioerd1212',
    'lOspWerRTLFoW',
    'opqrewepwlqe@gmail.com',
    undefined,
    true,
  )
  garenaTesting(
    'One character',
    'larwioerd1212',
    'A',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )
  garenaTesting(
    'All numbers',
    'larwioerd1212',
    '111111111111',
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )
  garenaTesting(
    'Numbers mixed with lowercase letters',
    'larwioerd1212',
    '1a1a1a1a1a1a',
    'opqrewepwlqe@gmail.com',
    undefined,
    true,
  )
  garenaTesting(
    'Numbers mixed with uppercase letters',
    'larwioerd1212',
    '1A1A1A1A1A1A',
    'opqrewepwlqe@gmail.com',
    undefined,
    true,
  )
  garenaTesting(
    'Numbers mixed with letters (Both uppercase and lowercase)',
    'larwioerd1212',
    '1a1A1a1A1a1A',
    'opqrewepwlqe@gmail.com',
    undefined,
    true,
  )
  garenaTesting(
    'Special characters only (1)',
    'larwioerd1212',
    `!@#$%^&*()-=[]`,
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )
  garenaTesting(
    'Special characters only (2)',
    'larwioerd1212',
    `+_{}":><,.;'`,
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )
  garenaTesting(
    'Spaces only',
    'larwioerd1212',
    `      `,
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )
  garenaTesting(
    'Spaces mixed with other characters',
    'larwioerd1212',
    `sa 1!! lsa23  1`,
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )
  garenaTesting(
    'UTF-8 characters',
    'larwioerd1212',
    `ếôấưăấặầôươ`,
    'opqrewepwlqe@gmail.com',
    undefined,
    false,
  )
})

describe('Retype Password field check', () => {
  garenaTesting(
    'Same with password',
    'larwioerd1212',
    `SamplePass12!`,
    'opqrewepwlqe@gmail.com',
    `SamplePass12!`,
    true,
  )
  garenaTesting(
    'Different from password',
    'larwioerd1212',
    `SamplePass12!`,
    'opqrewepwlqe@gmail.com',
    `SamplePass12`,
    false,
  )
  garenaTesting(
    'Empty',
    'larwioerd1212',
    `SamplePass12!`,
    'opqrewepwlqe@gmail.com',
    ``,
    false,
  )
})

describe('Email field check', () => {
  garenaTesting(
    'Email Username contains one letter',
    'dowoiep2ud',
    'assword123456',
    'a',
    undefined,
    false
  );

  garenaTesting(
    'Email Username contains no "@"',
    'dowoiep2ud',
    'assword123456',
    'a.b',
    undefined,
    false
  );
  garenaTesting(
    'Email does not have the second part of domain',
    'dowoiep2ud',
    'assword123456',
    'a@b',
    undefined,
    false,
  );
  garenaTesting(
    'Email has correct custom format but short',
    'dowoiep2ud',
    'assword123456',
    'b@i.o',
    undefined,
    true,
  );
  garenaTesting(
    'Email domain is short',
    'dowoiep2ud',
    'assword123456',
    'p@b.rkw',
    undefined,
    true,
  );
// Email field automatically trims space input, EO: true
  garenaTesting(
    'Email Username contains space in username',
    'dowoiep2ud',
    'assword123456',
    'a dsadw@b.com',
    undefined,
    true,
  );

  garenaTesting(
    'Email does not the have first part of domain',
    'dowoiep2ud',
    'assword123456',
    'sdasad@.com',
    undefined,
    false,
  );

  garenaTesting(
    'Email Username contains underscore in username',
    'dowoiep2ud',
    'assword123456',
    'sda_sas@csadw.com',
    undefined,
    true,
  );
  // Email field automatically trims space input, EO: true
  garenaTesting(
    'Email Username contains space in username',
    'dowoiep2ud',
    'assword123456',
    'sd saa@qoe.com',
    undefined,
    true,
  );
// Email field automatically trims space input, EO: true
  garenaTesting(
    'Email Username contains spaces in username',
    'dowoiep2ud',
    'assword123456',
    'iw  as@o.com',
    undefined,
    true,
  );

  garenaTesting(
    'Email Username contains multiple "@"',
    'dowoiep2ud',
    'assword123456',
    'a@b@c.com',
    undefined,
    false,
  );

  garenaTesting(
    'Email Username contains special characters',
    'dowoiep2ud',
    'assword123456',
    'a`~!@#$%^&*()-=_+[]{}\|;’:”,.<>/?',
    undefined,
    false,
  );

  garenaTesting(
    'Email Username contains special characters (with domain name)',
    'dowoiep2ud',
    'assword123456',
    'a`~!#$%^&*()-=_+[]{}\|;’:”,.<>/?b@c.com',
    undefined,
    false,
  );
})

describe(' field check', () => {

})