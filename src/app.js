const express = require("express");
const cors = require("cors");

const {
  uuid
} = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const {
    title
  } = request.query;

  const results = title ?
    repositories.filter((repositories) => repositories.title.includes(title)) :
    repositories;

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {
    title,
    url,
    techs
  } = request.body

  const project = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };


  repositories.push(project)

  return response.json(project)

});

app.put("/repositories/:id", (request, response) => {
  const {
    title,
    url,
    techs
  } = request.body
  const {
    id
  } = request.params

  const RepoIndex = repositories.findIndex((project) => id === project.id)

  if (RepoIndex < 0) {
    response.status(400).json({
      error: "projectnotfound"
    });
  }

  const project = {
    title,
    url,
    techs
  }

  repositories[RepoIndex].title = project.title
  repositories[RepoIndex].url = project.url
  repositories[RepoIndex].techs = project.techs

  return response.json(repositories[RepoIndex])


});

app.delete("/repositories/:id", (request, response) => {
  const {
    id
  } = request.params;

  const RepoIndex = repositories.findIndex((project) => id === project.id)

  if (RepoIndex < 0) {
    response.status(400).json({
      error: "projectnotfound"
    });
  }
  repositories.splice(RepoIndex, 1)

  return response.send(204)()


});

app.post("/repositories/:id/like", (request, response) => {
  const {
    id
  } = request.params
  const {
    likes
  } = request.body

  const RepoIndex = repositories.findIndex((project) => id === project.id)

  if (RepoIndex < 0) {
    response.status(400).json({
      error: "projectnotfound"
    });
  }

  repositories[RepoIndex].likes += 1


  return response.json(repositories[RepoIndex]);

});

module.exports = app;