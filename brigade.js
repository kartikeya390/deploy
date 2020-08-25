const { events, Job } = require("brigadier");
events.on("push", () => {
 var job = new Job("buildfinal", "docker:dind");
 job.privileged = true;
 job.tasks = [
     "dockerd &",
     "cd /src",
     "ls -l",
     "sleep 10",
     "docker info",
     "docker ps"
 ];
 

 job.run();
});
