import createDockerClient from "bun-docker";

const docker = await createDockerClient();
export default docker;
