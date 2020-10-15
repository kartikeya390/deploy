const { events, Job } = require("brigadier");

events.on("exec", function(e, project) {
  console.log("received push for commit " + e.revision.commit)

  // Create a new job
   var docker = new Job("job2" , "docker:dind");
   
    docker.privileged = true;
    docker.env = {
    DOCKER_DRIVER: "overlay"
    };
  docker.env.DOCKER_USER = project.secrets.dockerLogin
  docker.env.DOCKER_PASS = project.secrets.dockerPass

  docker.tasks = [
    "dockerd-entrypoint.sh &",
    "sleep 10",
    "cd src",
    "docker build -t kartikeya390/dockerdeploy:Latest1 .",
    "docker login docker.io -u $DOCKER_USER -p $DOCKER_PASS",
    "docker push kartikeya390/dockerdeploy:Latest1",
    "docker images"
]

  docker.streamLogs = true;

  // We're done configuring, so we run the job
  docker.run()
})
