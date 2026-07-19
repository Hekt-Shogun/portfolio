/** @type {import('next').NextConfig} */

// When built inside GitHub Actions for a project page (username.github.io/repo),
// assets and links need to be prefixed with "/repo". This resolves automatically
// from the GITHUB_REPOSITORY env var that Actions sets, so no manual config is
// needed per-repo. Skip this if you deploy to a *user/org* page named
// "<username>.github.io" (those are served from the domain root, no prefix needed).
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
let basePath = "";
let assetPrefix = "";

if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
  const isUserOrgPage = /\.github\.io$/i.test(repo);
  if (!isUserOrgPage) {
    basePath = `/${repo}`;
    assetPrefix = `/${repo}/`;
  }
}

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
