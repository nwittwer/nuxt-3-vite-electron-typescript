const path = require("path");

const ROOT = "../";

const macOS = {
  mac: {
    target: {
      target: "default",
      arch: ["arm64", "x64"],
    },
    icon: path.resolve(ROOT, "build/icons", "icon.icns"),
    entitlements: path.resolve(ROOT, "build/entitlements.mac.plist"), // Required for MacOS Catalina
    entitlementsInherit: path.resolve(ROOT, "build/entitlements.mac.plist"), // Required for MacOS Catalina
  },
  dmg: {
    sign: false, // Required for MacOS Catalina
    contents: [
      {
        x: 410,
        y: 150,
        type: "link",
        path: "/Applications",
      },
      {
        x: 130,
        y: 150,
        type: "file",
      },
    ],
  },
};

const windowsOS = {
  win: {
    icon: path.resolve(ROOT, "build/icons", "icon.ico"),
    publisherName: "Your name",
    target: "nsis",
    verifyUpdateCodeSignature: false, // Don't codesign https://github.com/electron-userland/electron-builder/issues/2786#issuecomment-383813995
  },
  nsis: {
    differentialPackage: true,
  },
};

module.exports = {
  productName: require("../package.json").productName,
  appId: "com.myapp.app",
  artifactName: "MyApp-${version}-${os}-${arch}.${ext}",

  // Files to include in the build
  files: [
    "package.json",
    // The Electron files
    {
      from: "../electron/dist",
      to: "dist/electron",
    },
    // The Nuxt files
    // Docs: https://nuxt.com/docs/getting-started/deployment#client-side-only-rendering
    {
      from: "../app/.output/public",
      to: "dist/nuxt",
    },
  ],

  // Where to place the build files
  directories: {
    output: "../build",
  },

  // Using ASAR
  asar: false, // Whether or not to package

  ...macOS,
  ...windowsOS,
};
