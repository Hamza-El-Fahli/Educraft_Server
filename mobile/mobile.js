const express = require("express");
const {
  getUsers,
  getCourses,
  isUser,
  getModules,
  getChapters,
  getTests,
} = require("../DB/dbServer.js");

mobileApp = express.Router();

mobileApp.get("/", (req, res) => {
  res.send("Hiii to my Mobile app server");
});

mobileApp.get("/users", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

mobileApp.get("/isuser/:email/:password", async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const result = await isUser(email, password);
  if (result.found === true) res.json(result);
  else res.status(404).end();
});

mobileApp.get("/courses/:instructor_id?", async (req, res) => {
  const inst_id = req.params.instructor_id;
  let courses;
  if (inst_id) courses = await getCourses(inst_id);
  else courses = await getCourses();
  res.json(courses);
});

mobileApp.get("/modules/:course_id", async (req, res) => {
  let courseId = req.params.course_id;
  if (courseId) courses = await getModules(courseId);

  res.json(courses || null);
});

mobileApp.get("/chapters/:module_id", async (req, res) => {
  let moduleId = req.params.module_id;

  let chapters = await getChapters(moduleId);

  res.json(chapters || null);
});

mobileApp.get("/tests/:chapter_id", async (req, res) => {
  let chapter_id = req.params.chapter_id;
  let tests = await getTests(chapter_id);

  res.json(tests || null);
});

module.exports = mobileApp;
