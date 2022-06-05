// use node express
const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.static("./public"));
const path = require("path");
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

app.use(
  session({ secret: "Aloha123456", resave: false, saveUninitialized: true })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const sql = require("mssql");
const { redirect } = require("express/lib/response");
// const { config } = require("nodemon");

app.listen(3000, function () {
  console.log("server is listen on port 3000.");
});

const config = {
  user: "sa", // nhớ đổi lại
  password: ".", // nhớ đổi lại
  server: "localhost",
  database: "qlKH",
  port: 1433,
  options: {
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});
// get home page
app.get("/", (req, res) => {
  res.render("index", { data: res.locals.user });
});
app.post("/find-courses", (req, res) => {
  (async () => {
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input("keyword", sql.NVarChar(50), `${req.body.keyword}`)
        .execute("sp_findCourses");
      pool.close();
      res.send(result.recordset);
      console.log(result);
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  })();
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/login", (req, res) => {
  console.log(req.body);
  Promise.resolve("success").then(async function () {
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input("tendn", sql.VarChar(50), req.body.username)
        .input("mk", sql.VarChar(50), req.body.password)
        .output("MaTK", sql.VarChar(10))
        .execute("sp_signIn");
      //console.log(result)
      if (result.output.MaTK != null) {
        req.session.user = result.recordset[0];
        res.send({ maTk: result.recordset[0] });
        console.log(req.session.user);
        //console.log(req.session.user.MaTK)
      } else {
        // res.render("login", {
        //   error: result.recordset[0].ErrorMessage,
        // });
        res.send({ error: result.recordset[0].ErrorMessage });
      }

      pool.close();
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});
app.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});
app.post("/signup", (req, res, next) => {
  Promise.resolve("success").then(async function () {
    try {
      const pool = await sql.connect(config);
      const { username, password, fullname, birthday, email, phonenumber } =
        req.body;
      const result = await pool
        .request()
        .input("tendn", sql.VarChar(50), username)
        .input("mk", sql.VarChar(50), password)
        .input("hoten", sql.NVarChar(50), fullname)
        .input("ngaysinh", sql.Date, birthday)
        .input("email", sql.VarChar(50), email)
        .input("sdt", sql.VarChar(20), phonenumber)
        //.output('MaTK', sql.VarChar(10))
        .execute("sp_signUp");

      //console.log(result)
      if (!result.recordsets[0]) {
        const userToQuery = await pool
          .request()
          .query(`select * from NguoiDung where tendn like '${username}'`);
        req.session.user = userToQuery.recordset[0];
        res.send({ sucess: true });
      } else {
        res.send({ error: result.recordset[0].ErrorMessage });
      }

      pool.close();
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});
app.post("/change-info", function (req, res) {
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("MaTK", sql.VARCHAR(10), req.session.user.MaTK)
        .input("HoTen", sql.NVarChar(50), `${req.body.name}`)
        .input("NgaySinh", sql.Date, `${req.body.ntns}`)
        .input("Email", sql.VARCHAR(50), `${req.body.email}`)
        .input("SDT", sql.VARCHAR(20), `${req.body.sdt}`)
        //.output('output_parameter', sql.VarChar(50))
        .execute("sp_ND_CapNhatTT");
      pool.close();
      res.redirect("/");
      //console.log(result)
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});
app.post("/become-teacher", function (req, res) {
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("MaTK", sql.VARCHAR(10), req.session.user.MaTK)
        .input("TenBang", sql.NVarChar(50), `${req.body.cert_name}`)
        .input("NgayCapBang", sql.Date, `${req.body.cert_recv_date}`)
        .input("NoiCapBang", sql.NVARCHAR(50), `${req.body.cert_provider}`)
        //.output('MaGV',sql.VARCHAR(10))
        .execute("sp_TK_CapNhatBC");
      pool.close();
      res.redirect("/");
      //console.log(result)
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});

app.post("/update-cert", function (req, res) {
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("MaTK", sql.VARCHAR(10), req.session.user.MaTK)
        .input("TenBang", sql.NVarChar(50), `${req.body.cert_name}`)
        .input("NgayCapBang", sql.Date, `${req.body.cert_recv_date}`)
        .input("NoiCapBang", sql.NVARCHAR(50), `${req.body.cert_provider}`)
        //.output('MaGV',sql.VARCHAR(10))
        .execute("sp_TK_CapNhatBC");
      pool.close();
      res.send(result.recordset);
      //console.log(result)
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});
app.post("/insert-course", function (req, res) {
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("MaTK", sql.VARCHAR(10), req.session.user.MaTK)
        .input("TenKH", sql.NVarChar(50), `${req.body.course_name}`)
        .input("Lop", sql.Int, `${req.body.course_grade}`)
        .input("SoBuoi", sql.Int, `${req.body.course_class_num}`)
        .input("SoHS", sql.Int, `${req.body.course_min_student}`)
        .input("HocPhi", sql.Int, `${req.body.fee}`)
        .input("Link", sql.NVarChar(5000), `${req.body.Link}`)

        //.output('output_parameter', sql.VarChar(50))
        .execute("sp_GV_TaoKH");
      pool.close();
      res.send(result.recordset);
      //console.log(result)
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});
app.get("/my-courses", function (req, res) {
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("MaTK", sql.VARCHAR(10), req.session.user.MaTK)
        //.output('output_parameter', sql.VarChar(50))
        .execute("sp_GV_XemKH");
      pool.close();
      res.send(result.recordset);
      //console.log(result)
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});
app.get("/registered-courses", function (req, res) {
  //console.log(req.body)
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("MaTK", sql.VARCHAR(10), req.session.user.MaTK)
        //.output('output_parameter', sql.VarChar(50))
        .execute("sp_User_XemKH");
      pool.close();
      res.send(result.recordset);
      //console.log(result)
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});
app.get("/show-cert", function (req, res) {
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("MaTK", sql.VARCHAR(10), req.session.user.MaTK)
        //.output('output_parameter', sql.VarChar(50))
        .execute("sp_GV_XemBC");
      pool.close();
      res.send(result.recordset);
      //console.log(result)
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});
app.post("/get-info-course", function (req, res) {
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool.query(
        `select* from KhoaHoc where MaKH='${req.body.MaKH}'`
      );
      res.send(result.recordset);
      //console.log(result.recordset)
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});
app.post("/schedule", function (req, res) {
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("MaTK", sql.VARCHAR(10), req.session.user.MaTK)
        .input("MaKH", sql.VARCHAR(10), req.body.MaKH)
        //.output('output_parameter', sql.VarChar(50))
        .execute("sp_User_XemLH");
      //console.log(result)
      pool.close();
      res.send(result.recordset);
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});
app.get("/teach_schedule", function (req, res) {
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("MaTK", sql.VARCHAR(10), req.session.user.MaTK)
        //.output('output_parameter', sql.VarChar(50))
        .execute("sp_GV_XemLH");
      //console.log(result)
      pool.close();
      res.send(result.recordset);
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});
app.get("/show-profile", (req, res) => {
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool.query(
        `select* from NguoiDung where MaTK='${req.session.user.MaTK}'`
      );
      res.send(result.recordset);
      //console.log(result.recordset)
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});
app.post("/join-course", function (req, res) {
  console.log(req.session.user);

  // if(req.session.user){
  // 	res.send('ErrorMessage: "login required"')
  // 	return
  // 	}
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("MaTK", sql.VARCHAR(10), req.session.user.MaTK)
        .input("MaKH", sql.VarChar(10), `${req.body.MaKH}`)
        .execute("sp_TK_ThamGiaKH");
      pool.close();
      res.send(result.recordset);
      console.log(result);
      return;
    } catch (error) {
      res.send({ ErrorMessage: "login required" });
      console.log(error.message);
      return error.message;
    }
  });
});

app.post("/join-course-class", function (req, res) {
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request().query(
        `declare @stt int
					set @stt = (select stt 
					from LichHoc where MaKH='${req.body.MaKH}' and '${req.body.Ngay}'= Ngay)
					insert into THamGiaBuoiHoc 
					values('${req.body.MaKH}',@stt,'${req.session.user.MaTK}',0)`
      );
      pool.close();
      res.send(result.recordset);
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});

app.post("/favor", function (req, res) {
  const qry = `INSERT INTO YEUTHICH VALUES ('${req.body.MaKH}','${req.session.user.MaTK}')`;
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request().query(qry);
      pool.close();
      res.send(result.recordset);
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});

app.get("/favor-list", function (req, res) {
  console.log(req.session);
  const qry = `SELECT kh.* FROM YEUTHICH yt JOIN KHOAHOC kh on yt.MaKH=kh.MaKH WHERE MaTK='${req.session.user.MaTK}'`;
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request().query(qry);
      pool.close();
      res.send(result.recordset);
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});

app.post("/course-detail", function (req, res) {
  const qry = `SELECT * FROM ChiTietKH WHERE MaKH='${req.body.MaKH}'`;
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request().query(qry);
      pool.close();
      res.send(result.recordset);
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});

app.post("/add-detail", function (req, res) {
  const qry = `INSERT INTO ChiTietKH values('${req.body.MaKH}',0,'abc','${req.body.Mota}','${req.body.LinkVideo}')`;
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request().query(qry);
      pool.close();
      res.send(result.recordset);
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});

app.post("/update-course", function (req, res) {
  const qry = `UPDATE khoahoc set TenKhoaHoc='${req.body.TenKhoaHoc}', 
              HocPhi='${req.body.HocPhi}', 
              SoBuoiDuKien='${req.body.SoBuoiDuKien}', 
              Link='${req.body.Link}' 
              WHERE MaKH ='${req.body.MaKH}'`;
  Promise.resolve("success").then(async function () {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request().query(qry);
      pool.close();
      res.send(result.recordset);
      return;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  });
});
