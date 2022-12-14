/* eslint-disable no-console */
import { execa } from "execa";

(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log("Building started...");
    var { stdout } = await execa("git", ["rev-parse", "HEAD"]);
    const currentCommitSHA = stdout;
    // eslint-disable-next-line
    var { stdout } = await execa("git", ["log", "-1", "--pretty=%B"]);
    const currentCommitMsg = stdout.trim();
    const newGitMessage = `New deployment to GitHub Pages.\n\nBased on '${currentCommitMsg}'\nSHA: ${currentCommitSHA}`;
    await execa("npm", ["run", "build"]);
    const folderName = "dist";
    await execa("git", ["checkout", "--orphan", "gh-pages"]);
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", [
      "--work-tree",
      folderName,
      "commit",
      "-m",
      newGitMessage,
    ]);
    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    // if (process.platform === "win32") {
    //   await execa("Remove-Item", ["-Recurse", folderName]);
    // } else {
    //   await execa("rm", ["-r", folderName]);
    // }
    await execa("git", ["checkout", "-f", "main"]);
    await execa("git", ["branch", "-D", "gh-pages"]);
    console.log("Successfully deployed, check your settings");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    // eslint-disable-next-line
    process.exit(1);
  }
})();
