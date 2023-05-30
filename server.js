const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const pasienSchema = new mongoose.Schema({
  nama: String,
  umur: Number,
  alamat: String,
  penyakit: String,
});

const Pasien = mongoose.model("Pasien", pasienSchema);

app.post("/pasien", async(req, res) => {
    const pasien = new Pasien(req.body)
    try{
        const newPasien = await pasien.save()
        res.status(201).send(pasien)
    }catch(err){
        res.status(400)
    }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
