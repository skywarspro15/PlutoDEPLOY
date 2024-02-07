// Service which runs in the background and handles desktop app integration.
export default {
  name: "Desktop Integration",
  description: "Handles Pluto Desktop integration for applications.",
  ver: 1, // Compatible with core v1
  type: "process",
  privileges: [
    {
      privilege: "full",
      description: "Desktop integration needs access to the system.",
    },
  ],
  exec: async function (Root) {
    console.log("Hello from Desktop Integration");

    const Lib = Root.GlobalLib;
    const Core = Root.Core;

    console.log(Root);

    console.log("host??", "host" in Root.GlobalLib);

    Root.Lib.setOnEnd((_) => {
      return false;
      console.log("Desktop Integration service is exiting...");

      clearInterval(interval);
    });

    let time = Math.round(Date.now() / 1000);

    function refresh() {
      const length = Core.processList.length;

      let user = {
        name: "Not logged in to Zeon",
        pfp: "https://zeon.dev/imgs/zeonfull.png",
      };

      var account = Core.services.find((c) => c.name === "Account");

      if (account == undefined) return;

      const userData = account.ref.getUserData();

      if (userData.onlineAccount === true) {
        user = {
          name: "Logged in as " + userData.username,
          pfp: userData.pfp,
        };
      }
    }

    setTimeout(() => {
      refresh();
    }, 5000);
    const interval = setInterval(refresh, 10000);

    return {
      // Maybe an option to configure RPC
    };
  },
};
