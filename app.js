// mengambil argumen dari cmd
// menggunakan npm yargs
const yargs = require("yargs");
const { simpanContact, listContact, detailContact, deleteContact } = require("./contacts");

// membuat perintah
yargs
  .command({
    // menuliskan perintah
    command: "add",
    describe: "Menambahkan Contact Baru",
    // ketika perintah add dijalankan, maka dia harus mengisi nama, email, noHp
    builder: {
      // isinya object, dan bisa menuliskan item data yang dibutuhkan
      nama: {
        demandOption: true,
        describe: "Nama Lengkap",
        type: "string",
      },
      email: {
        demandOption: false,
        describe: "Email",
        type: "string",
      },
      noHp: {
        demandOption: true,
        describe: "Nomor Handphone",
        type: "string",
      },
    },
    handler(argv) {
      simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand();

// menampilkan daftar semua nama & noHp contact
yargs.command({
  command: "list",
  describe: "Menampilkan daftar semua nama & no HP Contact",
  handler() {
    listContact();
  },
});

// menampilkan detail sebuah contact
yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah Contact berdasarkan nama",
  builder: {
    nama: {
      demandOption: true,
      describe: "Nama Lengkap",
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

// menghapus contact berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus sebuah Contact berdasarkan nama",
  builder: {
    nama: {
      demandOption: true,
      describe: "Nama Lengkap",
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

// menggunakan yargs.parse agar kode nya berjalan
yargs.parse();

// const { tulisPertanyaan, simpanContact } = require("./contacts");

// const main = async () => {
//   const nama = await tulisPertanyaan("Masukan Nama Anda: ");
//   const email = await tulisPertanyaan("Masukan Email Anda: ");
//   const noHp = await tulisPertanyaan("Masukan No HP Anda: ");

//   simpanContact(nama, email, noHp);
// };

// main();
