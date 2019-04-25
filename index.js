var express = require("express");
var app = express();
// var User = require("./User.js");
var cors = require("cors");
var bodyParser = require("body-parser");
const router = express.Router();
var cookieParser = require("cookie-parser");

var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

// var Course = require("./notification_schema.js");
var Event = require("./event_schema.js");

var User = require("./User.js");
var student = require("./student_schema.js");
var Course = require("./course_schema.js");
var StudentProfile = require("./student_profile_schema.js");
var CourseMarks = require("./marks_schema.js");
var Faculty = require("./FacultyAndCoursesSchema.js");
var PreviousYearQuestionPaperSchema = require("./previous_year_question_paper_schema.js");
// var Mark = require("./Marks.js");
// const StudentProfile = require("./student_profile_schema");
var Sticky = require("./Sticky_Schema.js");
var Admindashboard = require("./AdminDashboard.js");

app.get("/getEvent", (req, res) => {
  //ashish
  Event.find((err, allEvents) => {
    if (err) {
      res.type("html").status(500);
      res.send("Error:" + err);
    } else {
      console.log("from getEvent");
      res.json(allEvents);
    }
  });
});

app.use("/getPrevYrPaper", (req, res) => {
  var courseId = req.query.courseId;
  console.log("atleast hereuwgydusaygd  " + courseId);

  PreviousYearQuestionPaperSchema.findOne(
    { courseId: courseId },
    (err, course) => {
      if (err) {
        console.log("file not found, " + err);
      } else {
        console.log("file founddd");
        console.log("adsfdstlast here");
        //console.log(courseId);
        //console.log(notification+"haha");
        console.log();
        res.json(course.yearnsemMaterial);
      }
    }
  );
});

app.get("/coursenotifications", (req, res) => {
  var courseId = req.query.courseId;
  console.log("courseidsdcsdsd" + courseId);
  Course.findOne({ courseId: courseId }, (err, course) => {
    if (err) {
      res.type("html").status(500);
      res.send(err);
      console.log("some error in course notification");
    } else {
      //console.log(course);
      console.log(course + "namaste\n");

      res.json(course.notification);
    }
  });
});

app.use("/getcoursesforfaculty", (req, res) => {
  var id = req.query.id;
  //var id = 2;
  Faculty.findOne({ facultyId: id }, (err, course) => {
    if (err) {
      console.log("file not found, " + err);
    } else {
      console.log("file founddd");
      console.log("adsfdstlast here");
      //console.log(courseId);
      //console.log(notification+"haha");
      console.log();

      res.json(course.courses);
    }
  });
});

app.use("/create", (req, res) => {
  var courseId = req.body.courseId;
  var notification = req.body.notification;
  var topic = req.body.topic;
  var date = req.body.date;
  var time = req.body.time;
  console.log("courseId: " + req.body.courseId);
  console.log("no" + notification);
  console.log(date + "hahaah");
  Course.findOne({ courseId: courseId }, (err, course) => {
    if (err) {
      console.log("file not found, " + err);
    } else {
      console.log("file founddd");
      console.log("atlast here");
      console.log(courseId);
      console.log(notification + "haha");
      if (null == course) {
        var file = new Course({
          courseId: courseId,
          notification: {
            notification: notification,
            topic: topic,
            date: date,
            time: time
          }
        });
        console.log(file);
        file.save(err => {
          console.log("atleaset here 345");
          if (err) {
            res.type("html").status(500);
            res.send(err);
          } else {
            res.send("file created successfuly");
          }
        });
      } else {
        course.notification.push({
          notification: notification,
          topic: topic,
          date: date,
          time: time
        });
        console.log("atlast here");
        course.save(err => {
          console.log("atleaset here 368");
          if (err) {
            res.type("html").status(500);
            res.send(err);
          } else {
            res.send("notification created successfuly");
          }
        });
        return 0;
      }
    }
  });
});

app.use("/uploadcoursematerial", (req, res) => {
  var courseId = req.body.courseId;
  var fileLink = req.body.fileLink;
  var fileName = req.body.fileName;
  console.log(
    "course" + courseId + "filelink" + fileLink + "filename" + fileName
  );

  Course.findOne({ courseId: courseId }, (err, course) => {
    if (err) {
      console.log("file not found, " + err);
    } else {
      console.log("file founddd");
      console.log("atlast here");
      console.log(courseId);
      //console.log(notification+"haha");
      if (null == course) {
        var file = new Course({
          courseId: courseId
          // notification: {notification:notification,topic:topic,date:date,time:time}
        });
        console.log(file);
        file.save(err => {
          console.log("atleaset here 345");
          if (err) {
            res.type("html").status(500);
            res.send(err);
          } else {
            res.send("file created successfuly");
          }
        });
      } else {
        course.file.push({ fileName: fileName, fileLink: fileLink });
        console.log("atlast here");
        course.save(err => {
          console.log("atleaset here 368");
          if (err) {
            res.type("html").status(500);
            console.log("some error" + err);
          } else {
            console.log("file created successfuly");
          }
        });
        return 0;
      }
    }
  });
});

app.use("/addfacultyandcourse", (req, res) => {
  var id = req.body.id;
  var name = req.body.name;
  var course1 = req.body.course1;
  var course2 = req.body.course2;
  Faculty.findOne({ facultyId: id }, (err, course) => {
    if (err) {
      console.log("file not found, " + err);
    } else {
      console.log("file founddd");
      console.log("atlast here");
      //console.log(courseId);
      //console.log(notification+"haha");
      if (null == course) {
        var file = new Faculty({
          facultyId: id,
          facultyName: name,
          courses: { courseId: course1 }
        });
        file.courses.push({ courseId: course2 });

        console.log(file);
        file.save(err => {
          console.log("atleaset here 345");
          if (err) {
            res.type("html").status(500);
            res.send(err);
          } else {
            res.send("file created successfuly");
          }
        });
      } else {
        course.courses.push({ courseId: course1 });
        course.courses.push({ courseId: course2 });

        console.log("atlast here");
        course.save(err => {
          console.log("atleaset here 368");
          if (err) {
            res.type("html").status(500);
            res.send(err);
          } else {
            res.send("notification created successfuly");
          }
        });
        return 0;
      }
    }
  });
});

app.use("/postpreviousyearpaper", (req, res) => {
  var courseId = req.body.courseId;
  var year = req.body.year;
  var sem = req.body.sem;
  var fileName = req.body.fileName;
  var fileLink = req.body.fileLink;
  console.log(
    "courseId" +
      courseId +
      " year" +
      year +
      " sem" +
      sem +
      " fileName" +
      fileName +
      " fileLink" +
      fileLink
  );
  console.log("dasdasdasdsadasdsadsdds");
  PreviousYearQuestionPaperSchema.findOne(
    { courseId: courseId },
    (err, course) => {
      if (err) {
        console.log("file not found, " + err);
      } else {
        console.log("file founddd");
        console.log("atlast here");
        console.log("lol  " + course);
        //console.log(notification+"haha");
        if (null == course) {
          var file = new PreviousYearQuestionPaperSchema({
            courseId: courseId,
            //notification: {notification:notification,topic:topic,date:date,time:time}
            yearnsemMaterial: {
              year: year,
              semester: sem,
              file: { fileName: fileName, fileLink: fileLink }
            }
          });
          console.log(file);
          file.save(err => {
            console.log("atleaset here 345");
            if (err) {
              res.type("html").status(500);
              res.send(err);
            } else {
              res.send("file created successfuly");
            }
          });
        } else {
          console.log(
            "hola courseId" +
              courseId +
              " year" +
              year +
              " sem" +
              sem +
              " fileName" +
              fileName +
              " fileLink" +
              fileLink
          );

          course.yearnsemMaterial.push({
            year: year,
            semester: sem,
            file: { fileName: fileName, fileLink: fileLink }
          });
          console.log("atlast here");
          course.save(err => {
            console.log("atleaset here 368");
            if (err) {
              res.type("html").status(500);
              console.log("some error" + err);
            } else {
              console.log("file created successfuly");
            }
          });
          return 0;
        }
      }
    }
  );
});

app.use("/coursemininotifications", (req, res) => {
  //vaibhav
  var courseId = req.query.courseId;
  Course.find({ courseId: courseId }, (err, course) => {
    if (err) {
      res.send("some error");
    } else {
      console.log(course);
      res.json(course);
    }
  });
});

app.use("/coursecontent", (req, res) => {
  var courseId = req.query.courseId;
  Course.find({ courseId: courseId }, (err, course) => {
    if (err) {
      res.send("some error");
    } else {
      console.log(course);
      res.json(course);
    }
  });
});

app.use("/home", (req, res) => {
  //this wil show all course the sutdent is registered to and other buttons.
  var userId = req.query.studentId;
  if (!userId) {
    res.redirect("/");
  } else {
    var studentId = userId;
    console.log("studentId" + studentId);
    student.findOne({ studentId: studentId }, (err, student) => {
      if (err) {
        res.type("html").status(500);
        res.send(err + "afgsdafdgf");
      } else {
        console.log("Student" + student);
        res.json(student.course);
      }
    });
    console.log("logged in");
  }
});

app.use("/addnote", (req, res) => {
  //vedant
  console.log("request received");
  //var title = req.body.title;
  var content = req.body.content;
  var studentId = req.query.studentId;
  Sticky.findOne({ studentId: studentId }, (err, sticky) => {
    if (err) {
      console.log("some error from vedant");
    }
    //check to see if title or content was changed
    else {
      console.log("content is " + req.body.content);
      sticky.studentId = req.query.studentId;
      sticky.content = req.body.content;
      console.log("student id for vedant " + sticky.studentId);
      console.log(sticky.content + " fewf");
      sticky.save(err => {
        if (err) {
          res.type("html").status(500);
          res.send("Error:" + err);
        } else {
          console.log("aabra ka daabra Yay");
          // res.render("notes", { notes: Sticky });
        }
      });
    }
  });
});

app.use("/sendadmindashboard", (req, res) => {
  Admindashboard.find({}, (err, admindashboard) => {
    if (err) {
      console.log("some err");
    } else {
      console.log(" this is  " + admindashboard[0]);
      res.json(admindashboard[0]);
      // res.send("hello");
    }
  });
});

app.use("/getcontent", (req, res) => {
  var studentId = req.query.studentId;
  Sticky.findOne({ studentId: studentId }, (err, sticky) => {
    if (err) {
      res.type("html").status(500);
      res.send(err + "afgsdafdgf");
    } else {
      console.log(sticky + " in getcontent");
      res.json(sticky);
    }
  });
});

app.use("/getmarks", (req, res) => {
  var courseId = req.query.courseId;
  console.log("received request, courseId: " + courseId);
  CourseMarks.findOne({ courseId: courseId }, (err, courseMarks) => {
    if (err) {
      console.log("some error");
      res.send("soem error");
    } else {
      //res.send(courseMarks);
      console.log("done fldkjhdsk jjjd");
      res.json(courseMarks);
    }
  });
});

// app.use("/create", (req, res) => {
//   //prakhar
//   var newUser = new User({
//     username: req.body.username,
//     password: req.body.password,
//     designation: req.body.des
//   });

//   newUser.save(err => {
//     if (err) {
//       res.type("html").status(500);
//     } else {
//       res.send(newUser + " created successfully");
//     }
//   });
// });

app.use("/admin", (req, res) => {
  res.redirect("/public/admin.html");
});

/*
app.use("/validate", (req, res) => {
  var user = req.body.username;
  var pass = req.body.password;
  console.log("router");
  User.findOne({ username: user, password: pass }, (err, person) => {
    if (err) {
      res.type("html").status(500);
      res.send("Err...." + err);
    } else if (!person) {
      res.json({ message: "LOGIN FAILED" });
    } else {
      res.cookie("username", user);
      res.cookie("designation", person.designation);
      res.json({
        message: "LOGIN SUCCESSFUL",
        designation: person.designation
      });
    }
  });
});
*/

app.use("/validate", (req, res) => {
  var user = req.body.username;
  var pass = req.body.password;
  console.log("router  " + user + " pass " + pass);
  User.findOne({ username: user, password: pass }, (err, person) => {
    if (err) {
      console.log("error from mongo ");
      res.type("html").status(500);
      res.send("Err...." + err);
    } else if (!person) {
      console.log("person not found");
      res.json({ message: "LOGIN FAILED" });
    } else {
      console.log("hello user ");
      res.cookie("username", user);
      res.cookie("designation", person.designation);
      res.json({
        message: "LOGIN SUCCESSFUL",
        designation: person.designation
      });
      var today = new Date();
      today =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      console.log("today " + today);
      Admindashboard.find({}, (err, admindashboard) => {
        if (err) {
          console.log("some err");
        } else {
          console.log("userlogins : " + admindashboard);
          console.log("inetr : " + admindashboard[0].datelogin.length);
          var index = -1;
          var len = 0;

          if (admindashboard[0].datelogin.length) {
            len = admindashboard[0].datelogin.length;
          }
          for (var i = 0; i < len; i++) {
            if (admindashboard[0].datelogin[i].date == today) {
              index = i;
            }
          }
          if (index == -1) {
            console.log("new date to be inserted");

            admindashboard[0].datelogin.push({
              studentCount: 0,
              facultyCount: 0,
              date: today
            });

            admindashboard[0].save(err => {
              if (err) {
                console.log("save error " + err);
              } else {
                console.log("save successful");
              }
            });
          } else {
            console.log(
              "date alreaady exist   index: " + index + " " + person.designation
            );

            if (person.designation == "faculty") {
              admindashboard[0].datelogin[index].facultyCount++;
            } else if (person.designation == "student") {
              admindashboard[0].datelogin[index].studentCount++;
            }

            admindashboard[0].save(err => {
              if (err) {
                console.log("save error " + err);
              } else {
                console.log("save successful");
              }
            });
          }
        }
      });
    }
  });
});


app.use("/deletecookie", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("designation");
  res.send("cookie succesfully deleted ");
});

// app.use("/", (req, res) => {
//   res.redirect("/public/login.html");
// });

app.use("/addcourse", (req, res) => {
  var studentId = req.body.studentId;
  var courseName = req.body.courseName;
  //var courseLink = req.body.courseLink;
  console.log("in add course from dhruv");
  var courseLink = "a";
  student.findOne({ studentId: studentId }, (err, student) => {
    if (err) {
      console.log("course not found, " + err);
    } else {
      console.log("course founddd");
      console.log("atlast here");

      student.course.push({ courseName: courseName, courseLink: courseLink });
      console.log("atlast here");
      student.save(err => {
        console.log("atleaset here 3");
        if (err) {
          res.type("html").status(500);
          console.log("Some err");
          console.log(err);
        } else {
          console.log("course created successfuly");
        }
      });
      return 0;
    }
  });
});

app.use("/getdata", (req, res) => {
  //dhruv
  console.log("in get data");
  StudentProfile.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    res.json(data);
  });
});

// this is our update method
// this method overwrites existing data in our database
app.use("/updatedata", (req, res) => {
  console.log("ashish");
  console.log("body is:" + req.body);
  console.log(req.body.id);
  var id2 = req.body.id;
  console.log(id2);
  var update = req.body.message;
  var name = req.body.name;
  var age = req.body.age;
  var contact = req.body.contact;
  var emailId = req.body.emailId;
  var password = req.body.password;

  console.log("nameis" + name);
  //StudentProfile.findByIdAndDelete(id2, err => {
  //StudentProfile.findOne()
  // if (err) res.send(err);
  //   //res.json({ success: true });
  // });

  // console.log("Id" + id2);
  // console.log("age" + age);
  // let data = new StudentProfile();
  // data.id = id2;
  // data.message = update;
  // data.name = name;
  // data.age = age;
  // data.contact = contact;
  // data.emailId = emailId;
  // data.password = password;
  // console.log("data.age" + data.age);
  // data.save(err => {
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true });
  // });
  console.log("here");
  StudentProfile.findOne({ id: id2 }, (err, data) => {
    console.log("data returned for server " + JSON.stringify(data));
    if (err) {
      console.log("some error2");
    } else {
      console.log("data" + data);
      data.message = update;
      data.name = name;
      data.age = age;
      data.contact = contact;
      data.emailId = emailId;
      data.password = password;
      console.log("final data" + JSON.stringify(data));
      data.save(err => {
        if (err) {
          console.log("some error in here");
        } else console.log("success");
      });
    }
  });
  /*StudentProfile.findOneAndUpdate(
      { id: id2 },
      {
        message: update,
        name: name,
        age: age,
        contact: contact,
        emailId,
        emailId,
        password,
        password
      },
      err => {
        if (err) res.json({ success: false, error: err });
        res.json({ success: true });
      }
    );*/
});
app.use("/getuserid", (req, res) => {
  console.log("request received at getuserid");
  var userId = req.cookies["username"];
  res.json(userId);
});
// this is our delete method
// this method removes existing data in our database
app.use("/deleteData", (req, res) => {
  console.log("delashish");
  console.log("body" + JSON.stringify(req.body));
  const { id } = req.body;
  StudentProfile.findByIdAndDelete(id, err => {
    if (err) {
	console.log("Err in delete dhruv"+err);
res.send(err);}
    res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
app.use("/putData", (req, res) => {
  let data = new StudentProfile();
	console.log("In putData route" + JSON.stringify(req.body));
  const { id, message, name, age, contact, emailId, password } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.id = id;
  data.message = message;

  data.name = name;
  data.age = age;
  data.contact = contact;
  data.emailId = emailId;
  data.password = password;
console.log("Data in putData"+JSON.stringify(data));
  data.save(err => {
    if (err){ 
console.log("Error in putdata route"+err);
return res.json({ success: false, error: err });}
	else{
	console.log("Succ");
    return res.json({ success: true });
}
  });
});

router.post("/getCourse", (req, res) => {
  // res.send({ sucess: true });
  CourseMarks.findOne({ courseId: req.body.cname }, (err, Mark) => {
    // findOne
    if (err) return res.json({ success: false, error: err });
    return res.send({ success: true, course: Mark });
  });
});

router.post("/putMarks", (req, res) => {
  const { course } = req.body;
  CourseMarks.updateOne(
    { courseId: course.courseId },
    { student: course.student },
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    }
  );
});

router.post("/addstud", (req, res) => {
  console.log(
    req.body.username + " " + req.body.password + " " + req.body.designation
  );

  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    designation: req.body.designation
  });

  console.log(newUser);

  newUser.save(err => {
    if (err) {
      res.json({ error: true });
      console.log("why are u eror");
    } else {
      res.json({
        hello: newUser + " created successfully",
        success: true
      });
      console.log("yah");
    }
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("I'm there at port 5000");
});
