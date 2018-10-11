CREATE TABLE Users (
  name VARCHAR(64),
  email VARCHAR(64) PRIMARY KEY,
  hash  VARCHAR(128)
);

CREATE TABLE Event (
  id SERIAL PRIMARY KEY,
  startDate TIMESTAMP,
  endDate TIMESTAMP,
  owner VARCHAR(64) NOT NULL,
  title VARCHAR(64),
  comment TEXT,

  FOREIGN KEY (owner) REFERENCES Users(email)
);

CREATE TABLE Shared (
  userID SERIAL NOT NULL,
  eventID SERIAL NOT NULL,

  FOREIGN KEY (userID) REFERENCES Users(id),
  FOREIGN KEY (eventID) REFERENCES Event(id)
);
