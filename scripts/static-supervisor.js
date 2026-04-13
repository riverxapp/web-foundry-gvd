import { execSync } from "child_process";
import fs from "fs";
import "./static-server.js";
import { startGitPoll } from "./git-poll.js";

const BRANCH = process.env.PREVIEW_BRANCH || "main";
const REPO_URL = process.env.REPO_URL;

process.chdir("/app"); // 🔑 FORCE cwd

console.log("[supervisor] ensuring git repo");

if (!fs.existsSync(".git")) {
  execSync("git init", { stdio: "inherit", cwd: "/app" });
  execSync(`git remote add origin ${REPO_URL}`, { stdio: "inherit", cwd: "/app" });
  execSync("git fetch origin --depth=1", { stdio: "inherit", cwd: "/app" });
  execSync(`git reset --hard origin/${BRANCH}`, { stdio: "inherit", cwd: "/app" });
  execSync("git clean -fd", { stdio: "inherit", cwd: "/app" });
}

console.log("[supervisor] static preview running");

// 🔑 start polling ONLY after git is ready
startGitPoll();
