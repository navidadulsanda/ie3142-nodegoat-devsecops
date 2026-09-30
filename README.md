## Attribution
This project is built on top of [OWASP NodeGoat](https://github.com/OWASP/NodeGoat),
an intentionally vulnerable Node.js application used for security training.
Base application code is © OWASP under the NodeGoat license (Apache 2.0).

# IE3142 DevSecOps Project: Securing OWASP NodeGoat

Group: 81 | Members: Fernando T N D - IT24103385
                     Illeperuma H.P - IT24103019
                     Seneviratne R.H - IT24103020
                     Rahman M.F.A - IT24102889

Stack: Node.js 12 / Express / Swig, MongoDB 4.4, Docker Compose, GitHub Actions.

## Run it

    cp .env.example .env    # fill in all four values with random strings
    docker compose up --build
    # open http://localhost:4000

If you see "Authentication failed" from MongoDB, an old database volume exists:
run `docker compose down -v` and start again.

Seeded logins: admin / Admin_123, user1 / User1_123, user2 / User2_123.

## Security pipeline (.github/workflows/ci.yml)

| Job | Tool | Blocking? |
|---|---|---|
| sast | Semgrep | Yes (required check) |
| secrets-scan | Gitleaks | Yes (required check) |
| dependency-scan | npm audit | No, deliberately |
| container-scan | Trivy | No, deliberately |
| build-and-test | Docker Compose smoke test | Yes |

# NodeGoat

Being lightweight, fast, and scalable, Node.js is becoming a widely adopted platform for developing web applications. This project provides an environment to learn how OWASP Top 10 security risks apply to web applications developed using Node.js and how to effectively address them.


#### Customizing the Default Application Configuration

By default the application will be hosted on port 4000 and will connect to a MongoDB instance at localhost:27017. To change this set the environment variables `PORT` and `MONGODB_URI`.

Other settings can be changed by updating the [config file](https://github.com/OWASP/NodeGoat/blob/master/config/env/all.js).


## License

Code licensed under the [Apache License v2.0.](http://www.apache.org/licenses/LICENSE-2.0)

test line
