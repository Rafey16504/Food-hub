const express = require("express");
const multer = require("multer");
import path from "path";
import { v4 as uuidv4 } from "uuid";
// import { CreateBookType, CreateBookTypeSchema } from "./types/book";
import { ZodError } from "zod";
import { convertToReadableError } from "./zod-mapping";

const nodemailer = require("nodemailer");
export const appRouter = express.Router();
const client = require("./db");

function sendEmail(email: any, code: any) {
  return new Promise((resolve: any, reject: any) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abdulrafey16504@gmail.com",
        pass: "dxhw wrgm pszq gzfl",
      },
    });
    const mail_configs = {
      from: "abdulrafey16504@gmail.com",
      to: email,
      subject: "Verification Code",
      text: `${code}`,
    };
    transporter.sendMail(mail_configs, (error: any, info: any) => {
      if (error) {
        console.error("Error sending email:", error);
        return reject({ message: `An error has occurred: ${error.message}` });
      }
      console.log("Email sent:", info);
      return resolve({ message: `Email sent successfully` });
    });
  });
}

appRouter.post("/send-email/:id", async (req: any, res: any) => {
  const { email } = req.body;
  const id = req.params.id;

  if (!/^[0-9a-fA-F-]{36}$/.test(id)) {
    return res.status(400).send({ error: "Invalid UUID format" });
  }

  const verification_code: any = {};
  verification_code[id] = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  try {
    let email_query = `UPDATE user_account SET code = $1 WHERE id = $2 RETURNING *`;
    await client.query(email_query, [verification_code[id], id]);

    await sendEmail(email, verification_code[id]);

    return res.send({
      message: "Email sent successfully",
      code: verification_code[id],
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).send("Could not send email!");
  }
});

appRouter.post("/sign-up", async (req: any, res: any) => {
  try {
    const { name, email, pass, date_of_birth, phone_number } = req.body;

    const emailRegex = /^[^\s@]+@lums\.edu\.pk$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .send({ error: "Please enter your university email!" });
    }
    const email_query = `SELECT id, status FROM user_account WHERE email = $1`;
    const emailResult = await client.query(email_query, [email]);

    if (emailResult.rows.length > 0) {
      const { id, status } = emailResult.rows[0];

      if (status == 'Active') {
        return res.status(409).json({ error: "Email already registered" });
      }else{
        return res.send({ id: id });
      }
    }

    // const hashedPassword = await bcrypt.hash(pass, 10);
    const newAccount = {
      id: uuidv4(),
      name,
      pass: pass,
      email,
      date_of_birth,
      phone_number,
    };
    

    
    return res.send({ id: newAccount.id });
  } catch (error: any) {
    console.error("Error during sign-up:", error);
    return res.status(500).send({ error: error.message });
  }
});

appRouter.post("/adduser", async (req: any, res: any) => {
  try {
    const { name, pass, email, date_of_birth, contact_no } = req.body;

    // const hashedPassword = await bcrypt.hash(pass, 10);
    const id = uuidv4();
    const currentTime = new Date().toISOString();
    const roll_no = email.split("@")[0];
    const insert_query = `INSERT INTO user_account(id, name, password_hash, email, created_at, roll_number, date_of_birth, phone_number,status)
                          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

    await client.query(insert_query, [
      id,
      name,
      pass,
      email,
      currentTime,
      roll_no,
      date_of_birth,
      contact_no,
      'Active',
    ]);

    console.log("Insertion Successful");
    return res.send({ message: "User added successfully" });
  } catch (error: any) {
    console.error("Error adding user:", error);
    return res.status(500).send({ error: error.message });
  }
});
