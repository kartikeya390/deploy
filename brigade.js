const { events, Job } = require("brigadier");

events.on("exec", function(e, project) {
  console.log("received push for commit " + e.revision.commit)

  // Create a new job
   var docker = new Job("job2" , "docker:dind");
    docker.privileged = true;
    docker.env = {
    DOCKER_DRIVER: "overlay"
    };

  docker.tasks = [
    "dockerd-entrypoint.sh &",
    "sleep 10",
    "ls -lart",
    "pwd",
    "docker build -t kartikeya390/dockerdeploy:v4 .",
    "docker images"
]

  docker.streamLogs = true;

  // We're done configuring, so we run the job
  docker.run()
})
