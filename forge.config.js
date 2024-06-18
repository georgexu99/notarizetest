
module.exports = {
    packagerConfig: {
      osxSign: {},
      osxNotarize: {
        keychainProfile: "forge1",
      },
      asar: true,
    },
    rebuildConfig: {},
    makers: [
      {
        name: '@electron-forge/maker-squirrel',
        config: {},
      },
      {
        name: '@electron-forge/maker-zip',
        platforms: ['darwin'],
      },
      {
        name: '@electron-forge/maker-deb',
        config: {},
      },
      {
        name: '@electron-forge/maker-rpm',
        config: {},
      },
    ],
    plugins: [
      {
        name: '@electron-forge/plugin-local-electron',
        config: {
          electronPath: "/Users/george.xu/electron/src/out/Testing"
        },
      },
    ],
  };
  