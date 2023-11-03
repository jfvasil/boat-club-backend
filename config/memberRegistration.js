const Member = require('../Backend/models/memberModel')
const {nanoid} = require('nanoid')

async function addMembersToDB(memberEmails) {
  for (const email of memberEmails) {
    const token = nanoid()

    const member = new Member({
      email,
      token,
    })

    await member.save()
  }
}

// Usage
// const memberEmails = ['email1@example.com', 'email2@example.com', ...]
// addMembersToDB(memberEmails)
