const { Client } = require("ssh2");

const host = process.argv[2];
const password = process.argv[3];

// 键入正确的host和密码即可登录成功
console.log({host, password});

const conn = new Client();
conn
  .on("ready", () => {
    conn.shell((err, stream) => {
      if (err) throw err;
      let skipNext = false;

      const stdinListener = (data) => {
        skipNext = true;
        stream.stdin.write(data);
      };

      stream
        .on("close", () => {
          process.stdin.removeListener("data", stdinListener);
          conn.end();
        })
        .on("data", () => {
          process.stdin.pause();
          process.stdin.resume();
        });

      stream.stdout.on("data", (data) => {
        if (skipNext) {
          return (skipNext = false);
        }
        process.stdout.write(data);
      });

      process.stdin.on("data", stdinListener);
    });
  })
  .connect({
    host,
    port: 22,
    username: "root",
    password: password,
  });
