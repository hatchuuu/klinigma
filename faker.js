import { faker } from '@faker-js/faker'
import fs from 'fs'

const data = {
    superAdmin: {
        "email": "klinigma@gmail.com",
        "password": "Password_123@"
    },
    users: [],
    polyclinics: [],
    doctors: [],
    bookings: []
}


for (let i = 0; i < 5; i++) {
    const genderUser = faker.string.fromCharacters(['wanita', 'pria'])
    const userName = (genderUser == 'wanita') ? faker.person.firstName('female') : faker.person.firstName('male')
    const dateNow = faker.date.recent()
    const userId = faker.string.alphanumeric({ casing: 'lower', length: 4 })

    data.users.push({
        "id": userId,
        "name": userName,
        "email": faker.internet.email({ firstName: userName, provider: 'google.com' }),
        "password": faker.string.alphanumeric(10),
        "createdAt": dateNow,
        "updatedAt": dateNow,
        "location": faker.location.city(),
        "phoneNumber": faker.phone.number({ style: 'national' }),
        "gender": genderUser,
        "role": "user",
        "image": faker.image.avatar()
    })

    const polyName = faker.string.fromCharacters(['Poli Umum', 'Poli Jantung', 'Poli Paru', 'Poli Anak', 'Poli Penyakit Dalam'])
    const polyId = faker.string.alphanumeric({ casing: 'lower', length: 4 })
    const doctorId = faker.string.alphanumeric({ casing: 'lower', length: 4 })

    const genderDoctor = faker.string.fromCharacters(['wanita', 'pria'])
    const doctorName = (genderUser == 'wanita') ? faker.person.firstName('female') : faker.person.firstName('male')
    const invitedDate = faker.date.between({ from: '2005-01-01T00:00:00.000Z', to: '2020-01-01T00:00:00.000Z' })

    data.doctors.push({
        "id": doctorId,
        "polyName": polyName,
        "name": doctorName,
        "email": faker.internet.email({ firstName: doctorName, provider: 'google.com' }),
        "gender": genderDoctor,
        "descriptions": faker.string.alpha(40),
        "invitedAt": invitedDate,
        "location": faker.location.city(),
        "image": faker.image.avatar()
    })

    data.polyclinics.push({
        "id": polyId,
        "polyName": polyName,
        "openDay": ["Senin", "Kamis"],
        "openTime": [7, 30],
        "descriptions": faker.string.alpha(40),
        "image": faker.image.avatar()
    })

    data.bookings.push({
        "id": faker.string.alphanumeric({ casing: 'lower', length: 4 }),
        "polyName": polyName,
        "name": userName,
        "createdAt": dateNow,
        "doneAt": faker.date.soon({ days: 5 }),
        "status": faker.string.fromCharacters(['Created', 'Approve', 'Done'])
    })
}
console.log(data);

fs.writeFileSync('./db.json', JSON.stringify(data, null, 2))