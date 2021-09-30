const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// merubah string ke json
const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// function untuk menyimpan contact dan mengirimkannya ke contacts.json
const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };

  // memanggil function loadContact
  const contacts = loadContact();

  // check duplikat, apakah namanya sama atau tidak
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red.inverse.bold(`Nama ${nama} sudah terdaftar, silahkan gunakan nama lain!`));

    // agar kalau error function nya berhenti dan tidak menjalankan yang dibawah
    return false;
  }

  // check email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold(`Email tidak valid!`));

      // agar kalau error function nya berhenti dan tidak menjalankan yang dibawah
      return false;
    }
  }

  // check no HP
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.inverse.bold(`Nomor HP tidak valid!`));

    // agar kalau error function nya berhenti dan tidak menjalankan yang dibawah
    return false;
  }

  contacts.push(contact);

  // menginput ke contacts.json
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 2));

  console.log(chalk.green.inverse.bold(`terima kasih ${nama} sudah menginputkan data`));
};

// function untuk menampilkan list nama dan noHp dari contacts.json
const listContact = () => {
  const contacts = loadContact();

  console.log(chalk.cyan.inverse.bold(`Daftar Contact : `));

  // lakukan perulangan untuk menampilkan list contact
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};

// function untuk menampilkan detail sebuah contact berdasarkan nama
const detailContact = (nama) => {
  const contacts = loadContact();

  // mencari nama contact yang sama, tidak peduli itu huruf besar atau huruf kecil
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(`${contact.nama}`));
  console.log(contact.noHp);
  if (contact.email) {
    console.log(contact.email);
  }
};

// function untuk menghapus contact berdasarkan nama
const deleteContact = (nama) => {
  const contacts = loadContact();

  // membuat array baru, agar bisa menghapus string dan tidak menjadi undefined
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

  // kalau ukuran contacts dan newContacts sama, maka otomatis tidak ada nama yang dihapus
  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts, null, 2));

  console.log(chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus!`));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
